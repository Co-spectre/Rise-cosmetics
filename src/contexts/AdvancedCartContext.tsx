import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useCart } from './CartContext';

interface CartRecommendation {
  id: string;
  name: string;
  price: number;
  image: string;
  reason: string;
}

interface CartAnalytics {
  averageOrderValue: number;
  cartAbandonmentRate: number;
  topProducts: string[];
  conversionRate: number;
}

interface AdvancedCartState {
  savedCarts: Array<{
    id: string;
    name: string;
    items: any[];
    createdAt: Date;
    totalPrice: number;
  }>;
  recommendations: CartRecommendation[];
  analytics: CartAnalytics;
  promotions: Array<{
    id: string;
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    minAmount?: number;
    expiresAt: Date;
  }>;
  appliedPromotion?: string;
}

interface AdvancedCartContextType extends AdvancedCartState {
  saveCurrentCart: (name: string) => void;
  loadSavedCart: (cartId: string) => void;
  deleteSavedCart: (cartId: string) => void;
  generateRecommendations: () => void;
  applyPromotion: (code: string) => boolean;
  removePromotion: () => void;
  getCartAnalytics: () => CartAnalytics;
  trackCartEvent: (event: string, data?: any) => void;
}

type AdvancedCartAction =
  | { type: 'SAVE_CART'; payload: { name: string; items: any[]; totalPrice: number } }
  | { type: 'DELETE_CART'; payload: string }
  | { type: 'SET_RECOMMENDATIONS'; payload: CartRecommendation[] }
  | { type: 'APPLY_PROMOTION'; payload: string }
  | { type: 'REMOVE_PROMOTION' }
  | { type: 'UPDATE_ANALYTICS'; payload: CartAnalytics };

const initialState: AdvancedCartState = {
  savedCarts: [],
  recommendations: [],
  analytics: {
    averageOrderValue: 0,
    cartAbandonmentRate: 0,
    topProducts: [],
    conversionRate: 0
  },
  promotions: [
    {
      id: '1',
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      minAmount: 50,
      expiresAt: new Date('2025-12-31')
    },
    {
      id: '2',
      code: 'SUMMER25',
      discount: 25,
      type: 'fixed',
      minAmount: 100,
      expiresAt: new Date('2025-09-30')
    }
  ]
};

function advancedCartReducer(state: AdvancedCartState, action: AdvancedCartAction): AdvancedCartState {
  switch (action.type) {
    case 'SAVE_CART':
      return {
        ...state,
        savedCarts: [
          ...state.savedCarts,
          {
            id: Date.now().toString(),
            name: action.payload.name,
            items: action.payload.items,
            createdAt: new Date(),
            totalPrice: action.payload.totalPrice
          }
        ]
      };
    case 'DELETE_CART':
      return {
        ...state,
        savedCarts: state.savedCarts.filter(cart => cart.id !== action.payload)
      };
    case 'SET_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.payload
      };
    case 'APPLY_PROMOTION':
      return {
        ...state,
        appliedPromotion: action.payload
      };
    case 'REMOVE_PROMOTION':
      return {
        ...state,
        appliedPromotion: undefined
      };
    case 'UPDATE_ANALYTICS':
      return {
        ...state,
        analytics: action.payload
      };
    default:
      return state;
  }
}

const AdvancedCartContext = createContext<AdvancedCartContextType | undefined>(undefined);

export const AdvancedCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(advancedCartReducer, initialState);
  const { items, totalPrice } = useCart();

  const saveCurrentCart = (name: string) => {
    dispatch({
      type: 'SAVE_CART',
      payload: { name, items, totalPrice }
    });
  };

  const loadSavedCart = (cartId: string) => {
    const savedCart = state.savedCarts.find(cart => cart.id === cartId);
    if (savedCart) {
      // This would integrate with the main cart context to load items
      console.log('Loading saved cart:', savedCart);
    }
  };

  const deleteSavedCart = (cartId: string) => {
    dispatch({ type: 'DELETE_CART', payload: cartId });
  };

  const generateRecommendations = () => {
    // Mock recommendations based on cart contents
    const recommendations: CartRecommendation[] = [
      {
        id: '1',
        name: 'Lip Gloss Set',
        price: 35,
        image: '/images/lip-gloss.jpg',
        reason: 'Customers who bought foundation also bought this'
      },
      {
        id: '2',
        name: 'Setting Spray',
        price: 28,
        image: '/images/setting-spray.jpg',
        reason: 'Complete your makeup look'
      },
      {
        id: '3',
        name: 'Makeup Brushes',
        price: 45,
        image: '/images/brushes.jpg',
        reason: 'Essential tools for application'
      }
    ];

    dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations });
  };

  const applyPromotion = (code: string): boolean => {
    const promotion = state.promotions.find(p => p.code === code && new Date() < p.expiresAt);
    if (promotion && (!promotion.minAmount || totalPrice >= promotion.minAmount)) {
      dispatch({ type: 'APPLY_PROMOTION', payload: promotion.id });
      return true;
    }
    return false;
  };

  const removePromotion = () => {
    dispatch({ type: 'REMOVE_PROMOTION' });
  };

  const getCartAnalytics = (): CartAnalytics => {
    // Mock analytics calculation
    return {
      averageOrderValue: 85.50,
      cartAbandonmentRate: 0.23,
      topProducts: ['Foundation', 'Lipstick', 'Serum'],
      conversionRate: 0.77
    };
  };

  const trackCartEvent = (event: string, data?: any) => {
    console.log('Cart Event:', event, data);
    // This would send to analytics service
  };

  useEffect(() => {
    if (items.length > 0) {
      generateRecommendations();
    }
  }, [items]);

  return (
    <AdvancedCartContext.Provider value={{
      ...state,
      saveCurrentCart,
      loadSavedCart,
      deleteSavedCart,
      generateRecommendations,
      applyPromotion,
      removePromotion,
      getCartAnalytics,
      trackCartEvent
    }}>
      {children}
    </AdvancedCartContext.Provider>
  );
};

export const useAdvancedCart = () => {
  const context = useContext(AdvancedCartContext);
  if (context === undefined) {
    throw new Error('useAdvancedCart must be used within an AdvancedCartProvider');
  }
  return context;
};
