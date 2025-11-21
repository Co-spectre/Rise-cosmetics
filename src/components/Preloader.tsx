import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './common/Logo';

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
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#FDFCF8]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="transform scale-[2.0] sm:scale-[2.5]">
                <Logo size="lg" variant="dark" />
              </div>
              
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-stone-600 text-xs sm:text-sm tracking-[0.5em] uppercase font-light mt-2 ml-1"
              >
                Cosmetics
              </motion.span>

              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-0.5 bg-stone-800/20 mt-8"
              />
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
