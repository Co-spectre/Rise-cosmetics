import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
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
  Search,
  Filter,
  Download,
  Upload,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Zap,
  Activity,
  PieChart,
  LineChart,
  RefreshCw,
  FileText,
  Shield,
  UserCheck,
  UserX,
  ArrowUp,
  ArrowDown,
  Globe,
  MoreVertical,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: { productId: string; quantity: number; price: number; name: string }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  shippingAddress: string;
  trackingNumber?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: Date;
  lastOrderDate?: Date;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Modal and form states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // Form data for adding/editing products
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    stockQuantity: '',
    sku: '',
    category: '',
    tags: '',
    inStock: true,
    featured: false
  });

  // Sample data for orders and customers
  const sampleOrders: Order[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@email.com',
      products: [
        { productId: '1', quantity: 2, price: 89.99, name: 'Luxe Radiance Serum' },
        { productId: '2', quantity: 1, price: 64.99, name: 'Golden Hour Moisturizer' }
      ],
      total: 244.97,
      status: 'processing',
      orderDate: new Date('2024-01-15'),
      shippingAddress: '123 Main St, New York, NY 10001',
      trackingNumber: 'TRK123456789'
    },
    {
      id: '2',
      customerName: 'Emily Chen',
      customerEmail: 'emily@email.com',
      products: [
        { productId: '3', quantity: 1, price: 129.99, name: 'Platinum Renewal Cream' }
      ],
      total: 129.99,
      status: 'shipped',
      orderDate: new Date('2024-01-14'),
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      trackingNumber: 'TRK987654321'
    },
    {
      id: '3',
      customerName: 'Michael Brown',
      customerEmail: 'michael@email.com',
      products: [
        { productId: '1', quantity: 1, price: 89.99, name: 'Luxe Radiance Serum' }
      ],
      total: 89.99,
      status: 'delivered',
      orderDate: new Date('2024-01-12'),
      shippingAddress: '789 Pine St, Chicago, IL 60601'
    }
  ];

  const sampleCustomers: Customer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+1 (555) 123-4567',
      totalOrders: 5,
      totalSpent: 892.45,
      joinDate: new Date('2023-10-15'),
      lastOrderDate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Emily Chen',
      email: 'emily@email.com',
      phone: '+1 (555) 987-6543',
      totalOrders: 3,
      totalSpent: 456.78,
      joinDate: new Date('2023-11-20'),
      lastOrderDate: new Date('2024-01-14')
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@email.com',
      phone: '+1 (555) 456-7890',
      totalOrders: 2,
      totalSpent: 234.56,
      joinDate: new Date('2023-12-05'),
      lastOrderDate: new Date('2024-01-12')
    }
  ];

  // Redirect if not admin/manager
  useEffect(() => {
    if (user && user.role !== 'admin' && user.role !== 'manager') {
      navigate('/');
    }
  }, [user, navigate]);

  // Enhanced statistics data
  const statsData = {
    totalProducts: 24,
    totalUsers: 1247,
    totalOrders: 189,
    revenue: 42850,
    lowStockItems: 5,
    pendingShipments: 12,
    monthlyGrowth: 23.5,
    activeUsers: 856,
    completedOrders: 167,
    averageOrderValue: 156.32
  };

  // Recent orders with detailed information
  const recentOrders = [
    { 
      id: 'ORD-001', 
      customer: 'Sarah Johnson', 
      email: 'sarah@email.com',
      amount: 189.99, 
      status: 'processing',
      items: 3,
      date: '2025-08-02',
      shippingAddress: 'New York, NY',
      paymentStatus: 'paid'
    },
    { 
      id: 'ORD-002', 
      customer: 'Mike Chen', 
      email: 'mike@email.com',
      amount: 256.50, 
      status: 'shipped',
      items: 2,
      date: '2025-08-01',
      shippingAddress: 'San Francisco, CA',
      paymentStatus: 'paid'
    },
    { 
      id: 'ORD-003', 
      customer: 'Emma Davis', 
      email: 'emma@email.com',
      amount: 127.25, 
      status: 'delivered',
      items: 4,
      date: '2025-07-31',
      shippingAddress: 'Los Angeles, CA',
      paymentStatus: 'paid'
    },
    { 
      id: 'ORD-004', 
      customer: 'James Wilson', 
      email: 'james@email.com',
      amount: 345.75, 
      status: 'pending',
      items: 5,
      date: '2025-08-02',
      shippingAddress: 'Chicago, IL',
      paymentStatus: 'pending'
    }
  ];

  // Sample product data with enhanced details
  const sampleProducts = [
    {
      id: '1',
      name: 'Luminous Rice Water Essence',
      description: 'Premium brightening essence with Japanese rice water',
      shortDescription: 'Brightening rice water essence',
      price: 89,
      stockQuantity: 45,
      sku: 'RWE-001',
      category: 'Essence',
      tags: ['brightening', 'hydrating', 'anti-aging'],
      images: ['/placeholder.svg'],
      inStock: true,
      featured: true,
      rating: 4.9,
      reviewCount: 127,
      sales: 234,
      ingredients: ['Rice Water', 'Fermented Sake', 'Niacinamide'],
      benefits: ['Brightens complexion', 'Reduces dark spots', 'Hydrates deeply'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01')
    },
    {
      id: '2',
      name: 'Rejuvenating Rice Bran Serum',
      description: 'Anti-aging serum with rice bran oil and vitamin E',
      shortDescription: 'Anti-aging rice bran serum',
      price: 145,
      stockQuantity: 12, // Low stock
      sku: 'RBS-002',
      category: 'Serum',
      tags: ['anti-aging', 'nourishing', 'firming'],
      images: ['/placeholder.svg'],
      inStock: true,
      featured: true,
      rating: 4.8,
      reviewCount: 89,
      sales: 156,
      ingredients: ['Rice Bran Oil', 'Vitamin E', 'Bakuchiol'],
      benefits: ['Reduces fine lines', 'Firms skin', 'Restores elasticity'],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-08-01')
    },
    {
      id: '3',
      name: 'Pure Rice Clay Mask',
      description: 'Detoxifying clay mask with rice powder',
      shortDescription: 'Purifying clay mask',
      price: 67,
      stockQuantity: 8, // Low stock
      sku: 'RCM-003',
      category: 'Mask',
      tags: ['purifying', 'detoxifying', 'smoothing'],
      images: ['/placeholder.svg'],
      inStock: true,
      featured: false,
      rating: 4.7,
      reviewCount: 154,
      sales: 98,
      ingredients: ['Rice Powder', 'Kaolin Clay', 'Activated Charcoal'],
      benefits: ['Deep cleanses pores', 'Absorbs excess oil', 'Smooths texture'],
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-08-01')
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setOrders(sampleOrders);
    setCustomers(sampleCustomers);
  }, []);

  // Product Management Functions
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: productForm.name,
      description: productForm.description,
      shortDescription: productForm.shortDescription || productForm.description.substring(0, 100),
      price: parseFloat(productForm.price),
      stockQuantity: parseInt(productForm.stockQuantity),
      sku: productForm.sku,
      category: productForm.category,
      tags: productForm.tags.split(',').map(tag => tag.trim()),
      images: ['/placeholder.svg'],
      inStock: productForm.inStock,
      featured: productForm.featured,
      rating: 0,
      reviewCount: 0,
      sales: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProducts(prev => [...prev, newProduct]);
    setShowAddProductModal(false);
    resetProductForm();
    
    // Show success notification
    alert('Product added successfully!');
  };

  const handleEditProduct = () => {
    if (!selectedProduct) return;

    const updatedProduct: Product = {
      ...selectedProduct,
      name: productForm.name,
      description: productForm.description,
      shortDescription: productForm.shortDescription || productForm.description.substring(0, 100),
      price: parseFloat(productForm.price),
      stockQuantity: parseInt(productForm.stockQuantity),
      sku: productForm.sku,
      category: productForm.category,
      tags: productForm.tags.split(',').map(tag => tag.trim()),
      inStock: productForm.inStock,
      featured: productForm.featured,
      updatedAt: new Date()
    };

    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
    setShowEditProductModal(false);
    setSelectedProduct(null);
    resetProductForm();
    
    // Show success notification
    alert('Product updated successfully!');
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setShowDeleteConfirm(false);
    setSelectedProduct(null);
    
    // Show success notification
    alert('Product deleted successfully!');
  };

  const handleRestockProduct = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, stockQuantity: (p.stockQuantity || 0) + newStock, updatedAt: new Date() }
        : p
    ));
    
    alert(`Stock updated successfully!`);
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      shortDescription: '',
      price: '',
      stockQuantity: '',
      sku: '',
      category: '',
      tags: '',
      inStock: true,
      featured: false
    });
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription || '',
      price: product.price.toString(),
      stockQuantity: (product.stockQuantity || 0).toString(),
      sku: product.sku,
      category: product.category,
      tags: product.tags.join(', '),
      inStock: product.inStock,
      featured: product.featured
    });
    setShowEditProductModal(true);
  };

  const openDeleteConfirm = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteConfirm(true);
  };

  // Order Management Functions
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    
    alert(`Order status updated to ${newStatus}!`);
  };

  const handleAddTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, trackingNumber, status: 'shipped' }
        : order
    ));
    
    alert('Tracking number added and order marked as shipped!');
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Customer Management Functions
  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 1000) return { label: 'VIP', color: 'bg-purple-100 text-purple-800' };
    if (totalSpent >= 500) return { label: 'Gold', color: 'bg-yellow-100 text-yellow-800' };
    if (totalSpent >= 200) return { label: 'Silver', color: 'bg-gray-100 text-gray-800' };
    return { label: 'Bronze', color: 'bg-orange-100 text-orange-800' };
  };

  // Navigation items for admin panel
  const navItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'shipments', name: 'Shipments', icon: Truck },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    if (quantity < 50) return { label: 'In Stock', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Well Stocked', color: 'bg-green-100 text-green-800' };
  };

  const StatCard = ({ title, value, icon: Icon, change, subtext }: any) => (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {change && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                change > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {change > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {Math.abs(change)}% vs last month
              </div>
            )}
            {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-olive-500 to-rice-500 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-olive-50 to-rice-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">You don't have permission to access the admin dashboard.</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${statsData.revenue.toLocaleString()}`}
          icon={DollarSign}
          change={15.3}
          subtext="Last 30 days"
        />
        <StatCard
          title="Total Orders"
          value={statsData.totalOrders}
          icon={ShoppingCart}
          change={8.2}
          subtext={`${statsData.completedOrders} completed`}
        />
        <StatCard
          title="Total Products"
          value={statsData.totalProducts}
          icon={Package}
          change={4.1}
          subtext={`${statsData.lowStockItems} low stock`}
        />
        <StatCard
          title="Active Users"
          value={statsData.activeUsers}
          icon={Users}
          change={12.5}
          subtext={`${statsData.totalUsers} total users`}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-24 flex-col space-y-2 hover:bg-olive-50 hover:border-olive-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
              variant="outline"
              onClick={() => setShowAddProductModal(true)}
            >
              <Plus className="w-6 h-6 text-olive-600" />
              <span className="font-medium">Add Product</span>
            </Button>
            <Button 
              className="h-24 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
              variant="outline"
            >
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="font-medium">View Reports</span>
            </Button>
            <Button 
              className="h-24 flex-col space-y-2 hover:bg-green-50 hover:border-green-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
              variant="outline"
              onClick={() => setActiveTab('shipments')}
            >
              <Truck className="w-6 h-6 text-green-600" />
              <span className="font-medium">Manage Shipments</span>
            </Button>
            <Button 
              className="h-24 flex-col space-y-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
              variant="outline"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6 text-amber-600" />
              <span className="font-medium">Notifications</span>
              {statsData.lowStockItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {statsData.lowStockItems}
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Recent Orders
              </span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.slice(0, 4).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-600">{order.id} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.amount}</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.filter(p => p.stockQuantity < 15).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-yellow-800">{product.stockQuantity} left</p>
                    <Button size="sm" className="mt-1">Restock</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Products Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your product catalog, inventory, and pricing</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Products
          </Button>
          <Button 
            onClick={() => setShowAddProductModal(true)}
            className="bg-gradient-to-r from-olive-500 to-rice-500 hover:from-olive-600 hover:to-rice-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 border-gray-300 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
              />
            </div>
            <Button 
              variant="outline"
              className="hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Sales</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.sku.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((product) => {
                  const stockStatus = getStockStatus(product.stockQuantity);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">${product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {product.stockQuantity} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {product.inStock ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.sales || 0} sold</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditModal(product)}
                            className="text-blue-600 hover:text-white hover:bg-blue-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openDeleteConfirm(product)}
                            className="text-red-600 hover:text-white hover:bg-red-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const restockAmount = prompt('Enter restock amount:', '10');
                              if (restockAmount && !isNaN(Number(restockAmount))) {
                                handleRestockProduct(product.id, Number(restockAmount));
                              }
                            }}
                            className="text-green-600 hover:text-white hover:bg-green-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Restock Product"
                          >
                            <Package className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{order.orderDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-700">{order.products.length} items</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${getStatusColor(order.status)} focus:ring-2 focus:ring-olive-500 focus:border-olive-500`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openOrderDetails(order)}
                          className="text-blue-600 hover:text-white hover:bg-blue-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                          title="View Order Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const trackingNumber = prompt('Enter tracking number:');
                            if (trackingNumber) {
                              handleAddTrackingNumber(order.id, trackingNumber);
                            }
                          }}
                          className="text-green-600 hover:text-white hover:bg-green-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                          title="Add Tracking Number"
                        >
                          <Truck className="w-4 h-4" />
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
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">View and manage customer accounts</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Customers
        </Button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">VIP Customers</p>
                <p className="text-3xl font-bold text-gray-900">
                  {customers.filter(c => getCustomerTier(c.totalSpent).label === 'VIP').length}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                     customers.reduce((sum, c) => sum + c.totalOrders, 0) || 0).toFixed(2)}
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Last Order</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((customer) => {
                  const tier = getCustomerTier(customer.totalSpent);
                  return (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-olive-500 to-rice-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-600">ID: {customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{customer.email}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {customer.joinDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{customer.totalOrders}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">${customer.totalSpent.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Badge className={tier.color}>
                          {tier.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {customer.lastOrderDate ? customer.lastOrderDate.toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-blue-600 hover:text-white hover:bg-blue-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="View Customer Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-green-600 hover:text-white hover:bg-green-500 transition-all duration-200 rounded-lg p-2 shadow-sm hover:shadow-md transform hover:scale-105"
                            title="Send Email"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'customers':
        return renderCustomers();
      case 'shipments':
        return <div className="p-8 text-center text-gray-500">Shipment management coming soon...</div>;
      case 'analytics':
        return <div className="p-8 text-center text-gray-500">Analytics dashboard coming soon...</div>;
      case 'settings':
        return <div className="p-8 text-center text-gray-500">Settings panel coming soon...</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-olive-500 to-rice-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RISE Admin</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:bg-olive-50 hover:border-olive-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Bell className="w-4 h-4" />
                {statsData.lowStockItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {statsData.lowStockItems}
                  </span>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Globe className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-sm">
          <nav className="p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 transform hover:scale-[1.02] ${
                      isActive
                        ? 'bg-gradient-to-r from-olive-500 to-rice-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-olive-50 hover:to-rice-50 hover:text-olive-700 hover:shadow-md'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-olive-500 to-rice-500 rounded-lg flex items-center justify-center mr-4">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Add New Product</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SKU *</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                    placeholder="Enter SKU (e.g., RC-001)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({...productForm, stockQuantity: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="skincare">Skincare</option>
                    <option value="makeup">Makeup</option>
                    <option value="haircare">Haircare</option>
                    <option value="fragrance">Fragrance</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    value={productForm.tags}
                    onChange={(e) => setProductForm({...productForm, tags: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                    placeholder="organic, moisturizing, anti-aging"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 h-28 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200 resize-none"
                  placeholder="Enter detailed product description"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                <input
                  type="text"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({...productForm, shortDescription: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-olive-500 focus:ring-olive-500 transition-all duration-200"
                  placeholder="Brief product description for listings"
                />
              </div>

              <div className="mt-6 space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-olive-300 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({...productForm, inStock: e.target.checked})}
                    className="mr-3 w-4 h-4 text-olive-500 focus:ring-olive-500"
                  />
                  <span className="text-sm font-medium">Product is in stock</span>
                </label>

                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-olive-300 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                    className="mr-3 w-4 h-4 text-olive-500 focus:ring-olive-500"
                  />
                  <span className="text-sm font-medium">Featured Product</span>
                  <span className="ml-2 text-xs text-gray-500">(will appear on homepage)</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddProductModal(false);
                    resetProductForm();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-6 py-3 bg-gradient-to-r from-olive-500 to-rice-500 text-white rounded-lg hover:from-olive-600 hover:to-rice-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-6">Edit Product</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter SKU"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({...productForm, stockQuantity: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    <option value="skincare">Skincare</option>
                    <option value="makeup">Makeup</option>
                    <option value="haircare">Haircare</option>
                    <option value="fragrance">Fragrance</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.tags}
                    onChange={(e) => setProductForm({...productForm, tags: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="organic, moisturizing, anti-aging"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                  placeholder="Enter product description"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <input
                  type="text"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({...productForm, shortDescription: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Brief product description"
                />
              </div>

              <div className="mt-4 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({...productForm, inStock: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">In Stock</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">Featured Product</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowEditProductModal(false);
                    setSelectedProduct(null);
                    resetProductForm();
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditProduct}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Delete</h3>
              </div>
              <p className="mb-6 text-gray-700">
                Are you sure you want to delete <span className="font-semibold">"{selectedProduct.name}"</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(selectedProduct.id)}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Order #{selectedOrder.id}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Ordered: {selectedOrder.orderDate.toLocaleDateString()}</span>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowOrderDetails(false);
                    setSelectedOrder(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Name</label>
                        <p className="text-gray-900">{selectedOrder.customerName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-900">{selectedOrder.customerEmail}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Shipping Address</label>
                        <p className="text-gray-900">{selectedOrder.shippingAddress}</p>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Tracking Number</label>
                          <p className="text-gray-900 font-mono">{selectedOrder.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.products.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Total</span>
                          <span className="text-lg font-bold text-gray-900">${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  onClick={() => {
                    setShowOrderDetails(false);
                    setSelectedOrder(null);
                  }}
                  variant="outline"
                  className="px-6 py-3 border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    const trackingNumber = prompt('Enter tracking number:', selectedOrder.trackingNumber || '');
                    if (trackingNumber) {
                      handleAddTrackingNumber(selectedOrder.id, trackingNumber);
                      setShowOrderDetails(false);
                      setSelectedOrder(null);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Update Tracking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
