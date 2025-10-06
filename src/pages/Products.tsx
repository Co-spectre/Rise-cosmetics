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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-16">
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-all duration-200"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
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
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Price Range:</span>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">€{priceRange.max}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : (
            /* Products Grid with Signature Collection Style */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group block bg-white border border-rice-100 hover:border-olive-200 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.03] overflow-hidden"
                >
                  {/* Product Image Area with Gradient Background */}
                  <div 
                    className={`aspect-[4/5] bg-gradient-to-br ${
                      index % 3 === 0 ? 'from-olive-50 to-rice-50' :
                      index % 3 === 1 ? 'from-rice-50 to-olive-50' :
                      'from-olive-50 to-rice-50'
                    } relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}
                  >
                    {/* Product Image or Visualization */}
                    <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // If image fails to load, hide it and show fallback
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback bottle visualization - always present but hidden if image loads */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ display: product.images && product.images[0] ? 'none' : 'flex' }}
                      >
                        {product.category === 'Serums' || product.category === 'Eye Care' ? (
                          <div className="w-20 h-32 bg-gradient-to-b from-olive-600 to-olive-800 relative shadow-2xl">
                            <div className="absolute top-0 w-full h-6 bg-gradient-to-b from-olive-500 to-olive-600 rounded-t-sm" />
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-rice-300 rounded-full" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="absolute right-1 top-3 w-0.5 h-24 bg-white/30 rounded-full" />
                          </div>
                        ) : (
                          <div className="w-24 h-30 bg-gradient-to-b from-rice-600 to-rice-800 relative shadow-2xl rounded-sm">
                            <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-rice-500 to-rice-600 rounded-t-sm" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <div className="absolute right-1 top-2 w-0.5 h-20 bg-white/30 rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Special Badge for featured products */}
                    {(product.featured || index < 3) && (
                      <div className="absolute top-4 right-4 bg-olive-700 text-white px-3 py-1 text-xs tracking-widest uppercase font-medium">
                        Signature
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-olive-600 text-xs tracking-[0.2em] uppercase mb-2 font-medium">{product.category}</p>
                      <h3 className="text-xl font-light text-olive-900 mb-3 tracking-wide group-hover:text-olive-700 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className="text-olive-800/70 text-sm leading-relaxed font-light line-clamp-2">
                      {product.shortDescription || product.description}
                    </p>
                    
                    {/* Rating Display */}
                    {product.rating && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-olive-400 text-olive-400' : 'text-olive-200'}`}
                              strokeWidth={1}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-olive-600/70">({product.rating})</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-rice-100">
                      <span className="text-2xl font-light text-olive-900 tracking-wide">
                        €{product.price}
                      </span>
                      <div className="flex space-x-3">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleWishlistToggle(product);
                          }}
                          className={`p-3 border transition-all duration-300 group/btn ${
                            isInWishlist(product.id) 
                              ? 'border-rose-300 bg-rose-50 text-rose-600' 
                              : 'border-olive-200 hover:bg-olive-600 hover:text-white hover:border-olive-600'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <Heart 
                            className={`w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200 ${
                              isInWishlist(product.id) ? 'fill-rose-600' : ''
                            }`} 
                            strokeWidth={1.5} 
                          />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className="px-6 py-3 bg-olive-700 text-white border border-olive-700 hover:bg-olive-800 transition-all duration-300 group/btn"
                          aria-label="Add to cart"
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                            <span className="text-sm font-medium tracking-wide">Add</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No Products Found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 1000 });
                }}
                className="px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors duration-200"
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