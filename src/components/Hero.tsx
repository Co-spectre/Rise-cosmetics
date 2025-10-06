import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: 'Radiance Serum',
      type: 'Serum',
      color: 'bg-gradient-to-br from-rice-100 to-rice-200'
    },
    {
      id: 2,
      name: 'Soulrise Cream',
      type: 'Cream',
      color: 'bg-gradient-to-br from-olive-100 to-olive-200'
    },
    {
      id: 3,
      name: 'Eye Luce Drops',
      type: 'Drops',
      color: 'bg-gradient-to-br from-rice-50 to-olive-100'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Local MP4 Video Background */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          style={{ minHeight: '100%', minWidth: '100%' }}
        >
          <source src="/videos/6811826-uhd_4096_2160_24fps.mp4" type="video/mp4" />
          {/* Fallback gradient background if video doesn't load */}
        </video>
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl w-full mt-20">
        <div className="animate-slide-up">
          <h1 
            className="text-7xl sm:text-8xl lg:text-9xl font-playfair font-light text-white mb-8 leading-none tracking-tight"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.5)'
            }}
          >
            RISE
          </h1>
          
          <div className="w-24 h-px bg-white mx-auto mb-8" />
          
          <p className="text-xl sm:text-2xl text-white/90 mb-4 font-light tracking-wide">
            Natural Cosmetics
          </p>
          
          <p className="text-sm text-white/70 mb-16 tracking-widest uppercase">
            100% Vegan • Made in Italy
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-8 sm:flex sm:justify-center mb-20">
            <Link 
              to="/products"
              className="inline-block w-full sm:w-auto px-16 py-5 bg-olive-600 text-white font-light text-sm tracking-widest uppercase hover:bg-olive-700 transition-all duration-300 hover-lift"
            >
              Explore Collection
            </Link>
            <Link
              to="/about"
              className="inline-block w-full sm:w-auto px-16 py-5 border border-rice-200 text-white font-light text-sm tracking-widest uppercase hover:bg-rice-100 hover:text-olive-900 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>

          {/* Featured Products Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`${product.color} p-6 rounded-lg backdrop-blur-sm bg-opacity-80 hover:bg-opacity-90 transition-all duration-300 hover-lift`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transform: `translateY(${scrollY * 0.1}px)`
                }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto" />
                <h3 className="text-lg font-light text-olive-800 mb-2">{product.name}</h3>
                <p className="text-sm text-olive-600 uppercase tracking-wide">{product.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-white/70 text-xs uppercase tracking-widest mb-2">Scroll to explore</p>
            <div className="w-px h-8 bg-white/50" />
            <div className="w-2 h-2 bg-white rounded-full mt-1" />
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-rice-200/30 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
