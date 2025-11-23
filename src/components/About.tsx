
import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Droplets, Heart, Sparkles, ChevronDown } from 'lucide-react';

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const ingredients = [
    {
      name: 'Rice Extract',
      origin: 'Northern Italy',
      benefit: 'Brightening & Nourishing'
    },
    {
      name: 'Olive Oil',
      origin: 'Tuscan Groves',
      benefit: 'Deep Hydration'
    },
    {
      name: 'Botanical Blend',
      origin: 'Mediterranean Coast',
      benefit: 'Skin Renewal'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Ethically sourced ingredients from nature, for nature.'
    },
    {
      icon: Droplets,
      title: 'Pure',
      description: 'No compromise on quality. Only the finest botanicals.'
    },
    {
      icon: Heart,
      title: 'Transparent',
      description: 'Complete honesty in every ingredient we choose.'
    }
  ];

  return (
    <>
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#d6c083] to-[#7d8c6a] z-[10000] transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <section id="about" className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #fdfcf9 0%, #FAF6F0 50%, #f5f1e8 100%)'
      }}>
        
        {/* Cinematic Hero Section - Full Screen Video Background */}
        <div 
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen relative flex flex-col items-center justify-center fade-in-element overflow-hidden px-4"
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.7)' }}
          >
            <source src="/Rise-cosmetics/videos/vid1.mp4" type="video/mp4" />
          </video>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-6 inline-block">
              <span className="text-[0.65rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/90 font-light border border-white/30 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                Est. 2024
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair font-light text-white mb-6 sm:mb-8 tracking-wider leading-tight px-2">
              Nature. Science. Ritual.
            </h1>
            
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-6 mb-12 sm:mb-16 px-4">
              <p className="text-base sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                Where ancient botanical wisdom meets modern skincare innovation
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
                Every formula is a bridge between tradition and science, crafted to honor your skin's natural radiance
              </p>
            </div>

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" strokeWidth={1} />
            </div>
          </div>

          {/* Subtle Vignette Effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)'
          }} />
        </div>

        {/* Origin Story - Timeline - Soft beige/cream */}
        <div 
          ref={(el) => (sectionsRef.current[1] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #f5f0e8 0%, #ebe5dc 100%)' }}
        >
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-stone-600 mb-12 sm:mb-16 text-center font-light">
              Our Journey
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-playfair text-amber-700 mb-3 sm:mb-4">2024</div>
                <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">The Beginning</h3>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  Founded in Italy with a vision to merge nature's wisdom with scientific innovation
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-playfair text-amber-700 mb-3 sm:mb-4">2025</div>
                <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">First Collection</h3>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  Launched our signature range of botanical-based skincare essentials
                </p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="text-3xl sm:text-4xl font-playfair text-amber-700 mb-3 sm:mb-4">Today</div>
                <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">Growing Legacy</h3>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  Expanding our reach while staying true to our commitment to pure, sustainable beauty
                </p>
              </div>
            </div>
          </div>
        </div>        {/* Philosophy Section - Warm cream */}
        <div 
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: '#faf6f0' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7d8c6a] font-light">
                  Our Philosophy
                </h2>
                <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-light text-[#7d8c6a] leading-relaxed italic">
                  "True beauty emerges when nature's wisdom meets intentional care"
                </blockquote>
                <p className="text-base sm:text-lg text-[#797870] font-light leading-relaxed">
                  We believe skincare should be a ritual—a moment of connection between you and the natural world. 
                  Each product is crafted to honor this sacred relationship.
                </p>
              </div>
              <div className="aspect-square bg-[#ede9dd] rounded-lg flex items-center justify-center">
                <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#d6c083]" strokeWidth={0.5} />
              </div>
            </div>

            {/* Interactive 3D Product Carousel */}
            <div className="relative">
              <h3 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7d8c6a] mb-6 sm:mb-8 text-center font-light">
                Our Collection
              </h3>
              <div className="overflow-x-auto scrollbar-hide py-8 sm:py-12" style={{ perspective: '1200px' }}>
                <div className="flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 min-w-max">
                  {/* Product 1 - COS1 */}
                  <div className="product-3d-card group cursor-pointer">
                    <div className="w-64 sm:w-72 md:w-80 h-[350px] sm:h-[400px] md:h-[450px] bg-gradient-to-br from-[#FAF6F0] to-[#ede9dd] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(125,140,106,0.3)] p-6 sm:p-8">
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Product Image */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <img 
                          src="/Rise-cosmetics/images/products/cos1.png" 
                          alt="RISE Signature Collection"
                          className="w-full h-64 sm:h-72 md:h-80 object-contain mb-4 sm:mb-6 filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_40px_rgba(125,140,106,0.3)] transition-all duration-500 group-hover:scale-105"
                        />
                        <p className="text-[#7d8c6a] font-playfair text-lg sm:text-xl text-center font-light">Signature Collection</p>
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>

                  {/* Product 2 - COS2 */}
                  <div className="product-3d-card group cursor-pointer">
                    <div className="w-64 sm:w-72 md:w-80 h-[350px] sm:h-[400px] md:h-[450px] bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(125,140,106,0.3)] p-6 sm:p-8">
                      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <img 
                          src="/Rise-cosmetics/images/products/cos2.png" 
                          alt="RISE Essential Collection"
                          className="w-full h-64 sm:h-72 md:h-80 object-contain mb-4 sm:mb-6 filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_40px_rgba(125,140,106,0.3)] transition-all duration-500 group-hover:scale-105"
                        />
                        <p className="text-[#7d8c6a] font-playfair text-lg sm:text-xl text-center font-light">Essential Collection</p>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>

                  {/* Product 3 - COS1 (alternate) */}
                  <div className="product-3d-card group cursor-pointer">
                    <div className="w-64 sm:w-72 md:w-80 h-[350px] sm:h-[400px] md:h-[450px] bg-gradient-to-br from-[#FAF6F0] to-[#ede9dd] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(125,140,106,0.3)] p-6 sm:p-8">
                      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <img 
                          src="/Rise-cosmetics/images/products/cos1.png" 
                          alt="RISE Radiance Set"
                          className="w-full h-64 sm:h-72 md:h-80 object-contain mb-4 sm:mb-6 filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_40px_rgba(125,140,106,0.3)] transition-all duration-500 group-hover:scale-105"
                        />
                        <p className="text-[#7d8c6a] font-playfair text-lg sm:text-xl text-center font-light">Radiance Set</p>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>

                  {/* Product 4 - COS2 (alternate) */}
                  <div className="product-3d-card group cursor-pointer">
                    <div className="w-64 sm:w-72 md:w-80 h-[350px] sm:h-[400px] md:h-[450px] bg-gradient-to-br from-[#f5f1e8] to-[#e8e4d8] rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(125,140,106,0.3)] p-6 sm:p-8">
                      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <img 
                          src="/Rise-cosmetics/images/products/cos2.png" 
                          alt="RISE Ritual Collection"
                          className="w-full h-64 sm:h-72 md:h-80 object-contain mb-4 sm:mb-6 filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_40px_rgba(125,140,106,0.3)] transition-all duration-500 group-hover:scale-105"
                        />
                        <p className="text-[#7d8c6a] font-playfair text-lg sm:text-xl text-center font-light">Ritual Collection</p>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Scroll Hint */}
              <p className="text-center text-[#7d8c6a]/50 text-xs sm:text-sm mt-4 sm:mt-6 font-light">
                Scroll to explore →
              </p>
            </div>
          </div>
        </div>

        {/* Ingredients Story - Cards - Soft sage green */}
        <div 
          ref={(el) => (sectionsRef.current[3] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #e8ebe5 0%, #dfe3d9 100%)' }}
        >
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-stone-600 mb-12 sm:mb-16 text-center font-light">
              Signature Ingredients
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {ingredients.map((ingredient, index) => (
                <div 
                  key={index}
                  className="group bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-stone-200/50 hover:shadow-lg hover:shadow-stone-300/30 transition-all duration-500 hover:-translate-y-1"
                >
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-2 sm:mb-3">{ingredient.name}</h3>
                  <p className="text-xs sm:text-sm text-amber-700 mb-3 sm:mb-4 tracking-wide">{ingredient.origin}</p>
                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">{ingredient.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Storytelling - Dual Video Section */}
        <div 
          ref={(el) => (sectionsRef.current[4] = el)}
          className="relative fade-in-element"
        >
          {/* First Video Story - Full Width with Overlay Text */}
          <div className="relative h-screen">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.7)' }}
            >
              <source src="/Rise-cosmetics/videos/vid2.mp4" type="video/mp4" />
            </video>
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/30" />
            
            <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
              <div className="text-center max-w-4xl">
                <span className="text-[0.65rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/80 mb-4 sm:mb-6 block font-light">
                  Our Process
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-white mb-6 sm:mb-8 leading-tight px-4">
                  From Nature to Nourishment
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto px-4">
                  Each ingredient undergoes a careful extraction process, preserving its potency and purity for your skin
                </p>
              </div>
            </div>
          </div>

          {/* Second Video Story - Split Screen Design */}
          <div className="grid md:grid-cols-2 min-h-screen">
            {/* Left: Video */}
            <div className="relative min-h-[50vh] md:min-h-screen">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.7)' }}
              >
                <source src="/Rise-cosmetics/videos/vid3.mp4" type="video/mp4" />
              </video>
              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/20 to-black/30" />
            </div>

            {/* Right: Content */}
            <div className="bg-gradient-to-br from-[#fdfcf9] to-[#f5f1e8] flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="max-w-lg space-y-6 sm:space-y-8">
                <div>
                  <span className="text-[0.65rem] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-stone-600 mb-3 sm:mb-4 block font-light">
                    Ritual & Result
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-light text-stone-700 mb-4 sm:mb-6 leading-tight">
                    A Journey of Transformation
                  </h3>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="border-l-2 border-amber-700 pl-4 sm:pl-6">
                    <h4 className="text-lg sm:text-xl font-playfair text-stone-700 mb-1 sm:mb-2">Morning Ritual</h4>
                    <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                      Begin your day with intention. Our formulas awaken your skin, preparing it for the day ahead with natural radiance.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-amber-700 pl-4 sm:pl-6">
                    <h4 className="text-lg sm:text-xl font-playfair text-stone-700 mb-1 sm:mb-2">Evening Care</h4>
                    <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                      As night falls, restore and rejuvenate. Let nature's wisdom work while you rest, revealing transformed skin by morning.
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <div className="flex-1 h-px bg-stone-300" />
                    <span className="font-light tracking-wide">Since 2024</span>
                    <div className="flex-1 h-px bg-stone-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Craftsmanship Section - Soft blush/sand theme */}
        <div 
          ref={(el) => (sectionsRef.current[5] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #f5ede8 0%, #ede5dd 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-700 mb-6 sm:mb-8 font-light">
              Crafted with Care
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-light text-stone-700 mb-8 sm:mb-12 leading-relaxed italic">
              Made in Italy
            </p>
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
              Every formula is meticulously developed in our Italian laboratory, where tradition meets innovation. 
              We take pride in the artisanal approach to modern skincare.
            </p>
          </div>
        </div>

        {/* Values Grid - Warm sand theme */}
        <div 
          ref={(el) => (sectionsRef.current[6] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #ede5dd 0%, #e8e1d5 100%)' }}
        >
          <div className="px-4 sm:px-6 max-w-6xl mx-auto">
            <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-700 mb-12 sm:mb-16 text-center font-light">
              Our Commitments
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-full border border-stone-300 group-hover:bg-stone-200 transition-all duration-300">
                    <value.icon className="w-7 h-7 sm:w-8 sm:h-8 text-stone-600 group-hover:text-stone-700 transition-all duration-300" strokeWidth={1} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair text-stone-700 mb-3 sm:mb-4 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commitment Section - Stats - Soft cream theme */}
        <div 
          ref={(el) => (sectionsRef.current[7] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #e8e1d5 0%, #f5f0e8 100%)' }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-amber-700 mb-12 sm:mb-16 text-center font-light">
              Sustainable Luxury
            </h2>
            <div className="grid grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-center">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-amber-700 mb-2 sm:mb-4">100%</div>
                <p className="text-xs sm:text-sm md:text-base text-stone-600 font-light tracking-wide">Vegan & Cruelty-Free</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-amber-700 mb-2 sm:mb-4">95%</div>
                <p className="text-xs sm:text-sm md:text-base text-stone-600 font-light tracking-wide">Natural Ingredients</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-playfair text-amber-700 mb-2 sm:mb-4">0%</div>
                <p className="text-xs sm:text-sm md:text-base text-stone-600 font-light tracking-wide">Harmful Chemicals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder's Note - Light cream transition */}
        <div 
          ref={(el) => (sectionsRef.current[8] = el)}
          className="py-16 sm:py-24 md:py-32 fade-in-element"
          style={{ background: 'linear-gradient(to bottom, #f5f0e8 0%, #fdfcf9 100%)' }}
        >
          <div className="px-4 sm:px-6 max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-stone-700 leading-relaxed mb-6 sm:mb-8 italic">
              "Our mission is simple: to create skincare that honors both your skin and the earth. 
              Every product is a love letter to nature's incredible healing power."
            </p>
            <p className="text-base sm:text-lg font-playfair text-amber-900 mb-1 sm:mb-2">— The RISE Team</p>
            <p className="text-xs sm:text-sm text-amber-700 tracking-wide">Italy, 2025</p>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 sm:py-16 md:py-20 text-center bg-[#fdfcf9] px-4">
          <a 
            href="/products"
            className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-4 border-2 border-amber-800 text-amber-900 font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm hover:bg-amber-800 hover:text-amber-50 transition-all duration-300 rounded-sm"
          >
            Discover Our Collection
          </a>
        </div>

      </section>

      {/* Custom CSS for fade-in animations */}
            <style>{`
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .product-3d-card {
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-3d-card:hover {
          transform: translateY(-10px) rotateY(5deg) scale(1.02);
        }

        .product-3d-card:hover > div {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 60px rgba(214, 192, 131, 0.3);
        }
      `}</style>
    </>
  );
};

export default About;