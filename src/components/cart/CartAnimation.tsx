import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCartSound } from '@/utils/audioFeedback';

interface CartAnimationProps {
  isVisible: boolean;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  productImage?: string;
  productName?: string;
  onComplete: () => void;
}

const CartAnimation: React.FC<CartAnimationProps> = ({
  isVisible,
  startPosition,
  endPosition,
  productImage,
  productName,
  onComplete,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      
      // Play sound feedback
      setTimeout(() => {
        playCartSound();
      }, 100);
      
      // Auto-complete animation after duration
      const timer = setTimeout(() => {
        onComplete();
        setMounted(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible && !mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Flying product box */}
            <motion.div
              initial={{
                x: startPosition.x - 25,
                y: startPosition.y - 25,
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: endPosition.x - 25,
                y: endPosition.y - 25,
                scale: 0.3,
                opacity: 0.8,
                rotate: 360,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                rotate: { duration: 0.8, ease: "easeInOut" }
              }}
              className="absolute w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg shadow-xl border-2 border-amber-300/50 flex items-center justify-center backdrop-blur-sm"
              style={{
                boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), 0 0 15px rgba(245, 158, 11, 0.2)',
              }}
            >
              {productImage ? (
                <img 
                  src={productImage} 
                  alt={productName}
                  className="w-8 h-8 object-cover rounded"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center text-white text-xs font-bold shadow-inner">
                  �️
                </div>
              )}
              
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400/30 to-orange-500/30 animate-pulse" />
            </motion.div>

            {/* Particle trail effect */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: startPosition.x,
                  y: startPosition.y,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: startPosition.x + (endPosition.x - startPosition.x) * (0.15 + i * 0.1),
                  y: startPosition.y + (endPosition.y - startPosition.y) * (0.15 + i * 0.1) + (Math.sin(i) * 10),
                  scale: [0, 1.2, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 3 === 0 ? 'bg-amber-400' : 
                  i % 3 === 1 ? 'bg-orange-400' : 'bg-yellow-400'
                }`}
                style={{
                  boxShadow: i % 2 === 0 ? '0 0 10px currentColor' : '0 0 8px currentColor',
                }}
              />
            ))}

            {/* Additional sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{
                  x: startPosition.x + (Math.random() - 0.5) * 60,
                  y: startPosition.y + (Math.random() - 0.5) * 60,
                  scale: 0,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-amber-300"
                style={{
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  filter: 'brightness(1.5)',
                }}
              />
            ))}

            {/* Cart icon pulse effect */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 0.4,
                delay: 0.6,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                left: endPosition.x - 15,
                top: endPosition.y - 15,
                width: 30,
                height: 30,
              }}
              className="bg-green-500/20 rounded-full border-2 border-green-500/50"
            />

            {/* Success notification */}
            <motion.div
              initial={{
                x: endPosition.x + 30,
                y: endPosition.y - 10,
                opacity: 0,
                scale: 0.5,
                rotate: -10,
              }}
              animate={{
                x: endPosition.x + 30,
                y: endPosition.y - 40,
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.1, 1, 0.9],
                rotate: [- 10, 0, 0, 5],
              }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: "easeOut"
              }}
              className="absolute bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-xl border border-green-400/50 backdrop-blur-sm"
              style={{
                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4), 0 0 15px rgba(34, 197, 94, 0.2)',
              }}
            >
              <div className="flex items-center space-x-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-green-100"
                >
                  ✓
                </motion.span>
                <span>Added to cart!</span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartAnimation;
