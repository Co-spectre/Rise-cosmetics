import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';

const ParallaxHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/6811826-uhd_4096_2160_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Subtle dark overlay for navbar contrast */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent z-10" />

      {/* Main content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
        <div className="animate-slide-up">
          <div className="mb-16 flex justify-center">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-playfair font-light text-white tracking-wide drop-shadow-2xl">
              RISE
            </h1>
          </div>
          
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-12" />
          
          <p className="text-xl sm:text-2xl text-white mb-8 font-light tracking-wide drop-shadow-lg">
            Minimalist Beauty Essentials
          </p>
          
          <p className="text-sm text-white/80 mb-20 tracking-widest uppercase opacity-90 drop-shadow-md">
            Inspired by Nature • Crafted for You
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-8 sm:flex sm:justify-center">
            <Link 
              to="/products"
              className="inline-block w-full sm:w-auto px-14 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase hover:bg-white/90 transition-all duration-300 shadow-2xl backdrop-blur-sm"
            >
              Explore Collection
            </Link>
            <Link
              to="/about"
              className="inline-block w-full sm:w-auto px-14 py-4 border-2 border-white text-white font-medium text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20"
        style={{
          opacity: Math.max(0, 1 - scrollY / 200),
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs tracking-widest uppercase mb-2 drop-shadow-md">Scroll</span>
          <div className="w-px h-8 bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
