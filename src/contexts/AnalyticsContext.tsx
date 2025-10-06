import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnalyticsEvent {
  id: string;
  event: string;
  timestamp: Date;
  userId?: string;
  data: Record<string, any>;
}

interface AnalyticsContextType {
  events: AnalyticsEvent[];
  trackEvent: (event: string, data?: Record<string, any>) => void;
  trackPageView: (page: string) => void;
  trackPurchase: (orderId: string, amount: number, items: any[]) => void;
  getAnalytics: () => {
    totalEvents: number;
    pageViews: number;
    purchases: number;
    revenue: number;
  };
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  const trackEvent = (event: string, data: Record<string, any> = {}) => {
    const newEvent: AnalyticsEvent = {
      id: Date.now().toString(),
      event,
      timestamp: new Date(),
      data
    };
    
    setEvents(prev => [...prev, newEvent]);
    
    // Send to analytics service (Google Analytics, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
  };

  const trackPageView = (page: string) => {
    trackEvent('page_view', { page });
  };

  const trackPurchase = (orderId: string, amount: number, items: any[]) => {
    trackEvent('purchase', { 
      transaction_id: orderId,
      value: amount,
      currency: 'USD',
      items 
    });
  };

  const getAnalytics = () => {
    const pageViews = events.filter(e => e.event === 'page_view').length;
    const purchases = events.filter(e => e.event === 'purchase');
    const revenue = purchases.reduce((sum, p) => sum + (p.data.value || 0), 0);

    return {
      totalEvents: events.length,
      pageViews,
      purchases: purchases.length,
      revenue
    };
  };

  return (
    <AnalyticsContext.Provider value={{
      events,
      trackEvent,
      trackPageView,
      trackPurchase,
      getAnalytics
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
