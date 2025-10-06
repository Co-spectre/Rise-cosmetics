import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Filter, Grid, List, SortAsc, Star, Heart, ShoppingBag } from 'lucide-react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { useCart } from '@/contexts/CartContext';
import { useAdvancedCart } from '@/contexts/AdvancedCartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from './ProductCard';
import { productService } from '@/services/productService';
import { Product } from '@/types';

const ProductShowcase = () => {
  const { trackPageView } = useAnalytics();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filterCategory, searchQuery, sortBy]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      // Add a delay for better UX to see the skeleton
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = products;

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters: any) => {
    setFilterCategory(filters.category || 'all');
  };

  const categories = useMemo(() => {
    const unique = ['all', ...new Set(products.map(p => p.category))];
    return unique;
  }, [products]);

  // Create skeleton products for loading state
  const skeletonProducts = Array(8).fill(null);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-playfair font-light text-gray-900 mb-6 tracking-wide">
            Our Collection
          </h2>
          <div className="w-24 h-0.5 bg-olive-600 mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover our premium range of skincare products, each crafted with intention and infused 
            with the power of natural ingredients to transform your daily beauty ritual.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search and Filter Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="hidden lg:block text-sm text-gray-500">
                {isLoading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
              </div>
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price Low-High</option>
                  <option value="price-high">Price High-Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-olive-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-olive-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Serums">Serums</option>
                  <option value="Moisturizers">Moisturizers</option>
                  <option value="Eye Care">Eye Care</option>
                  <option value="Masks">Masks</option>
                  <option value="Oils">Oils</option>
                  <option value="Mists">Mists</option>
                  <option value="Cleansers">Cleansers</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
              
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      filterCategory === category
                        ? 'bg-olive-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {isLoading
            ? skeletonProducts.map((_, index) => (
                <ProductCard key={`skeleton-${index}`} product={{} as Product} isLoading={true} />
              ))
            : filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLoading={false}
                />
              ))
          }
        </div>

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setFilterCategory('all');
                  setSearchQuery('');
                  setShowFilters(false);
                }}
                className="px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Load More Button (if needed) */}
        {!isLoading && filteredProducts.length > 0 && filteredProducts.length >= 8 && (
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-white border-2 border-olive-600 text-olive-600 rounded-lg hover:bg-olive-600 hover:text-white transition-all duration-300 font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
