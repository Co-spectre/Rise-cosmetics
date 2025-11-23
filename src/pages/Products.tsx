import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Product } from '@/types';
import { productService } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';

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

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
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

    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] bg-stone-100 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop" 
            alt="Collection Hero" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-playfair text-white mb-4 drop-shadow-md">The Collection</h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-xl drop-shadow-sm">
            Discover our curated range of premium skincare essentials, crafted for your daily ritual.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Search and Filter Bar */}
        <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 mb-8 border-b border-stone-100 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border-none rounded-full focus:ring-1 focus:ring-stone-300 transition-all duration-200"
              />
            </div>

            {/* Filter Toggles */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm rounded-full border transition-all duration-200 whitespace-nowrap",
                  showFilters ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                )}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              {/* Quick Category Pills */}
              {categories.slice(0, 4).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-full border transition-all duration-200 capitalize whitespace-nowrap",
                    selectedCategory === category 
                      ? "bg-stone-900 text-white border-stone-900" 
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                  )}
                >
                  {category === 'all' ? 'All Products' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-6 bg-stone-50 rounded-2xl animate-in slide-in-from-top-2 duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-playfair text-lg text-stone-900">Refine Selection</h3>
                <button onClick={() => setShowFilters(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone-500">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-lg transition-colors capitalize",
                          selectedCategory === category 
                            ? "bg-stone-900 text-white" 
                            : "bg-white text-stone-600 hover:bg-stone-200"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-medium uppercase tracking-wider text-stone-500">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-stone-300"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium uppercase tracking-wider text-stone-500">Price Range</label>
                    <span className="text-sm font-medium text-stone-900">€0 - €{priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                    className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-stone-500 font-light">
              Showing {filteredProducts.length} results
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin" />
                <p className="text-sm text-stone-500 font-light tracking-wide">Loading collection...</p>
              </div>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-xl font-playfair text-stone-900 mb-2">No matches found</h3>
              <p className="text-stone-500 font-light mb-6">
                We couldn't find any products matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange({ min: 0, max: 1000 });
                }}
                className="px-6 py-2.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors duration-200 text-sm tracking-wide"
              >
                Clear All Filters
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