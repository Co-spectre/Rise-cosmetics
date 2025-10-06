import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  BarChart3,
  DollarSign,
  Eye,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle2,
  X,
  Save,
  Star,
  Heart,
  MessageSquare,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Shield,
  Zap,
  Target,
  Layers,
  Activity,
  UserCheck,
  UserX,
  Archive,
  RefreshCw,
  PieChart,
  TrendingDown,
  Clock,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';
import { productService } from '@/services/productService';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  lastLogin?: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  userId: string;
  userEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  createdAt: string;
  shippingAddress: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  averageOrderValue: number;
  conversionRate: number;
  revenueGrowth: number;
  userGrowth: number;
  lowStockProducts: number;
  activeUsers: number;
}

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 127450.50,
    totalOrders: 342,
    totalProducts: 24,
    totalUsers: 1247,
    averageOrderValue: 372.80,
    conversionRate: 3.2,
    revenueGrowth: 18.5,
    userGrowth: 24.3,
    lowStockProducts: 5,
    activeUsers: 89
  });

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    compareAtPrice: '',
    category: '',
    stockQuantity: '',
    inStock: true,
    howToUse: '',
    ingredients: [] as string[],
    benefits: [] as string[],
    images: [] as string[]
  });

  const [newProductForm, setNewProductForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    compareAtPrice: '',
    category: '',
    stockQuantity: '',
    inStock: true,
    sku: '',
    tags: '',
    howToUse: '',
    ingredients: '',
    benefits: '',
    images: ''
  });

  // Premium product names for RISE Cosmetics
  const riseProducts: Product[] = [
    {
      id: 'rise-1',
      name: 'Luminous Rice Water Essence',
      description: 'An ultra-lightweight, deeply hydrating essence infused with premium Japanese rice water and fermented sake to brighten and refine skin texture.',
      shortDescription: 'Brightening rice water essence for radiant skin',
      price: 89.00,
      compareAtPrice: 120.00,
      sku: 'RWE-001',
      category: 'Essence',
      tags: ['brightening', 'hydrating', 'anti-aging'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 45,
      featured: true,
      rating: 4.9,
      reviewCount: 127,
      ingredients: ['Rice Water', 'Fermented Sake', 'Niacinamide', 'Hyaluronic Acid'],
      benefits: ['Brightens complexion', 'Reduces dark spots', 'Hydrates deeply'],
      howToUse: 'Apply to clean skin with palms or cotton pad, gently pat until absorbed.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-2',
      name: 'Rejuvenating Rice Bran Serum',
      description: 'A potent anti-aging serum combining rice bran oil with vitamin E and retinol alternatives for smooth, youthful-looking skin.',
      shortDescription: 'Anti-aging serum with rice bran oil',
      price: 145.00,
      compareAtPrice: 180.00,
      sku: 'RBS-002',
      category: 'Serum',
      tags: ['anti-aging', 'nourishing', 'firming'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 32,
      featured: true,
      rating: 4.8,
      reviewCount: 89,
      ingredients: ['Rice Bran Oil', 'Vitamin E', 'Bakuchiol', 'Peptides'],
      benefits: ['Reduces fine lines', 'Firms skin', 'Restores elasticity'],
      howToUse: 'Apply 2-3 drops to face and neck, morning and evening.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-3',
      name: 'Pure Rice Clay Mask',
      description: 'A detoxifying clay mask enriched with rice powder and natural minerals to purify pores and reveal smoother, clearer skin.',
      shortDescription: 'Purifying clay mask with rice powder',
      price: 67.00,
      compareAtPrice: 85.00,
      sku: 'RCM-003',
      category: 'Mask',
      tags: ['purifying', 'detoxifying', 'smoothing'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 58,
      featured: false,
      rating: 4.7,
      reviewCount: 154,
      ingredients: ['Rice Powder', 'Kaolin Clay', 'Charcoal', 'Green Tea Extract'],
      benefits: ['Deep cleanses pores', 'Absorbs excess oil', 'Smooths texture'],
      howToUse: 'Apply evenly to clean skin, leave for 10-15 minutes, rinse with warm water.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-4',
      name: 'Nourishing Rice Milk Cleanser',
      description: 'A gentle, creamy cleanser formulated with rice milk and ceramides to remove impurities while maintaining skin\'s natural moisture barrier.',
      shortDescription: 'Gentle rice milk cleanser for all skin types',
      price: 52.00,
      compareAtPrice: 65.00,
      sku: 'RMC-004',
      category: 'Cleanser',
      tags: ['gentle', 'nourishing', 'moisturizing'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 73,
      featured: true,
      rating: 4.6,
      reviewCount: 203,
      ingredients: ['Rice Milk', 'Ceramides', 'Shea Butter', 'Chamomile Extract'],
      benefits: ['Gentle cleansing', 'Maintains moisture', 'Soothes irritation'],
      howToUse: 'Massage onto damp skin, rinse thoroughly with lukewarm water.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-5',
      name: 'Radiance Rice Glow Oil',
      description: 'A luxurious facial oil blend featuring rice bran oil and precious botanical extracts to restore radiance and suppleness to mature skin.',
      shortDescription: 'Luxurious glow oil for radiant skin',
      price: 198.00,
      compareAtPrice: 245.00,
      sku: 'RGO-005',
      category: 'Oil',
      tags: ['luxury', 'radiance', 'nourishing'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 18,
      featured: true,
      rating: 4.9,
      reviewCount: 67,
      ingredients: ['Rice Bran Oil', 'Rosehip Oil', 'Argan Oil', 'Vitamin C'],
      benefits: ['Restores radiance', 'Deeply nourishes', 'Improves texture'],
      howToUse: 'Apply 3-4 drops to face and neck, gently massage until absorbed.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-6',
      name: 'Hydrating Rice Water Mist',
      description: 'A refreshing facial mist infused with rice water and hyaluronic acid to instantly hydrate and set makeup throughout the day.',
      shortDescription: 'Refreshing rice water facial mist',
      price: 38.00,
      compareAtPrice: 48.00,
      sku: 'RWM-006',
      category: 'Mist',
      tags: ['hydrating', 'refreshing', 'makeup-setting'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 95,
      featured: false,
      rating: 4.5,
      reviewCount: 287,
      ingredients: ['Rice Water', 'Hyaluronic Acid', 'Glycerin', 'Rose Water'],
      benefits: ['Instant hydration', 'Sets makeup', 'Refreshes skin'],
      howToUse: 'Spray 6-8 inches from face, use throughout the day as needed.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-7',
      name: 'Intensive Rice Repair Cream',
      description: 'A rich, reparative night cream with concentrated rice peptides and botanical actives to rejuvenate and restore skin overnight.',
      shortDescription: 'Intensive night repair cream',
      price: 167.00,
      compareAtPrice: 210.00,
      sku: 'RRC-007',
      category: 'Moisturizer',
      tags: ['repair', 'intensive', 'night-care'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 27,
      featured: true,
      rating: 4.8,
      reviewCount: 98,
      ingredients: ['Rice Peptides', 'Retinyl Palmitate', 'Squalane', 'Ceramides'],
      benefits: ['Repairs damage', 'Firms skin', 'Reduces wrinkles'],
      howToUse: 'Apply generously to clean face and neck before bedtime.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-8',
      name: 'Gentle Rice Exfoliating Scrub',
      description: 'A mild exfoliating scrub with finely ground rice and fruit enzymes to gently buff away dead skin cells for a smoother complexion.',
      shortDescription: 'Gentle rice exfoliating scrub',
      price: 74.00,
      compareAtPrice: 92.00,
      sku: 'RES-008',
      category: 'Exfoliator',
      tags: ['exfoliating', 'gentle', 'smoothing'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 41,
      featured: false,
      rating: 4.6,
      reviewCount: 176,
      ingredients: ['Ground Rice', 'Papaya Enzymes', 'Jojoba Beads', 'Aloe Vera'],
      benefits: ['Gentle exfoliation', 'Smooths texture', 'Brightens skin'],
      howToUse: 'Massage gently on damp skin 2-3 times per week, rinse thoroughly.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-9',
      name: 'Rice Ceramide Eye Cream',
      description: 'A delicate eye cream formulated with rice ceramides and caffeine to reduce puffiness, dark circles, and fine lines around the eye area.',
      shortDescription: 'Nourishing rice ceramide eye cream',
      price: 112.00,
      compareAtPrice: 140.00,
      sku: 'REC-009',
      category: 'Eye Care',
      tags: ['eye-care', 'anti-aging', 'firming'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 36,
      featured: true,
      rating: 4.7,
      reviewCount: 142,
      ingredients: ['Rice Ceramides', 'Caffeine', 'Peptides', 'Vitamin K'],
      benefits: ['Reduces puffiness', 'Diminishes dark circles', 'Firms skin'],
      howToUse: 'Gently pat around eye area morning and evening.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-10',
      name: 'Protective Rice SPF 50 Cream',
      description: 'A lightweight, broad-spectrum sunscreen enriched with rice water and antioxidants to protect against UV damage while nourishing skin.',
      shortDescription: 'Protective rice SPF 50 sunscreen',
      price: 58.00,
      compareAtPrice: 72.00,
      sku: 'RSP-010',
      category: 'Sunscreen',
      tags: ['sun-protection', 'antioxidant', 'lightweight'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 67,
      featured: false,
      rating: 4.4,
      reviewCount: 219,
      ingredients: ['Zinc Oxide', 'Rice Water', 'Vitamin E', 'Green Tea Extract'],
      benefits: ['Broad spectrum protection', 'Non-greasy formula', 'Antioxidant protection'],
      howToUse: 'Apply liberally 15 minutes before sun exposure, reapply every 2 hours.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-11',
      name: 'Brightening Rice Vitamin C Serum',
      description: 'A potent vitamin C serum enhanced with rice water and alpha arbutin to target hyperpigmentation and promote an even, luminous complexion.',
      shortDescription: 'Brightening vitamin C serum with rice water',
      price: 134.00,
      compareAtPrice: 165.00,
      sku: 'RVC-011',
      category: 'Serum',
      tags: ['brightening', 'vitamin-c', 'anti-aging'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 23,
      featured: true,
      rating: 4.8,
      reviewCount: 156,
      ingredients: ['Vitamin C', 'Rice Water', 'Alpha Arbutin', 'Ferulic Acid'],
      benefits: ['Brightens complexion', 'Reduces dark spots', 'Provides antioxidant protection'],
      howToUse: 'Apply in the morning to clean skin, follow with sunscreen.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-12',
      name: 'Soothing Rice Aloe Gel',
      description: 'A cooling, soothing gel combining rice water with organic aloe vera to calm irritated skin and provide instant relief from sensitivity.',
      shortDescription: 'Soothing rice and aloe vera gel',
      price: 45.00,
      compareAtPrice: 58.00,
      sku: 'RAG-012',
      category: 'Treatment',
      tags: ['soothing', 'calming', 'sensitive-skin'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 82,
      featured: false,
      rating: 4.6,
      reviewCount: 234,
      ingredients: ['Rice Water', 'Organic Aloe Vera', 'Centella Asiatica', 'Panthenol'],
      benefits: ['Soothes irritation', 'Reduces redness', 'Hydrates skin'],
      howToUse: 'Apply to affected areas as needed, can be used morning and evening.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-13',
      name: 'Luxe Rice Renewal Set',
      description: 'A complete skincare ritual featuring our best-selling rice water essence, rejuvenating serum, and intensive repair cream in an elegant gift set.',
      shortDescription: 'Complete rice skincare ritual set',
      price: 398.00,
      compareAtPrice: 485.00,
      sku: 'LRR-013',
      category: 'Set',
      tags: ['gift-set', 'complete-routine', 'luxury'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 15,
      featured: true,
      rating: 4.9,
      reviewCount: 78,
      ingredients: ['Rice Water', 'Rice Bran Oil', 'Rice Peptides', 'Multiple Actives'],
      benefits: ['Complete skincare routine', 'Visible results', 'Luxury experience'],
      howToUse: 'Follow the included step-by-step routine guide for optimal results.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-14',
      name: 'Purifying Rice Charcoal Mask',
      description: 'A deep-cleansing mask combining activated charcoal with rice powder to draw out impurities and minimize the appearance of pores.',
      shortDescription: 'Deep-cleansing charcoal and rice mask',
      price: 79.00,
      compareAtPrice: 98.00,
      sku: 'PCM-014',
      category: 'Mask',
      tags: ['purifying', 'deep-cleansing', 'pore-care'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 44,
      featured: false,
      rating: 4.5,
      reviewCount: 167,
      ingredients: ['Activated Charcoal', 'Rice Powder', 'Bentonite Clay', 'Tea Tree Oil'],
      benefits: ['Deep cleanses pores', 'Removes blackheads', 'Controls oil'],
      howToUse: 'Apply to clean skin, leave for 15-20 minutes until dry, peel off gently.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rise-15',
      name: 'Nourishing Rice Body Lotion',
      description: 'A rich, fast-absorbing body lotion infused with rice milk and shea butter to deeply moisturize and soften skin from head to toe.',
      shortDescription: 'Nourishing rice milk body lotion',
      price: 62.00,
      compareAtPrice: 78.00,
      sku: 'RBL-015',
      category: 'Body Care',
      tags: ['body-care', 'moisturizing', 'nourishing'],
      images: ['/image-1751635103758.png'],
      inStock: true,
      stockQuantity: 91,
      featured: false,
      rating: 4.7,
      reviewCount: 298,
      ingredients: ['Rice Milk', 'Shea Butter', 'Cocoa Butter', 'Vitamin E'],
      benefits: ['Deep moisturization', 'Long-lasting hydration', 'Silky smooth skin'],
      howToUse: 'Apply to clean, dry skin and massage until fully absorbed.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Set RISE products as the main product catalog
      setProducts(riseProducts);
      
      // Mock users data
      setUsers([
        {
          id: '1',
          name: 'Isabella Rossi',
          email: 'isabella@email.com',
          phone: '+39 123 456 7890',
          role: 'customer',
          status: 'active',
          createdAt: '2024-01-15',
          lastLogin: '2024-08-01',
          totalOrders: 12,
          totalSpent: 1450.80
        },
        {
          id: '2',
          name: 'Sophia Chen',
          email: 'sophia@email.com',
          phone: '+1 555 123 4567',
          role: 'customer',
          status: 'active',
          createdAt: '2024-02-20',
          lastLogin: '2024-08-02',
          totalOrders: 8,
          totalSpent: 890.50
        },
        // Add more mock users...
      ]);

      // Mock orders data
      setOrders([
        {
          id: 'ORD-001',
          userId: '1',
          userEmail: 'isabella@email.com',
          status: 'delivered',
          total: 245.50,
          items: 3,
          createdAt: '2024-07-28',
          shippingAddress: 'Via Roma 123, Milano, Italy'
        },
        // Add more mock orders...
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription || '',
      price: product.price.toString(),
      compareAtPrice: product.compareAtPrice?.toString() || '',
      category: product.category,
      stockQuantity: product.stockQuantity?.toString() || '',
      inStock: product.inStock,
      howToUse: product.howToUse || '',
      ingredients: product.ingredients || [],
      benefits: product.benefits || [],
      images: product.images || []
    });
    setShowEditModal(true);
  };

  const handleAddProduct = () => {
    setNewProductForm({
      name: '',
      description: '',
      shortDescription: '',
      price: '',
      compareAtPrice: '',
      category: '',
      stockQuantity: '',
      inStock: true,
      sku: '',
      tags: '',
      howToUse: '',
      ingredients: '',
      benefits: '',
      images: ''
    });
    setShowAddModal(true);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You need administrator privileges to access this dashboard.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RISE Admin Dashboard</h1>
              <p className="text-gray-600">Manage your luxury cosmetics empire</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                {stats.activeUsers} active users
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{stats.revenueGrowth}% from last month
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                      <p className="text-sm text-blue-600 flex items-center mt-1">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Avg: ${stats.averageOrderValue}
                      </p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                      <p className="text-sm text-orange-600 flex items-center mt-1">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        {stats.lowStockProducts} low stock
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{stats.userGrowth}% growth
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={handleAddProduct} className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Import Products</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Data</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync Inventory</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.userEmail}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total}</p>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button onClick={handleAddProduct}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={product.images[0] || '/placeholder.svg'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                        <Badge variant={product.inStock ? 'default' : 'destructive'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">${product.price}</span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-gray-500 line-through">${product.compareAtPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-gray-600">Stock: {product.stockQuantity}</span>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Newsletter
                </Button>
              </div>
            </div>

            {/* Users Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">User</th>
                        <th className="text-left p-4 font-medium text-gray-900">Contact</th>
                        <th className="text-left p-4 font-medium text-gray-900">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900">Orders</th>
                        <th className="text-left p-4 font-medium text-gray-900">Total Spent</th>
                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">ID: {user.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <p className="text-sm text-gray-900">{user.email}</p>
                              {user.phone && <p className="text-sm text-gray-600">{user.phone}</p>}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                                {user.status}
                              </Badge>
                              <p className="text-xs text-gray-600">
                                Last login: {user.lastLogin || 'Never'}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-medium">{user.totalOrders}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-medium">${user.totalSpent.toLocaleString()}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync
                </Button>
              </div>
            </div>

            {/* Orders Grid */}
            <div className="grid gap-6">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.userEmail}</p>
                          <p className="text-sm text-gray-600">{order.items} items • {order.createdAt}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${order.total}</p>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {order.shippingAddress}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <PieChart className="w-16 h-16 text-gray-400" />
                    <span className="text-gray-500 ml-4">Chart visualization would go here</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                    <span className="text-gray-500 ml-4">Chart visualization would go here</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">General Settings</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="w-4 h-4 mr-2" />
                        Website Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Settings
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">E-commerce Settings</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Payment Methods
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Package className="w-4 h-4 mr-2" />
                        Shipping Options
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        Tax Configuration
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Edit Product</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                <Input
                  type="number"
                  value={editForm.stockQuantity}
                  onChange={(e) => setEditForm({ ...editForm, stockQuantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Add New Product</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <Input
                    type="number"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Compare at Price</label>
                  <Input
                    type="number"
                    value={newProductForm.compareAtPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, compareAtPrice: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Input
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    placeholder="e.g., Serum, Cleanser"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SKU</label>
                  <Input
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                    placeholder="e.g., RWE-001"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Detailed product description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <Input
                  value={newProductForm.shortDescription}
                  onChange={(e) => setNewProductForm({ ...newProductForm, shortDescription: e.target.value })}
                  placeholder="Brief product description"
                />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
