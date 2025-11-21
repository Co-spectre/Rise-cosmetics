import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Search, Filter, Star, ShoppingBag, Sparkles, Heart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const loadProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: parseInt(product.id),
      name: product.name,
      subtitle: product.shortDescription || '',
      price: product.price,
      type: product.category,
      color: '',
      description: product.description,
      image: product.images[0]
    };
    addToCart(cartItem, 1);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const wishlistItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      };
      addToWishlist(wishlistItem);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-neutral-50 to-stone-50/50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        {/* Search and Filter Bar */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-stone-300 transition-all duration-200"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors duration-200 w-full sm:w-auto"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform duration-200",
                showFilters && "rotate-180"
              )} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-xl shadow-lg border border-stone-200 p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-300"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-stone-300"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Price:</span>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">€{priceRange.max}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16 sm:py-20">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm sm:text-base text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-stone-100"
                >
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`} className="block">
                    <div 
                      className={`aspect-[3/4] bg-gradient-to-br ${
                        index % 3 === 0 ? 'from-stone-100 to-neutral-100' :
                        index % 3 === 1 ? 'from-neutral-100 to-stone-100' :
                        'from-stone-50 to-neutral-100'
                      } relative overflow-hidden flex items-center justify-center`}
                    >
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100">
                          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-stone-400" />
                        </div>
                      )}
                      
                      {/* Fallback when image fails */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-stone-100"
                        style={{ display: product.images && product.images[0] ? 'none' : 'flex' }}
                      >
                        <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-stone-400" />
                      </div>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                    <p className="text-stone-500 text-[10px] sm:text-xs uppercase tracking-wider font-light">
                      {product.category}
                    </p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xs sm:text-sm font-normal text-stone-700 group-hover:text-stone-900 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm sm:text-base font-medium text-stone-800">
                      €{product.price.toFixed(2)}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-stone-400 text-white rounded-xl hover:bg-stone-500 transition-all duration-300 text-[11px] sm:text-xs font-light tracking-wide"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16 sm:py-20 px-4">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">No Products Found</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 1000 });
                }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-stone-400 text-white rounded-xl hover:bg-stone-500 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;