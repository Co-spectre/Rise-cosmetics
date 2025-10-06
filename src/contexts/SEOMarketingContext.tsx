import React, { createContext, useContext, useState, useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'paid' | 'content';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate?: Date;
  budget?: number;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
}

interface SEOMarketingContextType {
  seoData: SEOData;
  campaigns: MarketingCampaign[];
  updateSEO: (data: Partial<SEOData>) => void;
  createCampaign: (campaign: Omit<MarketingCampaign, 'id'>) => void;
  updateCampaign: (id: string, updates: Partial<MarketingCampaign>) => void;
  deleteCampaign: (id: string) => void;
  getActiveCampaigns: () => MarketingCampaign[];
  getTotalMetrics: () => MarketingCampaign['metrics'];
}

const SEOMarketingContext = createContext<SEOMarketingContextType | undefined>(undefined);

export const SEOMarketingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seoData, setSeoData] = useState<SEOData>({
    title: 'RISE Cosmetics - Premium Beauty Products',
    description: 'Discover premium cosmetics and beauty products that enhance your natural beauty. Shop our collection of high-quality makeup, skincare, and beauty essentials.',
    keywords: ['cosmetics', 'beauty', 'makeup', 'skincare', 'premium beauty', 'natural beauty'],
    ogImage: '/images/og-image.jpg',
    canonical: 'https://risecosmetics.com'
  });

  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    {
      id: '1',
      name: 'Summer Beauty Collection',
      type: 'email',
      status: 'active',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-08-31'),
      budget: 5000,
      metrics: {
        impressions: 25000,
        clicks: 1250,
        conversions: 125,
        revenue: 12500
      }
    },
    {
      id: '2',
      name: 'Social Media Brand Awareness',
      type: 'social',
      status: 'active',
      startDate: new Date('2025-07-01'),
      budget: 3000,
      metrics: {
        impressions: 50000,
        clicks: 2000,
        conversions: 80,
        revenue: 8000
      }
    }
  ]);

  const updateSEO = (data: Partial<SEOData>) => {
    setSeoData(prev => ({ ...prev, ...data }));
  };

  const createCampaign = (campaign: Omit<MarketingCampaign, 'id'>) => {
    const newCampaign: MarketingCampaign = {
      ...campaign,
      id: Date.now().toString()
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, updates: Partial<MarketingCampaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const getActiveCampaigns = () => {
    return campaigns.filter(campaign => campaign.status === 'active');
  };

  const getTotalMetrics = () => {
    return campaigns.reduce((total, campaign) => ({
      impressions: total.impressions + campaign.metrics.impressions,
      clicks: total.clicks + campaign.metrics.clicks,
      conversions: total.conversions + campaign.metrics.conversions,
      revenue: total.revenue + campaign.metrics.revenue
    }), { impressions: 0, clicks: 0, conversions: 0, revenue: 0 });
  };

  // Update document head with SEO data
  useEffect(() => {
    document.title = seoData.title;
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords.join(', '));
    
    if (seoData.ogImage) {
      updateMetaTag('og:image', seoData.ogImage);
    }
  }, [seoData]);

  return (
    <SEOMarketingContext.Provider value={{
      seoData,
      campaigns,
      updateSEO,
      createCampaign,
      updateCampaign,
      deleteCampaign,
      getActiveCampaigns,
      getTotalMetrics
    }}>
      {children}
    </SEOMarketingContext.Provider>
  );
};

export const useSEOMarketing = () => {
  const context = useContext(SEOMarketingContext);
  if (context === undefined) {
    throw new Error('useSEOMarketing must be used within an SEOMarketingProvider');
  }
  return context;
};
