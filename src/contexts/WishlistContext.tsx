import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('rise-wishlist');
    if (savedWishlist) {
      try {
        const parsedItems = JSON.parse(savedWishlist);
        setItems(parsedItems.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rise-wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    const existingItem = items.find(item => item.productId === product.productId);
    if (!existingItem) {
      const newItem: WishlistItem = {
        ...product,
        id: Date.now().toString(),
        addedAt: new Date()
      };
      setItems(prev => [...prev, newItem]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.productId === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      totalItems: items.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
