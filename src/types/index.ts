// Core Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  category: string;
  tags: string[];
  images: string[];
  inStock: boolean;
  stockQuantity?: number;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  sales?: number; // Number of units sold
  ingredients?: string[];
  benefits?: string[];
  howToUse?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  isEmailVerified: boolean;
  role: 'customer' | 'admin';
  createdAt: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

// Order Types
export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
  sku: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  email: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  transactionId?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  acceptTerms: boolean;
}

// Search & Filter Types
export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  rating?: number;
  tags?: string[];
}

export interface SearchResults {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface CheckoutData {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  shippingMethod: string;
  specialInstructions?: string;
}
