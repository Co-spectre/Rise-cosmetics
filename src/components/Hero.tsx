import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#8B7355] via-[#9B8568] to-[#6B5D4F]">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      {/* Main content grid */}
      <div className="relative z-20 w-full h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        
        {/* Left side - Text content */}
        <div className="flex flex-col justify-center space-y-8 md:space-y-12 py-20 lg:py-0">
          <div className="space-y-4 md:space-y-6">
            <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
              RISE
            </p>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.1] tracking-tight">
              Depth of<br />Perfection
            </h1>
            
            <div className="space-y-3 md:space-y-4 text-white/70 font-light text-sm md:text-base max-w-md">
              <p className="leading-relaxed">
                자연 성분의 깊이있는 힘으로, 피부의 진정한 아름다움을
              </p>
              <p className="leading-relaxed">
                그 깊이에서 끌어내다
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center gap-3">
            <button className="w-2 h-2 rounded-full bg-white transition-all duration-300" />
            <button className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300" />
            <button className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300" />
            <button className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300" />
          </div>
        </div>

        {/* Right side - Product showcase */}
        <div className="relative flex items-center justify-center h-full py-20 lg:py-0">
          {/* Decorative circular element */}
          <div className="absolute right-8 md:right-16 bottom-20 md:bottom-32 w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <p className="text-white text-xs md:text-sm tracking-[0.2em] transform -rotate-12">
                Depth of
              </p>
              <p className="text-white text-xs md:text-sm tracking-[0.2em] transform -rotate-12">
                Perfection
              </p>
            </div>
          </div>

          {/* Main product image */}
          <div 
            className="relative z-10 transition-transform duration-700 ease-out"
            style={{ 
              transform: `translateY(${scrollY * 0.15}px)` 
            }}
          >
            {/* Product bottle placeholder - replace with actual product image */}
            <div className="relative w-48 h-96 md:w-56 md:h-[28rem] lg:w-64 lg:h-[32rem]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/70 rounded-full backdrop-blur-xl shadow-2xl" 
                   style={{ 
                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 100px rgba(255, 255, 255, 0.1)' 
                   }}
              />
              <div className="absolute inset-x-0 top-4 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-full" />
              
              {/* Label area */}
              <div className="absolute inset-x-0 top-1/3 flex flex-col items-center justify-center space-y-2 px-8">
                <p className="text-olive-800 text-xs tracking-[0.3em] uppercase">Skincare</p>
                <p className="text-olive-900 font-light text-lg tracking-wider">B5</p>
                <p className="text-olive-700 text-[10px] tracking-wide">Calming B5</p>
                <div className="w-12 border-t border-olive-300 my-2" />
                <p className="text-olive-600 text-[8px] text-center leading-relaxed">
                  Soothing & Strengthening<br />
                  for Irritated Skin
                </p>
              </div>

              {/* Vertical lines decoration */}
              <div className="absolute inset-x-0 bottom-1/4 flex justify-center gap-[2px] px-12">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-[2px] h-16 bg-olive-200/40" />
                ))}
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-1/4 left-8 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#A0826D] opacity-40 blur-3xl" />
          <div className="absolute bottom-1/3 right-12 w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#8B7355] opacity-30 blur-3xl" />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-6 md:gap-8 text-white/60 text-xs tracking-widest uppercase">
        <button className="hover:text-white transition-colors duration-300 font-light">Instagram</button>
        <span className="w-px h-4 bg-white/30" />
        <button className="hover:text-white transition-colors duration-300 font-light">Facebook</button>
        <span className="w-px h-4 bg-white/30" />
        <button className="hover:text-white transition-colors duration-300 font-light">Pinterest</button>
        <span className="w-px h-4 bg-white/30" />
        <button className="hover:text-white transition-colors duration-300 font-light">Healthy Skin</button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 lg:right-20 z-30">
        <div className="flex flex-col items-center animate-bounce">
          <div className="w-px h-12 bg-white/30" />
          <div className="w-2 h-2 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
