import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Save
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';
import { productService } from '@/services/productService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
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

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await productService.getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
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

  const handleSaveProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      const updatedProduct = {
        ...selectedProduct,
        name: editForm.name,
        description: editForm.description,
        shortDescription: editForm.shortDescription,
        price: parseFloat(editForm.price),
        compareAtPrice: editForm.compareAtPrice ? parseFloat(editForm.compareAtPrice) : undefined,
        category: editForm.category,
        stockQuantity: editForm.stockQuantity ? parseInt(editForm.stockQuantity) : undefined,
        inStock: editForm.inStock,
        howToUse: editForm.howToUse,
        ingredients: editForm.ingredients,
        benefits: editForm.benefits,
        images: editForm.images
      };

      await productService.updateProduct(selectedProduct.id, updatedProduct);
      await loadProducts();
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        await loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(p => p.stockQuantity && p.stockQuantity < 10);
  
  const stats = [
    {
      title: 'Total Products',
      value: products.length.toString(),
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Low Stock',
      value: lowStockProducts.length.toString(),
      icon: AlertTriangle,
      color: 'bg-orange-500'
    },
    {
      title: 'In Stock',
      value: products.filter(p => p.inStock).length.toString(),
      icon: CheckCircle2,
      color: 'bg-green-500'
    },
    {
      title: 'Categories',
      value: new Set(products.map(p => p.category)).size.toString(),
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your inventory and products</p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'inventory', label: 'Inventory', icon: AlertTriangle },
                { id: 'users', label: 'Users', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                            <p className="text-2xl font-light text-gray-900">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-lg ${stat.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Low Stock Alert */}
              {lowStockProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-5 h-5" />
                      Low Stock Alert
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lowStockProducts.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                          <Badge variant="outline" className="text-orange-600">
                            {product.stockQuantity} left
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Product Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="bg-black hover:bg-gray-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Products Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-600">Product</th>
                          <th className="text-left p-4 font-medium text-gray-600">Category</th>
                          <th className="text-left p-4 font-medium text-gray-600">Price</th>
                          <th className="text-left p-4 font-medium text-gray-600">Stock</th>
                          <th className="text-left p-4 font-medium text-gray-600">Status</th>
                          <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.images[0] || '/placeholder.svg'}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{product.name}</p>
                                  <p className="text-sm text-gray-600">{product.shortDescription}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{product.category}</Badge>
                            </td>
                            <td className="p-4">
                              <p className="font-medium">€{product.price}</p>
                            </td>
                            <td className="p-4">
                              <p className={`font-medium ${
                                product.stockQuantity && product.stockQuantity < 10 
                                  ? 'text-orange-600' 
                                  : 'text-gray-900'
                              }`}>
                                {product.stockQuantity || 'N/A'}
                              </p>
                            </td>
                            <td className="p-4">
                              <Badge
                                variant={product.inStock ? 'default' : 'secondary'}
                                className={product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                              >
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
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

          {/* Edit Product Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium">Edit Product</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditModal(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="serums">Serums</option>
                        <option value="moisturizers">Moisturizers</option>
                        <option value="cleansers">Cleansers</option>
                        <option value="toners">Toners</option>
                        <option value="masks">Masks</option>
                        <option value="oils">Oils</option>
                        <option value="sunscreen">Sunscreen</option>
                        <option value="eye care">Eye Care</option>
                        <option value="lip care">Lip Care</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (€)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Compare Price (€)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.compareAtPrice}
                        onChange={(e) => setEditForm({ ...editForm, compareAtPrice: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={editForm.stockQuantity}
                        onChange={(e) => setEditForm({ ...editForm, stockQuantity: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={editForm.shortDescription}
                      onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      How to Use
                    </label>
                    <textarea
                      rows={3}
                      value={editForm.howToUse}
                      onChange={(e) => setEditForm({ ...editForm, howToUse: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={editForm.inStock}
                      onChange={(e) => setEditForm({ ...editForm, inStock: e.target.checked })}
                      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                      In Stock
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveProduct} className="bg-black hover:bg-gray-800">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setShowEditModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
