import { Product, ProductFilters, SearchResults } from '@/types';

const mockProducts = [
  {
    id: 'rise-1',
    name: 'RISE Radiance Illuminating Serum',
    description: 'An ultra-lightweight, deeply hydrating serum infused with premium rice bran extract and vitamin C to brighten and refine skin texture. This luxurious formula penetrates deep into the skin layers, delivering essential nutrients and moisture while promoting cellular renewal.',
    shortDescription: 'Brightening serum that gives skin an instant glow',
    price: 89.00,
    compareAtPrice: 120.00,
    sku: 'RIS-001',
    category: 'Serums',
    tags: ['brightening', 'hydrating', 'anti-aging', 'vitamin-c', 'bestseller'],
    images: ['/images/products/IMG-20250808-WA0006.jpg'],
    inStock: true,
    stockQuantity: 45,
    featured: true,
    rating: 4.9,
    reviewCount: 1247,
    ingredients: ['Rice Bran Extract', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
    benefits: ['Brightens complexion', 'Reduces dark spots', 'Hydrates deeply', 'Improves skin texture', 'Promotes cellular renewal'],
    howToUse: 'Apply 2-3 drops to clean skin, morning and evening. Follow with moisturizer.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-2',
    name: 'RISE Soul Renewal Night Cream',
    description: 'Advanced night cream that works while you sleep to reveal smoother, firmer skin by morning. This potent formula combines retinol, peptides, and ceramides for comprehensive anti-aging benefits.',
    shortDescription: 'Luxurious night cream for skin renewal',
    price: 125.00,
    sku: 'RNC-002',
    category: 'Moisturizers',
    tags: ['anti-aging', 'night-care', 'firming', 'retinol', 'new'],
    images: ['/images/products/IMG-20250808-WA0007.jpg'],
    inStock: true,
    stockQuantity: 32,
    featured: true,
    rating: 4.8,
    reviewCount: 892,
    ingredients: ['Retinol', 'Peptides', 'Ceramides', 'Squalane'],
    benefits: ['Reduces fine lines', 'Firms skin', 'Restores elasticity', 'Provides antioxidant protection', 'Nourishes deeply'],
    howToUse: 'Apply to clean face and neck every evening. Start with 2-3 times per week.',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-3',
    name: 'RISE Eye Luce Brightening Complex',
    description: 'Intensive eye treatment that reduces dark circles and puffiness for a refreshed appearance. Formulated with caffeine, vitamin K, and arnica for immediate and long-term benefits.',
    shortDescription: 'Brightening eye complex for refreshed eyes',
    price: 75.00,
    sku: 'REC-003',
    category: 'Eye Care',
    tags: ['eye-care', 'brightening', 'anti-puffiness', 'caffeine', 'vitamin-k'],
    images: ['/images/products/IMG-20250808-WA0008.jpg'],
    inStock: true,
    stockQuantity: 58,
    featured: false,
    rating: 4.7,
    reviewCount: 654,
    ingredients: ['Caffeine', 'Vitamin K', 'Arnica', 'Hyaluronic Acid'],
    benefits: ['Reduces dark circles', 'Decreases puffiness', 'Smooths fine lines', 'Brightens eye area', 'Firms skin'],
    howToUse: 'Gently pat around eye area morning and evening. Use ring finger for gentle application.',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-4',
    name: 'RISE Rice Exfoliating Mask',
    description: 'Gentle yet effective exfoliating mask that reveals smoother, brighter skin with natural rice extracts. This deep-cleansing treatment combines rice powder with AHA and BHA for optimal results.',
    shortDescription: 'Exfoliating mask with natural rice extracts',
    price: 95.00,
    compareAtPrice: 110.00,
    sku: 'REM-004',
    category: 'Masks',
    tags: ['exfoliating', 'brightening', 'rice-extract', 'aha-bha', 'bestseller'],
    images: ['/images/products/IMG-20250808-WA0009.jpg'],
    inStock: true,
    stockQuantity: 73,
    featured: true,
    rating: 4.9,
    reviewCount: 1089,
    ingredients: ['Rice Powder', 'AHA', 'BHA', 'Vitamin E'],
    benefits: ['Gentle exfoliation', 'Brightens skin', 'Smooths texture', 'Removes dead skin', 'Refines pores'],
    howToUse: 'Apply evenly to clean skin, leave for 10-15 minutes, rinse with warm water. Use 2-3 times weekly.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-5',
    name: 'RISE Luxury Glow Oil Elixir',
    description: 'Luxurious facial oil infused with 24k gold particles for the ultimate radiant complexion. This golden elixir combines jojoba oil, rosehip oil, and vitamin C for unparalleled nourishment.',
    shortDescription: 'Luxury glow oil with 24k gold particles',
    price: 150.00,
    sku: 'RGO-005',
    category: 'Oils',
    tags: ['luxury', 'glow', 'anti-aging', 'gold-particles', 'new'],
    images: ['/images/products/IMG-20250808-WA0010.jpg'],
    inStock: true,
    stockQuantity: 18,
    featured: true,
    rating: 4.8,
    reviewCount: 423,
    ingredients: ['Jojoba Oil', 'Rosehip Oil', 'Vitamin C', 'Gold Particles'],
    benefits: ['Restores radiance', 'Deeply nourishes', 'Improves texture', 'Provides antioxidants', 'Enhances glow'],
    howToUse: 'Apply 3-4 drops to face and neck, gently massage until absorbed. Use evening or as needed.',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-6',
    name: 'RISE Vitamin C Brightening Drops',
    description: 'Potent vitamin C drops that brighten and even skin tone with antioxidant protection. This powerful serum combines vitamin C with ferulic acid and vitamin E for maximum stability and efficacy.',
    shortDescription: 'Brightening vitamin C drops for radiant skin',
    price: 68.00,
    sku: 'RVD-006',
    category: 'Serums',
    tags: ['vitamin-c', 'brightening', 'antioxidant', 'anti-aging', 'ferulic-acid'],
    images: ['/images/products/IMG-20250808-WA0011.jpg'],
    inStock: true,
    stockQuantity: 95,
    featured: false,
    rating: 4.6,
    reviewCount: 756,
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Vitamin E', 'Rice Water'],
    benefits: ['Brightens skin tone', 'Evens complexion', 'Antioxidant protection', 'Reduces hyperpigmentation', 'Boosts collagen'],
    howToUse: 'Apply 2-3 drops to clean skin in the morning. Always follow with sunscreen.',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-7',
    name: 'RISE Hydrating Mist Spray',
    description: 'Refreshing hydrating mist that instantly revitalizes and sets makeup throughout the day. This fine mist combines rose water, hyaluronic acid, and green tea for immediate hydration.',
    shortDescription: 'Refreshing hydrating mist for all-day comfort',
    price: 45.00,
    compareAtPrice: 55.00,
    sku: 'RHM-007',
    category: 'Mists',
    tags: ['hydrating', 'refreshing', 'makeup-setting', 'rose-water', 'green-tea'],
    images: ['/images/products/IMG-20250808-WA0012.jpg'],
    inStock: true,
    stockQuantity: 127,
    featured: false,
    rating: 4.5,
    reviewCount: 432,
    ingredients: ['Rose Water', 'Hyaluronic Acid', 'Aloe Vera', 'Green Tea'],
    benefits: ['Instant hydration', 'Sets makeup', 'Refreshes skin', 'Portable convenience', 'All-day comfort'],
    howToUse: 'Spray 6-8 inches from face, use throughout the day as needed. Perfect for makeup touch-ups.',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-8',
    name: 'RISE Gentle Cleansing Foam',
    description: 'Luxurious foaming cleanser that gently removes impurities while maintaining skin\'s natural moisture. Enriched with rice bran, coconut oil, and chamomile for a soothing cleanse.',
    shortDescription: 'Gentle foaming cleanser for daily use',
    price: 42.00,
    sku: 'RGC-008',
    category: 'Cleansers',
    tags: ['gentle', 'foaming', 'moisturizing', 'rice-bran', 'chamomile'],
    images: ['/images/products/IMG-20250808-WA0013.jpg'],
    inStock: true,
    stockQuantity: 87,
    featured: true,
    rating: 4.7,
    reviewCount: 623,
    ingredients: ['Rice Bran', 'Coconut Oil', 'Chamomile', 'Glycerin'],
    benefits: ['Gentle cleansing', 'Maintains moisture', 'Soothes irritation', 'Strengthens barrier', 'Softens skin'],
    howToUse: 'Massage onto damp skin, rinse thoroughly with lukewarm water. Use morning and evening.',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-9',
    name: 'RISE Antioxidant Protection Cream',
    description: 'Daily protection cream packed with antioxidants to shield skin from environmental damage. This nourishing moisturizer combines green tea, vitamin E, and CoQ10 for comprehensive protection.',
    shortDescription: 'Daily antioxidant protection cream',
    price: 98.00,
    sku: 'RAP-009',
    category: 'Moisturizers',
    tags: ['antioxidant', 'protection', 'daily-care', 'green-tea', 'vitamin-e'],
    images: ['/images/products/IMG-20250808-WA0014.jpg'],
    inStock: true,
    stockQuantity: 64,
    featured: false,
    rating: 4.8,
    reviewCount: 567,
    ingredients: ['Green Tea', 'Vitamin E', 'Coenzyme Q10', 'Rice Extract'],
    benefits: ['Antioxidant protection', 'Environmental defense', 'Moisturizes deeply', 'Prevents premature aging', 'Strengthens skin'],
    howToUse: 'Apply to clean skin morning and evening. Perfect as a daily moisturizer with SPF during the day.',
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-08-01')
  },
  {
    id: 'rise-10',
    name: 'RISE Overnight Recovery Serum',
    description: 'Intensive overnight serum that repairs and rejuvenates skin while you sleep. This advanced formula combines bakuchiol, hyaluronic acid, and peptides for comprehensive nighttime renewal.',
    shortDescription: 'Intensive overnight recovery serum',
    price: 115.00,
    sku: 'ROR-010',
    category: 'Serums',
    tags: ['overnight', 'recovery', 'anti-aging', 'bakuchiol', 'peptides', 'bestseller'],
    images: ['/images/products/IMG-20250808-WA0015.jpg'],
    inStock: true,
    stockQuantity: 43,
    featured: true,
    rating: 4.9,
    reviewCount: 892,
    ingredients: ['Bakuchiol', 'Hyaluronic Acid', 'Peptides', 'Rice Ceramides'],
    benefits: ['Repairs overnight', 'Reduces fine lines', 'Boosts collagen', 'Deeply hydrates', 'Improves texture'],
    howToUse: 'Apply 2-3 drops to clean skin every evening. Follow with night moisturizer if needed.',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-08-01')
  }
];

export class ProductService {
  private products: Product[] = [...mockProducts];

  // Get all products
  async getProducts(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return Promise.resolve(product || null);
  }

  // Search products
  async searchProducts(query: string, filters?: ProductFilters): Promise<SearchResults> {
    const filtered = this.products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    return Promise.resolve({
      products: filtered,
      total: filtered.length,
      page: 1,
      limit: filtered.length,
      hasMore: false
    });
  }

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    return Promise.resolve(this.products.filter(p => p.featured));
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Promise.resolve(this.products.filter(p => p.category === category));
  }

  // Admin functions (simplified for development)
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products[index] = { ...this.products[index], ...productData };
    return Promise.resolve(this.products[index]);
  }

  async deleteProduct(id: string): Promise<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    return Promise.resolve();
  }

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as Product;

    this.products.push(newProduct);
    return Promise.resolve(newProduct);
  }
}

// Export instance
export const productService = new ProductService();