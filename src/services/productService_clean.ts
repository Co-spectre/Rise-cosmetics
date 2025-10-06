import { Product, ProductFilters, SearchResults } from '@/types';

// API Base URL - will be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Product Service
export class ProductService {
  private static instance: ProductService;

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return mock data for development
      return this.getMockProducts();
    }
  }

  // Alias for admin compatibility
  async getAllProducts(): Promise<Product[]> {
    return this.getProducts();
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      // Return mock data for development
      const mockProducts = this.getMockProducts();
      return mockProducts.find(p => p.id === id) || null;
    }
  }

  // Search products
  async searchProducts(query: string, filters?: ProductFilters): Promise<SearchResults> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('q', query);
      
      if (filters?.category) searchParams.append('category', filters.category);
      if (filters?.inStock !== undefined) searchParams.append('inStock', filters.inStock.toString());
      if (filters?.priceRange?.min) searchParams.append('minPrice', filters.priceRange.min.toString());
      if (filters?.priceRange?.max) searchParams.append('maxPrice', filters.priceRange.max.toString());
      if (filters?.rating) searchParams.append('rating', filters.rating.toString());
      if (filters?.tags?.length) searchParams.append('tags', filters.tags.join(','));
      
      const response = await fetch(`${API_BASE_URL}/products/search?${searchParams}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      return {
        ...data,
        hasMore: data.hasMore ?? false
      };
    } catch (error) {
      console.error('Error searching products:', error);
      // Return mock search results for development
      const mockProducts = this.getMockProducts();
      const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        products: filteredProducts,
        total: filteredProducts.length,
        page: 1,
        limit: filteredProducts.length,
        hasMore: false
      };
    }
  }

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/featured`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured products');
      }
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Return mock featured products
      const mockProducts = this.getMockProducts();
      return mockProducts.filter(p => p.featured);
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      // Return mock data for development
      const mockProducts = this.getMockProducts();
      return mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
  }

  // Create new product (admin)
  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update product (admin)
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      
      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product (admin)
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Mock data for development
  private getMockProducts(): Product[] {
    return [
      {
        id: 'rise-1',
        name: 'RISE Radiant Glow Serum',
        description: 'A powerful anti-aging serum infused with rice water extract, niacinamide, and vitamin C to brighten skin and reduce the appearance of dark spots. This lightweight formula absorbs quickly and delivers visible results in just 2 weeks.',
        shortDescription: 'Brightening serum with rice water and vitamin C',
        price: 128.00,
        compareAtPrice: 165.00,
        sku: 'RGS-001',
        category: 'Serum',
        tags: ['brightening', 'anti-aging', 'vitamin-c', 'rice-water', 'niacinamide'],
        images: ['/images/products/IMG-20250808-WA0006.jpg'],
        inStock: true,
        stockQuantity: 45,
        featured: true,
        rating: 4.8,
        reviewCount: 324,
        ingredients: ['Rice Water Extract', 'Vitamin C', 'Niacinamide', 'Hyaluronic Acid', 'Peptides'],
        benefits: ['Brightens skin', 'Reduces dark spots', 'Anti-aging', 'Hydrates', 'Evens skin tone'],
        howToUse: 'Apply 2-3 drops to clean skin morning and evening. Follow with moisturizer and SPF during the day.',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-2',
        name: 'RISE Rice Water Essence',
        description: 'A hydrating essence formulated with 95% fermented rice water to deeply moisturize and prepare skin for subsequent skincare steps. This Korean-inspired formula helps improve skin texture and provides lasting hydration.',
        shortDescription: 'Hydrating essence with 95% fermented rice water',
        price: 89.00,
        compareAtPrice: 115.00,
        sku: 'RWE-002',
        category: 'Essence',
        tags: ['hydrating', 'rice-water', 'korean-skincare', 'fermented', 'prep'],
        images: ['/images/products/IMG-20250808-WA0007.jpg'],
        inStock: true,
        stockQuantity: 67,
        featured: true,
        rating: 4.9,
        reviewCount: 567,
        ingredients: ['Fermented Rice Water', 'Beta-Glucan', 'Ceramides', 'Amino Acids', 'Minerals'],
        benefits: ['Deep hydration', 'Improves texture', 'Preps skin', 'Strengthens barrier', 'Gentle formula'],
        howToUse: 'After cleansing, apply to cotton pad or palms and gently pat into skin. Follow with serum and moisturizer.',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-3',
        name: 'RISE Intensive Repair Cream',
        description: 'A rich, nourishing cream that combines rice bran oil with ceramides and peptides to repair and strengthen the skin barrier. Perfect for dry or mature skin, this cream provides intense moisture and anti-aging benefits.',
        shortDescription: 'Intensive repair cream with rice bran oil',
        price: 156.00,
        compareAtPrice: 195.00,
        sku: 'IRC-003',
        category: 'Moisturizer',
        tags: ['repair', 'anti-aging', 'rice-bran-oil', 'ceramides', 'intensive'],
        images: ['/images/products/IMG-20250808-WA0008.jpg'],
        inStock: true,
        stockQuantity: 34,
        featured: false,
        rating: 4.7,
        reviewCount: 298,
        ingredients: ['Rice Bran Oil', 'Ceramides', 'Peptides', 'Shea Butter', 'Squalane'],
        benefits: ['Repairs skin barrier', 'Intensive moisture', 'Anti-aging', 'Strengthens skin', 'Rich texture'],
        howToUse: 'Apply to clean skin morning and evening. Massage gently until fully absorbed. Can be used alone or over serum.',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-4',
        name: 'RISE Gentle Rice Cleanser',
        description: 'A mild, creamy cleanser infused with rice water and gentle surfactants that effectively removes makeup and impurities without stripping the skin. Suitable for all skin types, including sensitive skin.',
        shortDescription: 'Gentle rice water cleanser for all skin types',
        price: 67.00,
        compareAtPrice: 85.00,
        sku: 'GRC-004',
        category: 'Cleanser',
        tags: ['gentle', 'rice-water', 'makeup-remover', 'sensitive-skin', 'daily-use'],
        images: ['/images/products/IMG-20250808-WA0009.jpg'],
        inStock: true,
        stockQuantity: 89,
        featured: false,
        rating: 4.6,
        reviewCount: 445,
        ingredients: ['Rice Water', 'Coconut-derived Surfactants', 'Glycerin', 'Chamomile Extract', 'Allantoin'],
        benefits: ['Gentle cleansing', 'Removes makeup', 'Maintains moisture', 'Soothes skin', 'pH balanced'],
        howToUse: 'Apply to wet skin, massage gently for 30 seconds, then rinse thoroughly with lukewarm water. Use morning and evening.',
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-5',
        name: 'RISE Brightening Eye Cream',
        description: 'A specialized eye cream featuring rice peptides and caffeine to reduce the appearance of dark circles, puffiness, and fine lines. The lightweight formula is perfect for the delicate eye area.',
        shortDescription: 'Brightening eye cream with rice peptides',
        price: 98.00,
        compareAtPrice: 125.00,
        sku: 'BEC-005',
        category: 'Eye Care',
        tags: ['eye-care', 'brightening', 'rice-peptides', 'caffeine', 'anti-aging'],
        images: ['/images/products/IMG-20250808-WA0010.jpg'],
        inStock: true,
        stockQuantity: 56,
        featured: true,
        rating: 4.5,
        reviewCount: 234,
        ingredients: ['Rice Peptides', 'Caffeine', 'Vitamin K', 'Hyaluronic Acid', 'Cucumber Extract'],
        benefits: ['Reduces dark circles', 'Minimizes puffiness', 'Smooths fine lines', 'Brightens', 'Gentle formula'],
        howToUse: 'Apply small amount to clean under-eye area morning and evening. Gently pat with ring finger until absorbed.',
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-6',
        name: 'RISE Exfoliating Rice Scrub',
        description: 'A gentle physical exfoliant made with finely ground rice powder and jojoba beads to remove dead skin cells and reveal smoother, brighter skin. Enhanced with rice bran oil for added nourishment.',
        shortDescription: 'Gentle exfoliating scrub with rice powder',
        price: 74.00,
        compareAtPrice: 95.00,
        sku: 'ERS-006',
        category: 'Exfoliant',
        tags: ['exfoliation', 'rice-powder', 'gentle', 'brightening', 'weekly-use'],
        images: ['/images/products/IMG-20250808-WA0011.jpg'],
        inStock: true,
        stockQuantity: 78,
        featured: false,
        rating: 4.4,
        reviewCount: 189,
        ingredients: ['Rice Powder', 'Jojoba Beads', 'Rice Bran Oil', 'Honey Extract', 'Vitamin E'],
        benefits: ['Gentle exfoliation', 'Removes dead skin', 'Brightens complexion', 'Smooths texture', 'Nourishes'],
        howToUse: 'Apply to damp skin 2-3 times per week. Massage gently in circular motions, then rinse thoroughly with water.',
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-7',
        name: 'RISE Hydrating Mist',
        description: 'A refreshing facial mist containing rice water and botanical extracts to instantly hydrate and refresh skin throughout the day. Perfect for setting makeup or as a midday pick-me-up.',
        shortDescription: 'Refreshing rice water hydrating mist',
        price: 45.00,
        compareAtPrice: 58.00,
        sku: 'HM-007',
        category: 'Mist',
        tags: ['hydrating', 'rice-water', 'refreshing', 'makeup-setting', 'travel-size'],
        images: ['/images/products/IMG-20250808-WA0012.jpg'],
        inStock: true,
        stockQuantity: 123,
        featured: false,
        rating: 4.3,
        reviewCount: 356,
        ingredients: ['Rice Water', 'Rose Water', 'Aloe Vera', 'Glycerin', 'Green Tea Extract'],
        benefits: ['Instant hydration', 'Refreshes skin', 'Sets makeup', 'Portable', 'Light formula'],
        howToUse: 'Spray 6-8 inches from face with eyes closed. Use throughout the day as needed. Can be used over or under makeup.',
        createdAt: new Date('2024-02-25'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-8',
        name: 'RISE Anti-Aging Night Serum',
        description: 'A potent overnight treatment featuring rice ferment and retinol alternative to promote cell renewal and reduce signs of aging. Wake up to smoother, more youthful-looking skin.',
        shortDescription: 'Overnight anti-aging serum with rice ferment',
        price: 189.00,
        compareAtPrice: 235.00,
        sku: 'ANS-008',
        category: 'Serum',
        tags: ['anti-aging', 'night-treatment', 'rice-ferment', 'retinol-alternative', 'renewal'],
        images: ['/images/products/IMG-20250808-WA0013.jpg'],
        inStock: true,
        stockQuantity: 42,
        featured: true,
        rating: 4.8,
        reviewCount: 278,
        ingredients: ['Rice Ferment', 'Bakuchiol', 'Peptides', 'Niacinamide', 'Hyaluronic Acid'],
        benefits: ['Cell renewal', 'Reduces fine lines', 'Improves texture', 'Firms skin', 'Overnight repair'],
        howToUse: 'Apply 2-3 drops to clean skin every evening. Allow to absorb before applying moisturizer. Use sunscreen during the day.',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-9',
        name: 'RISE Illuminating Face Mask',
        description: 'A weekly treatment mask infused with rice bran extract and vitamin C to brighten and even skin tone. This luxurious cream mask provides deep nourishment while addressing dullness and uneven pigmentation.',
        shortDescription: 'Weekly brightening mask with rice bran',
        price: 85.00,
        compareAtPrice: 110.00,
        sku: 'IFM-009',
        category: 'Mask',
        tags: ['brightening', 'weekly-treatment', 'rice-bran', 'vitamin-c', 'illuminating'],
        images: ['/images/products/IMG-20250808-WA0014.jpg'],
        inStock: true,
        stockQuantity: 67,
        featured: false,
        rating: 4.6,
        reviewCount: 195,
        ingredients: ['Rice Bran Extract', 'Vitamin C', 'Kojic Acid', 'Licorice Root', 'Arbutin'],
        benefits: ['Brightens complexion', 'Evens skin tone', 'Deep nourishment', 'Weekly treatment', 'Luxury experience'],
        howToUse: 'Apply thick layer to clean skin 1-2 times per week. Leave on for 15-20 minutes, then rinse with warm water.',
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-08-01')
      },
      {
        id: 'rise-10',
        name: 'RISE Overnight Recovery Oil',
        description: 'A luxurious facial oil blend featuring rice bran oil, rosehip, and jojoba to deeply nourish and repair skin overnight. This fast-absorbing formula helps restore skin barrier and provides anti-aging benefits.',
        shortDescription: 'Luxurious overnight recovery facial oil',
        price: 142.00,
        compareAtPrice: 178.00,
        sku: 'ORO-010',
        category: 'Oil',
        tags: ['facial-oil', 'overnight-treatment', 'rice-bran-oil', 'anti-aging', 'nourishing'],
        images: ['/images/products/IMG-20250808-WA0015.jpg'],
        inStock: true,
        stockQuantity: 38,
        featured: true,
        rating: 4.9,
        reviewCount: 892,
        ingredients: ['Rice Bran Oil', 'Rosehip Oil', 'Jojoba Oil', 'Vitamin E', 'Squalane'],
        benefits: ['Deep nourishment', 'Repairs overnight', 'Anti-aging', 'Restores barrier', 'Luxury texture'],
        howToUse: 'Apply 3-4 drops to clean skin every evening. Gently massage until absorbed. Can be used alone or under night cream.',
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-08-01')
      }
    ];
  }
}

// Export instance
export const productService = new ProductService();
