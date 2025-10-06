import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronDown, X, Star, Package, AlertCircle } from 'lucide-react';
import { useSearch, sortOptions } from '@/contexts/SearchContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';

// Filter categories data
const filterCategories = {
  categories: [
    { id: 'skincare', label: 'Skincare' },
    { id: 'serum', label: 'Serums' },
    { id: 'moisturizer', label: 'Moisturizers' },
    { id: 'cleanser', label: 'Cleansers' },
    { id: 'mask', label: 'Masks' },
    { id: 'eye-treatment', label: 'Eye Care' },
  ],
  skinTypes: [
    { id: 'all', label: 'All Skin Types' },
    { id: 'dry', label: 'Dry' },
    { id: 'oily', label: 'Oily' },
    { id: 'combination', label: 'Combination' },
    { id: 'sensitive', label: 'Sensitive' },
    { id: 'mature', label: 'Mature' },
    { id: 'normal', label: 'Normal' },
    { id: 'dull', label: 'Dull' },
  ],
  concerns: [
    { id: 'dark-spots', label: 'Dark Spots' },
    { id: 'wrinkles', label: 'Wrinkles' },
    { id: 'fine-lines', label: 'Fine Lines' },
    { id: 'uneven-tone', label: 'Uneven Tone' },
    { id: 'dehydration', label: 'Dehydration' },
    { id: 'puffiness', label: 'Puffiness' },
    { id: 'dark-circles', label: 'Dark Circles' },
    { id: 'dullness', label: 'Dullness' },
    { id: 'sensitivity', label: 'Sensitivity' },
    { id: 'environmental-damage', label: 'Environmental Damage' },
  ],
  ingredients: [
    { id: 'vitamin-c', label: 'Vitamin C' },
    { id: 'retinol', label: 'Retinol' },
    { id: 'hyaluronic-acid', label: 'Hyaluronic Acid' },
    { id: 'niacinamide', label: 'Niacinamide' },
    { id: 'peptides', label: 'Peptides' },
    { id: 'ceramides', label: 'Ceramides' },
    { id: 'rice-bran', label: 'Rice Bran' },
    { id: 'caffeine', label: 'Caffeine' },
  ],
};

const ProductSearchAndFilter = () => {
  const {
    filteredProducts,
    searchQuery,
    filters,
    sortBy,
    totalResults,
    pagination,
    updateSearchQuery,
    updateFilters,
    updateSort,
    clearFilters,
    goToPage,
    setItemsPerPage,
  } = useSearch();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, updateSearchQuery]);

  // Pagination
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: keyof typeof filters, value: string, checked: boolean) => {
    const currentValues = filters[filterType] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    updateFilters({ [filterType]: newValues });
  };

  const handlePriceRangeChange = (value: number[]) => {
    updateFilters({ priceRange: [value[0], value[1]] });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.skinTypes.length > 0) count += filters.skinTypes.length;
    if (filters.concerns.length > 0) count += filters.concerns.length;
    if (filters.ingredients.length > 0) count += filters.ingredients.length;
    if (filters.inStockOnly) count += 1;
    if (filters.rating > 0) count += 1;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count += 1;
    return count;
  };

  const renderFilterSection = (
    title: string,
    items: { id: string; label: string }[],
    filterKey: keyof typeof filters,
    selectedValues: string[]
  ) => (
    <div className="space-y-3">
      <h4 className="font-playfair font-light text-lg text-black tracking-wide">{title}</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${filterKey}-${item.id}`}
              checked={selectedValues.includes(item.id)}
              onCheckedChange={(checked) => 
                handleFilterChange(filterKey, item.id, checked as boolean)
              }
            />
            <Label 
              htmlFor={`${filterKey}-${item.id}`} 
              className="text-sm text-neutral-700 font-light cursor-pointer"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products, ingredients, concerns..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-10 border-neutral-300 focus:border-black transition-colors font-light"
              />
              {localSearchQuery && (
                <button
                  onClick={() => setLocalSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex border border-neutral-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-black text-white' 
                      : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy.key} onValueChange={(value) => {
                const selectedSort = sortOptions.find(s => s.key === value);
                if (selectedSort) updateSort(selectedSort);
              }}>
                <SelectTrigger className="w-48 border-neutral-300 focus:border-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Filter Toggle */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-neutral-300 hover:border-black transition-colors relative"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                    {getActiveFilterCount() > 0 && (
                      <Badge className="ml-2 bg-black text-white text-xs">
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="font-playfair font-light text-xl tracking-wide">
                      Filter Products
                    </SheetTitle>
                    <SheetDescription className="font-light">
                      Refine your search to find the perfect products for your needs.
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Price Range */}
                    <div className="space-y-3">
                      <h4 className="font-playfair font-light text-lg text-black tracking-wide">
                        Price Range
                      </h4>
                      <div className="px-2">
                        <Slider
                          value={filters.priceRange}
                          onValueChange={handlePriceRangeChange}
                          max={200}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-neutral-600 mt-2">
                          <span>€{filters.priceRange[0]}</span>
                          <span>€{filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    {renderFilterSection(
                      'Categories',
                      filterCategories.categories,
                      'categories',
                      filters.categories
                    )}

                    {/* Skin Types */}
                    {renderFilterSection(
                      'Skin Types',
                      filterCategories.skinTypes,
                      'skinTypes',
                      filters.skinTypes
                    )}

                    {/* Concerns */}
                    {renderFilterSection(
                      'Skin Concerns',
                      filterCategories.concerns,
                      'concerns',
                      filters.concerns
                    )}

                    {/* Key Ingredients */}
                    {renderFilterSection(
                      'Key Ingredients',
                      filterCategories.ingredients,
                      'ingredients',
                      filters.ingredients
                    )}

                    {/* Additional Filters */}
                    <div className="space-y-3">
                      <h4 className="font-playfair font-light text-lg text-black tracking-wide">
                        Additional Filters
                      </h4>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="inStockOnly"
                          checked={filters.inStockOnly}
                          onCheckedChange={(checked) => 
                            updateFilters({ inStockOnly: checked as boolean })
                          }
                        />
                        <Label htmlFor="inStockOnly" className="text-sm text-neutral-700 font-light">
                          In stock only
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm text-neutral-700 font-light">
                          Minimum Rating
                        </Label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => updateFilters({ rating: rating === filters.rating ? 0 : rating })}
                              className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                                filters.rating === rating
                                  ? 'bg-black text-white'
                                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                              }`}
                            >
                              <Star className="w-3 h-3" fill="currentColor" />
                              <span className="text-xs">{rating}+</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="pt-6 border-t border-neutral-200">
                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="w-full border-neutral-300 hover:border-black transition-colors"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          {getActiveFilterCount() > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-neutral-600 font-light">Active filters:</span>
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {filterCategories.categories.find(c => c.id === category)?.label}
                  <button
                    onClick={() => handleFilterChange('categories', category, false)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.skinTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {filterCategories.skinTypes.find(t => t.id === type)?.label}
                  <button
                    onClick={() => handleFilterChange('skinTypes', type, false)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.concerns.map((concern) => (
                <Badge key={concern} variant="secondary" className="text-xs">
                  {filterCategories.concerns.find(c => c.id === concern)?.label}
                  <button
                    onClick={() => handleFilterChange('concerns', concern, false)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filters.inStockOnly && (
                <Badge variant="secondary" className="text-xs">
                  In Stock
                  <button
                    onClick={() => updateFilters({ inStockOnly: false })}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {filters.rating}+ Stars
                  <button
                    onClick={() => updateFilters({ rating: 0 })}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-neutral-600 font-light">
              {totalResults === 0 ? 'No products found' : `${totalResults} product${totalResults !== 1 ? 's' : ''} found`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            
            {/* Items per page */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-600 font-light">Show:</span>
              <Select 
                value={pagination.itemsPerPage.toString()} 
                onValueChange={(value) => setItemsPerPage(parseInt(value))}
              >
                <SelectTrigger className="w-16 h-8 text-sm border-neutral-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {currentProducts.length === 0 ? (
          <Card className="border-neutral-200">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="w-16 h-16 text-neutral-400 mb-4" />
              <h3 className="text-xl font-playfair font-light text-neutral-700 mb-2">
                No products found
              </h3>
              <p className="text-neutral-500 font-light text-center mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-neutral-300 hover:border-black transition-colors"
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
              : 'space-y-6'
          }`}>
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12">
            <Button
              onClick={() => goToPage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              variant="outline"
              className="border-neutral-300 hover:border-black transition-colors disabled:opacity-50"
            >
              Previous
            </Button>
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                variant={page === pagination.currentPage ? "default" : "outline"}
                className={`w-10 h-10 ${
                  page === pagination.currentPage
                    ? 'bg-black text-white'
                    : 'border-neutral-300 hover:border-black transition-colors'
                }`}
              >
                {page}
              </Button>
            ))}
            
            <Button
              onClick={() => goToPage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              variant="outline"
              className="border-neutral-300 hover:border-black transition-colors disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;
