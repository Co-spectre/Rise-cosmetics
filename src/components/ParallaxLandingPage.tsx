import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, ShoppingBag, Heart, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';
import InstagramStories from './InstagramStories';
import ShopTheStory from './ShopTheStory';
import SocialProofTestimonials from './SocialProofTestimonials';
import IngredientSpotlight from './IngredientSpotlight';
import InteractiveVideoTestimonials from './InteractiveVideoTestimonials';
import '../styles/optimized-landing.css';
import '../styles/luxury-animations.css';

const ParallaxLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simplified scroll handling for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Optimize video loading
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Set video attributes for better performance
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      // Handle video load events
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.setAttribute('data-loaded', 'true');
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleVideoLoad);
      
      // Error handling for video
      const handleVideoError = () => {
        console.warn('Video failed to load, falling back to background');
        setIsVideoLoaded(false);
      };
      
      video.addEventListener('error', handleVideoError);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('error', handleVideoError);
      };
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Video event handlers
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Simplified for better performance - minimal parallax effects

  return (
    <div className="relative">
      {/* Enhanced Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden optimized-hero">
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          {/* Fallback Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-olive-900 via-olive-800 to-olive-700" />
          
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover video-hero-bg optimized-video"
            style={{
              filter: 'brightness(0.4) contrast(1.1)',
              opacity: isVideoLoaded ? 1 : 0,
            }}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            poster="" // Remove poster to prevent flash
          >
            <source src="/videos/6811826-uhd_4096_2160_24fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-olive-900/30 via-transparent to-olive-900/30" />
        </div>

        {/* Video Control Button */}
        <button
          onClick={toggleVideoPlayback}
          className="absolute top-6 right-6 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20"
          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
        >
          {isVideoPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* Floating Parallax Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Organic floating shapes */}
          <div 
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-rice-300/10 to-olive-300/15 blur-3xl"
            style={{
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute top-1/3 right-1/6 w-80 h-80 rounded-full bg-gradient-to-r from-olive-400/10 to-rice-400/15 blur-3xl"
            style={{
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
          
          <div 
            className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-rice-500/8 to-olive-500/12 blur-3xl"
            style={{
              animation: 'float 30s ease-in-out infinite'
            }}
          />

          {/* Subtle geometric accents */}
          <div 
            className="absolute top-1/4 left-1/6 w-2 h-32 bg-rice-300/20 rounded-full blur-sm"
            style={{
              animation: 'fadeInOut 8s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute bottom-1/3 right-1/5 w-2 h-24 bg-olive-300/20 rounded-full blur-sm"
            style={{
              animation: 'fadeInOut 12s ease-in-out infinite 2s'
            }}
          />
        </div>

        {/* Enhanced Hero Content */}
        <div 
          className="relative z-10 flex items-center justify-center h-full px-4"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.0008)
          }}
        >
          <div className="text-center max-w-5xl">
            {/* Main Brand Title */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <Logo 
                  size="lg" 
                  variant="light" 
                  className="text-white scale-[2] sm:scale-[2.5] lg:scale-[3] transform"
                />
              </div>
              
              <div 
                className="text-sm md:text-base text-rice-200/90 tracking-[0.3em] uppercase font-light mb-6"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.7)'
                }}
              >
                Cosmetics
              </div>
            </div>
            
            {/* Tagline */}
            <p 
              className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 font-light leading-relaxed max-w-3xl mx-auto"
              style={{
                textShadow: '0 2px 15px rgba(0,0,0,0.7), 0 1px 6px rgba(0,0,0,0.4)'
              }}
            >
              Pure beauty through nature's finest ingredients
            </p>

            {/* Subtitle */}
            <p 
              className="text-base md:text-lg text-rice-100/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.6)'
              }}
            >
              Discover our luxurious collection of natural, vegan skincare crafted with Italian excellence
            </p>

            {/* Enhanced Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/products"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white/95 text-olive-900 hover:bg-white hover:text-olive-800 transition-all duration-500 tracking-wide shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
                style={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <span className="relative z-10 font-medium text-base">Explore Collection</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-gradient-to-r from-rice-50 to-olive-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              
              <Link 
                to="/about"
                className="group relative inline-flex items-center gap-3 px-10 py-4 border-2 border-white/80 text-white hover:bg-white/10 hover:border-white transition-all duration-500 tracking-wide backdrop-blur-sm transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 font-medium text-base">Our Story</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>

            {/* Brand Highlights */}
            <div 
              className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-white/70"
              style={{
                transform: `translateY(${scrollY * 0.25}px)`
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rice-300 rounded-full"></div>
                <span className="tracking-wide">Natural & Vegan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-olive-300 rounded-full"></div>
                <span className="tracking-wide">Made in Italy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rice-300 rounded-full"></div>
                <span className="tracking-wide">Rice-Based Formula</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{
            transform: `translateX(-50%) translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <span className="text-sm font-light tracking-wide opacity-90 text-center">
              Discover More
            </span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-white to-transparent"></div>
            <ChevronDown 
              className="w-6 h-6 animate-pulse" 
              style={{
                transform: `translateY(${scrollY * 0.01}px)`
              }}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section with modern design */}
      <section 
        className="py-24 bg-gradient-to-b from-white to-rice-50/30 relative overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      >
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-16 w-96 h-96 rounded-full bg-gradient-to-r from-rice-100/30 to-olive-100/20 blur-3xl"
            style={{
              transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.04}px)`,
              animation: 'float 25s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-32 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-olive-100/25 to-rice-100/15 blur-3xl"
            style={{
              transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.02}px)`,
              animation: 'float 30s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <div 
            className="text-center mb-20"
            style={{
              transform: `translateY(${scrollY * 0.02}px)`
            }}
          >
            <div className="mb-6">
              <span className="text-sm text-olive-600 tracking-[0.3em] uppercase font-light">Featured</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-olive-900 mb-6 tracking-wide leading-tight">
              Signature Collection
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-olive-300 to-transparent mx-auto mb-8"></div>
            <p className="text-lg text-olive-700/80 font-light max-w-2xl mx-auto leading-relaxed">
              Discover our most beloved formulations, crafted with the finest natural ingredients and Italian precision
            </p>
          </div>

          {/* Enhanced Product Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`
            }}
          >
            {[
              {
                id: 2,
                name: 'Radiance Serum',
                subtitle: 'Illuminating Face Serum',
                price: '€68',
                description: 'Luxurious serum that reveals your inner glow with powerful rice peptides and botanicals.',
                type: 'Serum',
                color: 'bg-gradient-to-br from-olive-50 to-rice-50',
                special: true,
                image: 'serum'
              },
              {
                id: 4,
                name: 'Soulrise',
                subtitle: 'Anti-Aging Face Cream',
                price: '€78',
                description: 'Premium face cream that renews and revitalizes with age-defying rice technology.',
                type: 'Cream',
                color: 'bg-gradient-to-br from-rice-50 to-olive-50',
                special: true,
                image: 'cream'
              },
              {
                id: 5,
                name: 'Eye Luce',
                subtitle: 'Illuminating Eye Drops',
                price: '€58',
                description: 'Gentle eye treatment that brightens and refreshes with botanical extracts.',
                type: 'Drops',
                color: 'bg-gradient-to-br from-olive-50 to-rice-50',
                special: false,
                image: 'drops'
              }
            ].map((product, index) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="group block bg-white border border-rice-100 hover:border-olive-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden"
                style={{
                  transform: `translateY(${scrollY * (0.005 + index * 0.002)}px)`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Enhanced Product Image Area */}
                <div 
                  className={`aspect-[4/5] ${product.color} relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}
                >
                  {/* Product Bottle Visualization */}
                  <div 
                    className="relative group-hover:scale-110 transition-transform duration-500"
                    style={{
                      transform: `rotate(${scrollY * 0.005}deg)`
                    }}
                  >
                    {product.image === 'serum' || product.image === 'drops' ? (
                      <div className="w-10 h-32 bg-gradient-to-b from-olive-600 to-olive-800 relative shadow-2xl">
                        <div className="absolute top-0 w-full h-5 bg-gradient-to-b from-olive-500 to-olive-600 rounded-t-sm" />
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-rice-300 rounded-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute right-0.5 top-3 w-0.5 h-24 bg-white/30 rounded-full" />
                      </div>
                    ) : (
                      <div className="w-20 h-24 bg-gradient-to-b from-rice-600 to-rice-800 relative shadow-2xl rounded-sm">
                        <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-rice-500 to-rice-600 rounded-t-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute right-1 top-2 w-0.5 h-16 bg-white/30 rounded-full" />
                      </div>
                    )}
                  </div>
                  
                  {/* Special Badge */}
                  {product.special && (
                    <div className="absolute top-4 right-4 bg-olive-700 text-white px-3 py-1 text-xs tracking-widest uppercase font-medium">
                      Signature
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Enhanced Product Info */}
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-olive-600 text-xs tracking-[0.2em] uppercase mb-3 font-medium">{product.type}</p>
                    <h3 className="text-2xl font-light text-olive-900 mb-3 tracking-wide group-hover:text-olive-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-olive-700/80 text-base tracking-wide font-light">{product.subtitle}</p>
                  </div>
                  
                  <p className="text-olive-800/70 text-sm leading-relaxed font-light">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-rice-100">
                    <span className="text-2xl font-light text-olive-900 tracking-wide">
                      {product.price}
                    </span>
                    <div className="flex space-x-3">
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="p-3 border border-olive-200 hover:bg-olive-600 hover:text-white hover:border-olive-600 transition-all duration-300 group/btn"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
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

          {/* Enhanced Call-to-Action */}
          <div 
            className="text-center mt-16"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`
            }}
          >
            <Link 
              to="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white transition-all duration-500 tracking-wide transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10 font-medium text-base">View Complete Collection</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-olive-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 bg-gradient-to-b from-rice-50/50 to-olive-50/50 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-16 w-96 h-96 rounded-full bg-gradient-to-r from-rice-100/30 to-olive-100/20 blur-3xl"
            style={{
              animation: 'float 25s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-32 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-olive-100/25 to-rice-100/15 blur-3xl"
            style={{
              animation: 'float 30s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="text-sm text-olive-600 tracking-[0.3em] uppercase font-light">Our Purpose</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-olive-900 mb-8 tracking-wide leading-tight">
              Our Mission
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-olive-300 to-transparent mx-auto mb-8"></div>
          </div>

          {/* Mission Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mission Text */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-light text-olive-900 tracking-wide leading-relaxed">
                  Celebrating Natural Beauty Through Italian Excellence
                </h3>
                <p className="text-lg text-olive-700/90 leading-relaxed font-light">
                  At RISE Cosmetics, we believe that true beauty emerges when nature's finest ingredients 
                  meet Italian craftsmanship. Our mission is to create premium skincare products that 
                  honor your skin's natural radiance while respecting the environment.
                </p>
                <p className="text-lg text-olive-700/90 leading-relaxed font-light">
                  Every formula is thoughtfully crafted with rice-based ingredients and botanical extracts, 
                  sourced sustainably and developed with the precision that has made Italian beauty legendary. 
                  We're committed to delivering not just products, but a transformative experience that 
                  elevates your daily skincare ritual.
                </p>
              </div>

              {/* Mission Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-lg">
                  <div className="w-12 h-12 bg-olive-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-rice-200 rounded-full"></div>
                  </div>
                  <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Natural & Vegan</h4>
                  <p className="text-olive-700/80 text-sm">100% plant-based formulations</p>
                </div>
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-lg">
                  <div className="w-12 h-12 bg-rice-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-olive-200 rounded-full"></div>
                  </div>
                  <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Made in Italy</h4>
                  <p className="text-olive-700/80 text-sm">Crafted with Italian precision</p>
                </div>
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-lg">
                  <div className="w-12 h-12 bg-olive-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-rice-200 rounded-full"></div>
                  </div>
                  <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Rice Technology</h4>
                  <p className="text-olive-700/80 text-sm">Powered by rice peptides</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-8">
                <Link 
                  to="/about"
                  className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-olive-600 text-olive-600 hover:bg-olive-600 hover:text-white transition-all duration-500 tracking-wide transform hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium text-base">Learn Our Story</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  <div className="absolute inset-0 bg-olive-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </div>
            </div>

            {/* Mission Visual with Product Images */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-olive-50 to-rice-50 rounded-2xl overflow-hidden relative">
                {/* Product Images Grid */}
                <div className="absolute inset-0 flex flex-col gap-4 p-6">
                  {/* Top Product - Radiance Serum */}
                  <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl border border-olive-100/50 overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="h-full flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="relative mb-3">
                          <img 
                            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=240&fit=crop&crop=center" 
                            alt="RISE Radiance Serum"
                            className="w-20 h-24 object-cover rounded-lg shadow-lg mx-auto"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-olive-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            1
                          </div>
                        </div>
                        <p className="text-olive-900 text-sm font-medium">Radiance Serum</p>
                        <p className="text-olive-600 text-xs">Rice Peptide Complex</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex gap-4 flex-1">
                    {/* Eye Cream */}
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl border border-olive-100/50 overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className="h-full flex items-center justify-center p-3">
                        <div className="text-center">
                          <div className="relative mb-2">
                            <img 
                              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=140&h=80&fit=crop&crop=center" 
                              alt="RISE Eye Cream"
                              className="w-14 h-8 object-cover rounded-lg shadow-md mx-auto"
                            />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-rice-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                              2
                            </div>
                          </div>
                          <p className="text-olive-900 text-xs font-medium">Eye Cream</p>
                          <p className="text-olive-600 text-[10px]">Brightening</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Moisturizer */}
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl border border-olive-100/50 overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className="h-full flex items-center justify-center p-3">
                        <div className="text-center">
                          <div className="relative mb-2">
                            <img 
                              src="https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=160&h=120&fit=crop&crop=center" 
                              alt="RISE Day Cream"
                              className="w-16 h-12 object-cover rounded-lg shadow-md mx-auto"
                            />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-olive-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                              3
                            </div>
                          </div>
                          <p className="text-olive-900 text-xs font-medium">Day Cream</p>
                          <p className="text-olive-600 text-[10px]">Nourishing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certification Badges */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm border border-olive-100/50 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-xs font-bold">✓</span>
                        </div>
                        <div>
                          <p className="text-olive-900 text-sm font-medium">100% Vegan</p>
                          <p className="text-olive-600 text-xs">Cruelty Free</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-olive-100 rounded-full flex items-center justify-center">
                          <span className="text-olive-600 text-xs">🌿</span>
                        </div>
                        <div className="w-6 h-6 bg-rice-100 rounded-full flex items-center justify-center">
                          <span className="text-rice-600 text-xs">🇮🇹</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay Text */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="text-center">
                    <p className="text-olive-800 text-sm tracking-wide font-light bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-olive-100/50">
                      "Pure beauty through nature's finest ingredients"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gradient-to-b from-olive-50/50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-16 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-rice-100/40 to-olive-100/20 blur-3xl"
            style={{
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-20 right-16 w-72 h-72 rounded-full bg-gradient-to-l from-olive-100/30 to-rice-100/15 blur-3xl"
            style={{
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Philosophy Content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="mb-6">
                  <span className="text-sm text-olive-600 tracking-[0.3em] uppercase font-light">Our Beliefs</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-olive-900 mb-8 tracking-wide leading-tight">
                  Philosophy
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-olive-300 to-transparent mb-8"></div>
              </div>

              {/* Philosophy Text */}
              <div className="space-y-6">
                <p className="text-lg text-olive-700/90 leading-relaxed font-light">
                  Embrace your natural essence with <span className="font-semibold text-olive-800">RISE</span>, where holistic beauty meets mindful care. 
                  Our transformative ingredients connect you to the root of your radiance.
                </p>
                <p className="text-lg text-olive-700/90 leading-relaxed font-light">
                  Crafted in Italy, we pride ourselves on using botanical and other healing ingredients 
                  to provide you with the glow your skin craves. Beauty is intention, so we treat it with respect.
                </p>
                <p className="text-lg text-olive-700/90 leading-relaxed font-light">
                  Every product is a bridge between ancient wisdom and modern science, designed to nurture 
                  not just your skin, but your daily ritual of self-care and mindfulness.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-xl">
                  <div className="w-3 h-3 bg-olive-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Mindful Beauty</h4>
                    <p className="text-olive-700/80 text-sm">Intentional skincare that honors your natural essence</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-xl">
                  <div className="w-3 h-3 bg-rice-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Ancient Wisdom</h4>
                    <p className="text-olive-700/80 text-sm">Time-tested ingredients meet modern innovation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-xl">
                  <div className="w-3 h-3 bg-olive-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Holistic Care</h4>
                    <p className="text-olive-700/80 text-sm">Nurturing your skin, mind, and spirit together</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white/70 backdrop-blur-sm border border-olive-100/50 rounded-xl">
                  <div className="w-3 h-3 bg-rice-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-olive-900 font-medium mb-2 tracking-wide">Ritual of Radiance</h4>
                    <p className="text-olive-700/80 text-sm">Transforming daily care into meaningful moments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Philosophy Visual with Products */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-olive-50 to-rice-50 rounded-3xl overflow-hidden relative border border-olive-100/50">
                {/* Product Images Around Video */}
                <div className="absolute inset-0 flex flex-col">
                  {/* Top Section with Products */}
                  <div className="h-1/4 p-4 flex justify-between items-start">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&crop=center" 
                        alt="Serum"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-olive-900 text-xs font-medium mt-1 text-center">Serum</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=center" 
                        alt="Cream"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-olive-900 text-xs font-medium mt-1 text-center">Cream</p>
                    </div>
                  </div>
                  
                  {/* Video Area */}
                  <div className="flex-1 bg-gradient-to-br from-olive-100/50 to-rice-100/30 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-olive-200/50 hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer group">
                        <Play className="w-8 h-8 text-olive-600 ml-1 group-hover:text-olive-800 transition-colors" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Section with More Products */}
                  <div className="h-1/4 p-4 flex justify-between items-end">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=80&h=80&fit=crop&crop=center" 
                        alt="Moisturizer"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-olive-900 text-xs font-medium mt-1 text-center">Moisturizer</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-olive-100/50 hover:shadow-md transition-all duration-300">
                      <img 
                        src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop&crop=center" 
                        alt="Cleanser"
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <p className="text-olive-900 text-xs font-medium mt-1 text-center">Cleanser</p>
                    </div>
                  </div>
                  
                  {/* Text Footer */}
                  <div className="p-8 bg-white/70 backdrop-blur-sm border-t border-olive-100/50">
                    <p className="text-olive-800 text-sm font-light text-center leading-relaxed">
                      The Ritual of Radiance: Discover the philosophy behind our mindful beauty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <InstagramStories />
      <ShopTheStory />
      <InteractiveVideoTestimonials />
      <IngredientSpotlight />
      <SocialProofTestimonials />
    </div>
  );
};

export default ParallaxLandingPage;
