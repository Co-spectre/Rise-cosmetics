import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Product Management Interfaces
export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  attributes: Record<string, string>; // e.g., { color: 'rose gold', size: '50ml' }
  inventory: {
    quantity: number;
    tracked: boolean;
    allowBackorder: boolean;
    lowStockThreshold: number;
  };
  weight: number;
  dimensions: { length: number; width: number; height: number };
  isActive: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: ProductCategory[];
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
  description?: string;
  productCount: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5
  title: string;
  content: string;
  images?: string[];
  verified: boolean; // verified purchase
  helpful: number; // helpful votes
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  images: string[];
  categoryIds: string[];
  tags: string[];
  variants: ProductVariant[];
  attributes: Record<string, any>; // Custom product attributes
  metaTitle?: string;
  metaDescription?: string;
  ingredients?: string[];
  benefits?: string[];
  howToUse?: string;
  warnings?: string[];
  vendor?: string;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  inventory: {
    quantity: number;
    tracked: boolean;
    allowBackorder: boolean;
    lowStockThreshold: number;
  };
  status: 'draft' | 'active' | 'archived';
  featured: boolean;
  relatedProductIds: string[];
  reviews: ProductReview[];
  averageRating: number;
  reviewCount: number;
  totalSales: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface BulkOperation {
  id: string;
  type: 'update_price' | 'update_inventory' | 'update_status' | 'assign_category' | 'add_tags' | 'remove_tags';
  productIds: string[];
  changes: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  totalItems: number;
  processedItems: number;
  errors: Array<{ productId: string; error: string }>;
  createdBy: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface ProductImport {
  id: string;
  fileName: string;
  totalRows: number;
  processedRows: number;
  successfulRows: number;
  failedRows: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errors: Array<{ row: number; error: string; data: any }>;
  mapping: Record<string, string>; // CSV column to product field mapping
  createdAt: Date;
  completedAt?: Date;
}

// Product Management Context
interface ProductManagementContextType {
  // Product CRUD Operations
  products: Product[];
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'averageRating' | 'reviewCount' | 'totalSales'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  duplicateProduct: (id: string, newName?: string) => Promise<Product>;
  getProduct: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  
  // Product Search & Filtering
  searchProducts: (query: string, filters?: {
    categoryId?: string;
    status?: Product['status'];
    featured?: boolean;
    priceRange?: { min: number; max: number };
    tags?: string[];
    inStock?: boolean;
  }) => Product[];
  
  // Category Management
  categories: ProductCategory[];
  createCategory: (category: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ProductCategory>;
  updateCategory: (id: string, updates: Partial<ProductCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryTree: () => ProductCategory[];
  
  // Tag Management
  tags: ProductTag[];
  createTag: (tag: Omit<ProductTag, 'id' | 'productCount'>) => Promise<ProductTag>;
  updateTag: (id: string, updates: Partial<ProductTag>) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  getPopularTags: (limit?: number) => ProductTag[];
  
  // Variant Management
  addVariant: (productId: string, variant: Omit<ProductVariant, 'id'>) => Promise<void>;
  updateVariant: (productId: string, variantId: string, updates: Partial<ProductVariant>) => Promise<void>;
  deleteVariant: (productId: string, variantId: string) => Promise<void>;
  
  // Review Management
  reviews: ProductReview[];
  approveReview: (reviewId: string) => Promise<void>;
  rejectReview: (reviewId: string) => Promise<void>;
  getProductReviews: (productId: string) => ProductReview[];
  updateReviewHelpfulness: (reviewId: string, helpful: boolean) => Promise<void>;
  
  // Bulk Operations
  bulkOperations: BulkOperation[];
  createBulkOperation: (operation: Omit<BulkOperation, 'id' | 'status' | 'progress' | 'processedItems' | 'errors' | 'createdAt'>) => Promise<BulkOperation>;
  processBulkOperation: (operationId: string) => Promise<void>;
  getBulkOperationStatus: (operationId: string) => BulkOperation | undefined;
  
  // Import/Export
  imports: ProductImport[];
  importProducts: (file: File, mapping: Record<string, string>) => Promise<ProductImport>;
  exportProducts: (productIds?: string[], format?: 'csv' | 'xlsx') => Promise<Blob>;
  getImportTemplate: () => string; // CSV template
  
  // Inventory Management Integration
  updateInventory: (productId: string, variantId: string | null, quantity: number, operation: 'set' | 'add' | 'subtract') => Promise<void>;
  getLowStockProducts: () => Product[];
  getOutOfStockProducts: () => Product[];
  
  // Related Products
  updateRelatedProducts: (productId: string, relatedIds: string[]) => Promise<void>;
  getRecommendedProducts: (productId: string, limit?: number) => Product[];
  
  // Product Analytics
  getProductPerformance: (productId: string, startDate: Date, endDate: Date) => Promise<{
    views: number;
    sales: number;
    revenue: number;
    conversionRate: number;
    averageOrderValue: number;
  }>;
  getTopSellingProducts: (limit?: number, period?: '7d' | '30d' | '90d') => Product[];
  getCategoryPerformance: () => Array<{ categoryId: string; sales: number; revenue: number }>;
  
  // SEO & URL Management
  generateSlug: (name: string) => string;
  validateSlug: (slug: string, excludeId?: string) => boolean;
  generateSEOData: (product: Product) => { title: string; description: string; keywords: string[] };
  
  // Image Management
  uploadProductImage: (file: File) => Promise<string>;
  optimizeProductImages: (productId: string) => Promise<void>;
  generateImageVariants: (imageUrl: string) => Promise<{ thumbnail: string; medium: string; large: string }>;
  
  // Price Management
  updatePrice: (productId: string, price: number, compareAtPrice?: number) => Promise<void>;
  applyDiscount: (productIds: string[], discount: { type: 'percentage' | 'fixed'; value: number; startDate?: Date; endDate?: Date }) => Promise<void>;
  getPriceHistory: (productId: string) => Array<{ price: number; date: Date; reason: string }>;
}

const ProductManagementContext = createContext<ProductManagementContextType | undefined>(undefined);

// Sample Data
const SAMPLE_CATEGORIES: ProductCategory[] = [
  {
    id: '1',
    name: 'Cleansers & Exfoliants',
    slug: 'cleansers-exfoliants',
    description: 'Gentle cleansing products and exfoliating treatments for all skin types',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Serums & Treatments',
    slug: 'serums-treatments',
    description: 'Targeted treatment serums and specialized skincare solutions',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Moisturizers & Creams',
    slug: 'moisturizers-creams',
    description: 'Hydrating creams, moisturizers and nourishing treatments',
    sortOrder: 3,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

const SAMPLE_TAGS: ProductTag[] = [
  { id: '1', name: 'Anti-Aging', slug: 'anti-aging', color: '#ff6b6b', productCount: 12 },
  { id: '2', name: 'Hydrating', slug: 'hydrating', color: '#4ecdc4', productCount: 18 },
  { id: '3', name: 'Natural', slug: 'natural', color: '#45b7d1', productCount: 25 },
  { id: '4', name: 'Sensitive Skin', slug: 'sensitive-skin', color: '#96ceb4', productCount: 8 },
  { id: '5', name: 'Brightening', slug: 'brightening', color: '#ffd93d', productCount: 10 },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Soul Cleanser',
    slug: 'soul-cleanser',
    description: 'Gentle purifying mousse that cleanses while nourishing your skin with sprouted rice extracts and olive oil derivatives. Perfect for daily use on all skin types.',
    shortDescription: 'Gentle Purifying Mousse',
    sku: 'SC-001',
    price: 42.00,
    compareAtPrice: 52.00,
    costPrice: 18.00,
    images: ['/products/soul-cleanser-1.jpg', '/products/soul-cleanser-2.jpg'],
    categoryIds: ['1'],
    tags: ['gentle', 'daily-use', 'natural'],
    variants: [
      {
        id: 'sc-v1',
        name: 'Standard Size',
        sku: 'SC-001-150ML',
        price: 42.00,
        images: ['/products/soul-cleanser-1.jpg'],
        attributes: { size: '150ml', type: 'mousse' },
        inventory: { quantity: 75, tracked: true, allowBackorder: false, lowStockThreshold: 15 },
        weight: 180,
        dimensions: { length: 6, width: 6, height: 15 },
        isActive: true,
      },
    ],
    attributes: {
      ingredients: ['Sprouted Rice Extract', 'Olive Oil Derivatives', 'Chamomile'],
      skinType: ['All Skin Types', 'Sensitive Skin'],
      concerns: ['Daily Cleansing', 'Gentle Care'],
    },
    ingredients: ['Aqua', 'Oryza Sativa Extract', 'Olea Europaea Oil', 'Chamomilla Recutita'],
    benefits: ['Gentle daily cleansing', 'Maintains skin barrier', 'Removes impurities'],
    howToUse: 'Apply to damp skin, massage gently, rinse with lukewarm water. Use morning and evening.',
    weight: 180,
    dimensions: { length: 6, width: 6, height: 15 },
    inventory: { quantity: 75, tracked: true, allowBackorder: false, lowStockThreshold: 15 },
    status: 'active',
    featured: true,
    relatedProductIds: ['2', '3'],
    reviews: [],
    averageRating: 4.6,
    reviewCount: 89,
    totalSales: 650,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10'),
    publishedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Radiance Serum',
    slug: 'radiance-serum',
    description: 'Luxurious illuminating face serum that reveals your inner glow with powerful rice peptides and botanical extracts. Clinically proven to brighten skin in 14 days.',
    shortDescription: 'Illuminating Face Serum',
    sku: 'RS-002',
    price: 68.00,
    compareAtPrice: 85.00,
    costPrice: 25.00,
    images: ['/products/radiance-serum-1.jpg', '/products/radiance-serum-2.jpg'],
    categoryIds: ['2'],
    tags: ['brightening', 'anti-aging', 'premium'],
    variants: [
      {
        id: 'rs-v1',
        name: 'Standard Size',
        sku: 'RS-002-30ML',
        price: 68.00,
        images: ['/products/radiance-serum-1.jpg'],
        attributes: { size: '30ml', type: 'serum' },
        inventory: { quantity: 45, tracked: true, allowBackorder: true, lowStockThreshold: 8 },
        weight: 85,
        dimensions: { length: 4, width: 4, height: 12 },
        isActive: true,
      },
    ],
    attributes: {
      ingredients: ['Rice Peptides', 'Vitamin C', 'Niacinamide', 'Hyaluronic Acid'],
      skinType: ['All Skin Types', 'Mature Skin'],
      concerns: ['Dullness', 'Dark Spots', 'Aging'],
    },
    ingredients: ['Aqua', 'Oryza Sativa Peptide', 'Ascorbic Acid', 'Niacinamide', 'Sodium Hyaluronate'],
    benefits: ['Brightens complexion', 'Reduces dark spots', 'Improves skin texture', 'Anti-aging properties'],
    howToUse: 'Apply 2-3 drops to clean skin morning and evening. Gently pat until absorbed. Follow with moisturizer.',
    weight: 85,
    dimensions: { length: 4, width: 4, height: 12 },
    inventory: { quantity: 45, tracked: true, allowBackorder: true, lowStockThreshold: 8 },
    status: 'active',
    featured: true,
    relatedProductIds: ['1', '4'],
    reviews: [],
    averageRating: 4.8,
    reviewCount: 156,
    totalSales: 890,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-15'),
    publishedAt: new Date('2024-01-25'),
  },
  {
    id: '3',
    name: 'Body Harmony',
    slug: 'body-harmony',
    description: 'Rich nourishing body cream that envelops your skin in pure comfort and long-lasting hydration. Infused with rice bran oil and natural moisturizers.',
    shortDescription: 'Nourishing Body Cream',
    sku: 'BH-003',
    price: 38.00,
    compareAtPrice: 48.00,
    costPrice: 14.00,
    images: ['/products/body-harmony-1.jpg', '/products/body-harmony-2.jpg'],
    categoryIds: ['3'],
    tags: ['hydrating', 'body-care', 'daily-use'],
    variants: [
      {
        id: 'bh-v1',
        name: 'Standard Size',
        sku: 'BH-003-200ML',
        price: 38.00,
        images: ['/products/body-harmony-1.jpg'],
        attributes: { size: '200ml', type: 'cream' },
        inventory: { quantity: 120, tracked: true, allowBackorder: false, lowStockThreshold: 25 },
        weight: 240,
        dimensions: { length: 8, width: 8, height: 10 },
        isActive: true,
      },
    ],
    attributes: {
      ingredients: ['Rice Bran Oil', 'Shea Butter', 'Coconut Oil', 'Vitamin E'],
      skinType: ['All Skin Types', 'Dry Skin'],
      concerns: ['Dry Skin', 'Daily Moisturizing'],
    },
    ingredients: ['Aqua', 'Oryza Sativa Bran Oil', 'Butyrospermum Parkii Butter', 'Cocos Nucifera Oil', 'Tocopherol'],
    benefits: ['Deep moisturization', 'Soft skin texture', 'Long-lasting hydration', 'Natural ingredients'],
    howToUse: 'Apply generously to clean skin. Massage until fully absorbed. Use daily or as needed.',
    weight: 240,
    dimensions: { length: 8, width: 8, height: 10 },
    inventory: { quantity: 120, tracked: true, allowBackorder: false, lowStockThreshold: 25 },
    status: 'active',
    featured: false,
    relatedProductIds: ['1', '4'],
    reviews: [],
    averageRating: 4.5,
    reviewCount: 78,
    totalSales: 445,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-05'),
    publishedAt: new Date('2024-02-05'),
  },
  {
    id: '4',
    name: 'Soulrise',
    slug: 'soulrise',
    description: 'Premium anti-aging face cream that renews and revitalizes with age-defying rice technology. Clinically proven to reduce fine lines and improve skin elasticity.',
    shortDescription: 'Anti-Aging Face Cream',
    sku: 'SR-004',
    price: 78.00,
    compareAtPrice: 98.00,
    costPrice: 28.00,
    images: ['/products/soulrise-1.jpg', '/products/soulrise-2.jpg'],
    categoryIds: ['3'],
    tags: ['anti-aging', 'premium', 'night-care'],
    variants: [
      {
        id: 'sr-v1',
        name: 'Standard Size',
        sku: 'SR-004-50ML',
        price: 78.00,
        images: ['/products/soulrise-1.jpg'],
        attributes: { size: '50ml', type: 'cream' },
        inventory: { quantity: 35, tracked: true, allowBackorder: true, lowStockThreshold: 10 },
        weight: 120,
        dimensions: { length: 6, width: 6, height: 8 },
        isActive: true,
      },
    ],
    attributes: {
      ingredients: ['Rice Stem Cells', 'Retinol', 'Peptides', 'Ceramides'],
      skinType: ['Mature Skin', 'Normal Skin'],
      concerns: ['Fine Lines', 'Wrinkles', 'Loss of Elasticity'],
    },
    ingredients: ['Aqua', 'Oryza Sativa Stem Cell Extract', 'Retinyl Palmitate', 'Palmitoyl Tripeptide-1', 'Ceramide NP'],
    benefits: ['Reduces fine lines', 'Improves elasticity', 'Firms skin', 'Overnight renewal'],
    howToUse: 'Apply to clean face and neck every evening. Gently massage until absorbed. Use sunscreen during the day.',
    weight: 120,
    dimensions: { length: 6, width: 6, height: 8 },
    inventory: { quantity: 35, tracked: true, allowBackorder: true, lowStockThreshold: 10 },
    status: 'active',
    featured: true,
    relatedProductIds: ['2', '5'],
    reviews: [],
    averageRating: 4.9,
    reviewCount: 203,
    totalSales: 1150,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-20'),
    publishedAt: new Date('2024-02-15'),
  },
  {
    id: '5',
    name: 'Eye Luce',
    slug: 'eye-luce',
    description: 'Gentle illuminating eye drops that brighten and refresh the delicate eye area with botanical extracts and caffeine. Perfect for reducing puffiness and dark circles.',
    shortDescription: 'Illuminating Eye Drops',
    sku: 'EL-005',
    price: 58.00,
    compareAtPrice: 72.00,
    costPrice: 22.00,
    images: ['/products/eye-luce-1.jpg', '/products/eye-luce-2.jpg'],
    categoryIds: ['2'],
    tags: ['eye-care', 'brightening', 'morning-routine'],
    variants: [
      {
        id: 'el-v1',
        name: 'Standard Size',
        sku: 'EL-005-15ML',
        price: 58.00,
        images: ['/products/eye-luce-1.jpg'],
        attributes: { size: '15ml', type: 'drops' },
        inventory: { quantity: 60, tracked: true, allowBackorder: false, lowStockThreshold: 12 },
        weight: 60,
        dimensions: { length: 3, width: 3, height: 10 },
        isActive: true,
      },
    ],
    attributes: {
      ingredients: ['Caffeine', 'Vitamin K', 'Cucumber Extract', 'Hyaluronic Acid'],
      skinType: ['All Skin Types', 'Sensitive Eye Area'],
      concerns: ['Dark Circles', 'Puffiness', 'Tired Eyes'],
    },
    ingredients: ['Aqua', 'Caffeine', 'Phytonadione', 'Cucumis Sativus Extract', 'Sodium Hyaluronate'],
    benefits: ['Reduces dark circles', 'Minimizes puffiness', 'Refreshes tired eyes', 'Gentle formula'],
    howToUse: 'Apply 1-2 drops under each eye morning and evening. Gently pat until absorbed.',
    weight: 60,
    dimensions: { length: 3, width: 3, height: 10 },
    inventory: { quantity: 60, tracked: true, allowBackorder: false, lowStockThreshold: 12 },
    status: 'active',
    featured: false,
    relatedProductIds: ['2', '4'],
    reviews: [],
    averageRating: 4.7,
    reviewCount: 94,
    totalSales: 520,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-03-12'),
    publishedAt: new Date('2024-02-25'),
  },
  {
    id: '6',
    name: 'Gentle Exfoliant',
    slug: 'gentle-exfoliant',
    description: 'Weekly rice-based exfoliating treatment that gently removes dead skin cells while nourishing with natural oils. Reveals smoother, brighter skin.',
    shortDescription: 'Rice-Based Weekly Exfoliant',
    sku: 'GE-006',
    price: 45.00,
    compareAtPrice: 58.00,
    costPrice: 16.00,
    images: ['/products/gentle-exfoliant-1.jpg', '/products/gentle-exfoliant-2.jpg'],
    categoryIds: ['1'],
    tags: ['exfoliating', 'weekly-treatment', 'natural'],
    variants: [
      {
        id: 'ge-v1',
        name: 'Standard Size',
        sku: 'GE-006-100ML',
        price: 45.00,
        images: ['/products/gentle-exfoliant-1.jpg'],
        attributes: { size: '100ml', type: 'scrub' },
        inventory: { quantity: 40, tracked: true, allowBackorder: false, lowStockThreshold: 8 },
        weight: 150,
        dimensions: { length: 6, width: 6, height: 12 },
        isActive: true,
      },
    ],
    attributes: {
      ingredients: ['Rice Powder', 'Jojoba Beads', 'Argan Oil', 'Vitamin E'],
      skinType: ['All Skin Types', 'Normal to Oily'],
      concerns: ['Dull Skin', 'Rough Texture', 'Clogged Pores'],
    },
    ingredients: ['Oryza Sativa Powder', 'Jojoba Esters', 'Argania Spinosa Oil', 'Tocopherol'],
    benefits: ['Gentle exfoliation', 'Smoother texture', 'Brighter complexion', 'Unclogs pores'],
    howToUse: 'Use 1-2 times per week on damp skin. Massage gently in circular motions, rinse thoroughly.',
    weight: 150,
    dimensions: { length: 6, width: 6, height: 12 },
    inventory: { quantity: 40, tracked: true, allowBackorder: false, lowStockThreshold: 8 },
    status: 'active',
    featured: false,
    relatedProductIds: ['1', '2'],
    reviews: [],
    averageRating: 4.4,
    reviewCount: 67,
    totalSales: 280,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-25'),
    publishedAt: new Date('2024-03-05'),
  }
];

export const ProductManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [categories, setCategories] = useState<ProductCategory[]>(SAMPLE_CATEGORIES);
  const [tags, setTags] = useState<ProductTag[]>(SAMPLE_TAGS);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [bulkOperations, setBulkOperations] = useState<BulkOperation[]>([]);
  const [imports, setImports] = useState<ProductImport[]>([]);
  
  const { user } = useAuth();

  // Create Product
  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'averageRating' | 'reviewCount' | 'totalSales'>): Promise<Product> => {
    const product: Product = {
      ...productData,
      id: `product_${Date.now()}`,
      averageRating: 0,
      reviewCount: 0,
      totalSales: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: productData.status === 'active' ? new Date() : undefined,
    };

    setProducts(prev => [...prev, product]);
    return product;
  };

  // Update Product
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date() }
        : product
    ));
  };

  // Delete Product
  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // Duplicate Product
  const duplicateProduct = async (id: string, newName?: string): Promise<Product> => {
    const original = products.find(p => p.id === id);
    if (!original) {
      throw new Error('Product not found');
    }

    const duplicated: Product = {
      ...original,
      id: `product_${Date.now()}`,
      name: newName || `${original.name} (Copy)`,
      slug: generateSlug(newName || `${original.name} copy`),
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: undefined,
    };

    setProducts(prev => [...prev, duplicated]);
    return duplicated;
  };

  // Get Product
  const getProduct = (id: string) => products.find(p => p.id === id);
  const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

  // Search Products
  const searchProducts = (query: string, filters?: any) => {
    return products.filter(product => {
      // Text search
      const matchesQuery = !query || 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.sku.toLowerCase().includes(query.toLowerCase());

      // Apply filters
      if (!matchesQuery) return false;
      
      if (filters?.categoryId && !product.categoryIds.includes(filters.categoryId)) return false;
      if (filters?.status && product.status !== filters.status) return false;
      if (filters?.featured !== undefined && product.featured !== filters.featured) return false;
      if (filters?.inStock && product.inventory.quantity <= 0) return false;
      
      if (filters?.priceRange) {
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
      }
      
      if (filters?.tags && filters.tags.length > 0) {
        if (!filters.tags.some((tag: string) => product.tags.includes(tag))) return false;
      }

      return true;
    });
  };

  // Create Category
  const createCategory = async (categoryData: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductCategory> => {
    const category: ProductCategory = {
      ...categoryData,
      id: `category_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCategories(prev => [...prev, category]);
    return category;
  };

  // Update Category
  const updateCategory = async (id: string, updates: Partial<ProductCategory>) => {
    setCategories(prev => prev.map(category => 
      category.id === id 
        ? { ...category, ...updates, updatedAt: new Date() }
        : category
    ));
  };

  // Delete Category
  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  // Get Category Tree
  const getCategoryTree = (): ProductCategory[] => {
    const buildTree = (parentId?: string): ProductCategory[] => {
      return categories
        .filter(cat => cat.parentId === parentId)
        .map(cat => ({
          ...cat,
          children: buildTree(cat.id),
        }))
        .sort((a, b) => a.sortOrder - b.sortOrder);
    };

    return buildTree();
  };

  // Generate Slug
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Validate Slug
  const validateSlug = (slug: string, excludeId?: string): boolean => {
    return !products.some(p => p.slug === slug && p.id !== excludeId);
  };

  // Update Inventory
  const updateInventory = async (productId: string, variantId: string | null, quantity: number, operation: 'set' | 'add' | 'subtract') => {
    setProducts(prev => prev.map(product => {
      if (product.id !== productId) return product;

      if (variantId) {
        // Update variant inventory
        const updatedVariants = product.variants.map(variant => {
          if (variant.id !== variantId) return variant;
          
          let newQuantity = variant.inventory.quantity;
          switch (operation) {
            case 'set': newQuantity = quantity; break;
            case 'add': newQuantity += quantity; break;
            case 'subtract': newQuantity -= quantity; break;
          }
          
          return {
            ...variant,
            inventory: { ...variant.inventory, quantity: Math.max(0, newQuantity) },
          };
        });
        
        return { ...product, variants: updatedVariants };
      } else {
        // Update main product inventory
        let newQuantity = product.inventory.quantity;
        switch (operation) {
          case 'set': newQuantity = quantity; break;
          case 'add': newQuantity += quantity; break;
          case 'subtract': newQuantity -= quantity; break;
        }
        
        return {
          ...product,
          inventory: { ...product.inventory, quantity: Math.max(0, newQuantity) },
        };
      }
    }));
  };

  // Get Low Stock Products
  const getLowStockProducts = () => {
    return products.filter(product => 
      product.inventory.tracked && 
      product.inventory.quantity <= product.inventory.lowStockThreshold
    );
  };

  // Get Out of Stock Products
  const getOutOfStockProducts = () => {
    return products.filter(product => 
      product.inventory.tracked && 
      product.inventory.quantity === 0
    );
  };

  // Bulk Operation Creation
  const createBulkOperation = async (operationData: Omit<BulkOperation, 'id' | 'status' | 'progress' | 'processedItems' | 'errors' | 'createdAt'>): Promise<BulkOperation> => {
    const operation: BulkOperation = {
      ...operationData,
      id: `bulk_${Date.now()}`,
      status: 'pending',
      progress: 0,
      processedItems: 0,
      errors: [],
      createdAt: new Date(),
    };

    setBulkOperations(prev => [...prev, operation]);
    return operation;
  };

  // Process Bulk Operation
  const processBulkOperation = async (operationId: string) => {
    const operation = bulkOperations.find(op => op.id === operationId);
    if (!operation) return;

    setBulkOperations(prev => prev.map(op => 
      op.id === operationId 
        ? { ...op, status: 'processing' }
        : op
    ));

    // Simulate processing
    for (let i = 0; i < operation.totalItems; i++) {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate work
      
      setBulkOperations(prev => prev.map(op => 
        op.id === operationId 
          ? { 
              ...op, 
              processedItems: i + 1,
              progress: ((i + 1) / operation.totalItems) * 100
            }
          : op
      ));
    }

    setBulkOperations(prev => prev.map(op => 
      op.id === operationId 
        ? { ...op, status: 'completed', completedAt: new Date() }
        : op
    ));
  };

  // Placeholder implementations for remaining functions
  const createTag = async (tag: Omit<ProductTag, 'id' | 'productCount'>) => ({ ...tag, id: `tag_${Date.now()}`, productCount: 0 });
  const updateTag = async (id: string, updates: Partial<ProductTag>) => {
    setTags(prev => prev.map(tag => tag.id === id ? { ...tag, ...updates } : tag));
  };
  const deleteTag = async (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
  };
  const getPopularTags = (limit = 10) => tags.slice(0, limit);
  const addVariant = async (productId: string, variant: Omit<ProductVariant, 'id'>) => {};
  const updateVariant = async (productId: string, variantId: string, updates: Partial<ProductVariant>) => {};
  const deleteVariant = async (productId: string, variantId: string) => {};
  const approveReview = async (reviewId: string) => {};
  const rejectReview = async (reviewId: string) => {};
  const getProductReviews = (productId: string) => reviews.filter(r => r.productId === productId);
  const updateReviewHelpfulness = async (reviewId: string, helpful: boolean) => {};
  const getBulkOperationStatus = (operationId: string) => bulkOperations.find(op => op.id === operationId);
  const importProducts = async (file: File, mapping: Record<string, string>) => ({ id: 'import_1', fileName: file.name, totalRows: 0, processedRows: 0, successfulRows: 0, failedRows: 0, status: 'pending' as const, errors: [], mapping, createdAt: new Date() });
  const exportProducts = async (productIds?: string[], format = 'csv') => new Blob([''], { type: 'text/csv' });
  const getImportTemplate = () => 'name,sku,price,description,category,status\n';
  const updateRelatedProducts = async (productId: string, relatedIds: string[]) => {};
  const getRecommendedProducts = (productId: string, limit = 4) => products.slice(0, limit);
  const getProductPerformance = async (productId: string, startDate: Date, endDate: Date) => ({ views: 1234, sales: 89, revenue: 4567, conversionRate: 0.072, averageOrderValue: 51.31 });
  const getTopSellingProducts = (limit = 10, period = '30d') => products.slice(0, limit);
  const getCategoryPerformance = () => [{ categoryId: '1', sales: 234, revenue: 12345 }];
  const generateSEOData = (product: Product) => ({ title: `${product.name} | Rise Cosmetics`, description: product.shortDescription || product.description, keywords: [product.name, ...product.tags] });
  const uploadProductImage = async (file: File) => `/uploads/${file.name}`;
  const optimizeProductImages = async (productId: string) => {};
  const generateImageVariants = async (imageUrl: string) => ({ thumbnail: `${imageUrl}_thumb`, medium: `${imageUrl}_med`, large: `${imageUrl}_large` });
  const updatePrice = async (productId: string, price: number, compareAtPrice?: number) => {
    await updateProduct(productId, { price, compareAtPrice });
  };
  const applyDiscount = async (productIds: string[], discount: any) => {};
  const getPriceHistory = (productId: string) => [{ price: 49.99, date: new Date(), reason: 'Initial price' }];

  const value: ProductManagementContextType = {
    // Product CRUD Operations
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    getProduct,
    getProductBySlug,
    
    // Product Search & Filtering
    searchProducts,
    
    // Category Management
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryTree,
    
    // Tag Management
    tags,
    createTag,
    updateTag,
    deleteTag,
    getPopularTags,
    
    // Variant Management
    addVariant,
    updateVariant,
    deleteVariant,
    
    // Review Management
    reviews,
    approveReview,
    rejectReview,
    getProductReviews,
    updateReviewHelpfulness,
    
    // Bulk Operations
    bulkOperations,
    createBulkOperation,
    processBulkOperation,
    getBulkOperationStatus,
    
    // Import/Export
    imports,
    importProducts,
    exportProducts,
    getImportTemplate,
    
    // Inventory Management Integration
    updateInventory,
    getLowStockProducts,
    getOutOfStockProducts,
    
    // Related Products
    updateRelatedProducts,
    getRecommendedProducts,
    
    // Product Analytics
    getProductPerformance,
    getTopSellingProducts,
    getCategoryPerformance,
    
    // SEO & URL Management
    generateSlug,
    validateSlug,
    generateSEOData,
    
    // Image Management
    uploadProductImage,
    optimizeProductImages,
    generateImageVariants,
    
    // Price Management
    updatePrice,
    applyDiscount,
    getPriceHistory,
  };

  return <ProductManagementContext.Provider value={value}>{children}</ProductManagementContext.Provider>;
};

export const useProductManagement = () => {
  const context = useContext(ProductManagementContext);
  if (context === undefined) {
    throw new Error('useProductManagement must be used within a ProductManagementProvider');
  }
  return context;
};
