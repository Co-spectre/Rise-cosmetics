import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds display time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#FAF8F5]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              {/* Large centered logo with RISE and Cosmetics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <h1 className="font-playfair font-light tracking-wider text-5xl sm:text-6xl md:text-7xl text-stone-800">
                  RISE
                </h1>
                <p className="font-light tracking-[0.4em] uppercase text-xs sm:text-sm text-stone-500 mt-2">
                  Cosmetics
                </p>
              </motion.div>

              {/* Loading bar */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-0.5 bg-stone-300 mt-10 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.6,
                    repeat: 1,
                    ease: "easeInOut"
                  }}
                  className="h-full w-full bg-stone-600"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className={isLoading ? 'h-screen overflow-hidden' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Preloader;
