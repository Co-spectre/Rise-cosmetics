import React, { createContext, useContext, useState, useEffect } from 'react';

interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
}

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'page' | 'blog';
  url: string;
  description: string;
  image?: string;
  score: number;
}

interface SearchContextType {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isSearching: boolean;
  recentSearches: string[];
  popularSearches: string[];
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  clearFilters: () => void;
  performSearch: (searchQuery?: string) => Promise<void>;
  clearResults: () => void;
  addToRecentSearches: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState<string[]>([
    'lipstick',
    'foundation',
    'skincare',
    'eyeshadow',
    'mascara',
    'moisturizer',
    'serum',
    'blush'
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('rise-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rise-recent-searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const mockProducts = [
    { id: '1', name: 'Radiant Glow Foundation', category: 'makeup', price: 45, rating: 4.8, inStock: true, featured: true, tags: ['foundation', 'coverage', 'glow'] },
    { id: '2', name: 'Velvet Matte Lipstick', category: 'makeup', price: 25, rating: 4.6, inStock: true, featured: false, tags: ['lipstick', 'matte', 'long-lasting'] },
    { id: '3', name: 'Hydrating Face Serum', category: 'skincare', price: 65, rating: 4.9, inStock: true, featured: true, tags: ['serum', 'hydrating', 'anti-aging'] },
    { id: '4', name: 'Smoky Eye Palette', category: 'makeup', price: 55, rating: 4.7, inStock: false, featured: false, tags: ['eyeshadow', 'palette', 'smoky'] },
    { id: '5', name: 'Vitamin C Moisturizer', category: 'skincare', price: 40, rating: 4.5, inStock: true, featured: true, tags: ['moisturizer', 'vitamin-c', 'brightening'] }
  ];

  const performSearch = async (searchQuery?: string) => {
    const searchTerm = searchQuery || query;
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredProducts = mockProducts.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        if (!matchesQuery) return false;

        if (filters.category && product.category !== filters.category) return false;
        if (filters.priceRange && (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])) return false;
        if (filters.rating && product.rating < filters.rating) return false;
        if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
        if (filters.featured !== undefined && product.featured !== filters.featured) return false;
        if (filters.tags && !filters.tags.some(tag => product.tags.includes(tag))) return false;

        return true;
      });

      const searchResults: SearchResult[] = filteredProducts.map(product => ({
        id: product.id,
        title: product.name,
        type: 'product' as const,
        url: `/products/${product.id}`,
        description: `${product.category} - $${product.price} - Rating: ${product.rating}/5`,
        image: `/images/products/${product.id}.jpg`,
        score: product.rating * 20 // Convert to percentage
      }));

      // Sort by score (relevance)
      searchResults.sort((a, b) => b.score - a.score);

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearResults = () => {
    setResults([]);
    setQuery('');
  };

  const addToRecentSearches = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 10); // Keep only 10 recent searches
    });
  };

  return (
    <SearchContext.Provider value={{
      query,
      results,
      filters,
      isSearching,
      recentSearches,
      popularSearches,
      setQuery,
      setFilters,
      clearFilters,
      performSearch,
      clearResults,
      addToRecentSearches
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
