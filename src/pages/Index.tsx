import React, { useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ParallaxLandingPage from '@/components/ParallaxLandingPage';
import VideoSection from '@/components/VideoSection';
import About from '@/components/About';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { useSEOMarketing } from '@/contexts/SEOMarketingContext';

const Index = () => {
  const { trackPageView } = useAnalytics();
  const { updateSEO } = useSEOMarketing();

  useEffect(() => {
    trackPageView('/');
    updateSEO({
      title: 'RISE Cosmetics - Natural & Vegan Skincare Made in Italy',
      description: 'Discover pure beauty through nature\'s finest ingredients. Shop our collection of natural, vegan cosmetics and skincare essentials made in Italy.',
      keywords: ['natural cosmetics', 'vegan skincare', 'rice beauty', 'organic skincare', 'made in italy', 'RISE cosmetics']
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ParallaxLandingPage />
        <VideoSection />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;