import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/optimizedProductService';
import { Product } from '@/types';
import { ArrowLeft, ArrowRight, Plus, Minus, Heart } from 'lucide-react';

const AesopInspiredProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState('about');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id || ''),
    enabled: !!id,
    staleTime: 300000,
    gcTime: 1800000,
  });

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      subtitle: product.shortDescription || '',
      price: product.price,
      type: product.category,
      color: 'default',
      description: product.description,
      image: product.images[0]
    });
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-[#FFFEF2]">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-stone-200 rounded w-48"></div>
            <div className="h-4 bg-stone-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF2] text-[#252525]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFEF2] border-b border-[#252525]/10">
        <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link 
            to="/products"
            className="inline-flex items-center text-sm hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-light tracking-wide">Return to products</span>
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-32">
          <div className="max-w-screen-2xl mx-auto px-8">
            {/* Product Category & Name */}
            <div className="mb-16 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#252525]/60">
                  {product.category}
                </h2>
                <h1 className="text-2xl sm:text-3xl font-light tracking-wide">
                  {product.name}
                </h1>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Left Column - Product Information */}
              <div className="lg:col-span-4 space-y-12">
                {/* Product Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <p className="text-lg font-light leading-relaxed">
                      {product.shortDescription}
                    </p>
                    <p className="font-light leading-relaxed text-[#252525]/80">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-8 pt-8 border-t border-[#252525]/10">
                    <div>
                      <h3 className="text-sm uppercase tracking-wide mb-4">Suited to</h3>
                      <p className="font-light text-[#252525]/80">
                        Most skin types, including dry and sensitive
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm uppercase tracking-wide mb-4">Key ingredients</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.ingredients?.map((ingredient, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#F6F5E8] rounded-xl shadow-md shadow-[#252525]/10 border border-[#252525]/10 p-4 flex items-center gap-3"
                          >
                            <span className="text-[#252525]/40 text-lg">•</span>
                            <span className="font-light text-[#252525]/80">{ingredient}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm uppercase tracking-wide mb-4">Size</h3>
                      <p className="font-light text-[#252525]/80">
                        100 mL / 3.3 fl oz
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Middle Column - Product Image */}
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="aspect-[3/4] bg-[#F6F5E8]"
                    >
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-2xl shadow-xl shadow-[#252525]/10 border border-[#252525]/10"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {product.images.length > 1 && (
                    <div className="mt-6 flex justify-center gap-4">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            selectedImage === index 
                              ? 'bg-[#252525] scale-150' 
                              : 'bg-[#252525]/30 hover:bg-[#252525]/50'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Purchase Information */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8"
                  >
                    {/* Price */}
                    <div className="text-xl font-light">
                      €{product.price.toFixed(2)}
                    </div>

                    {/* Add to Cart Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center border border-[#252525]/20 rounded-full hover:bg-[#252525]/5 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-light">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center border border-[#252525]/20 rounded-full hover:bg-[#252525]/5 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full h-12 bg-[#252525] text-white text-sm tracking-wide hover:bg-[#333333] transition-colors flex items-center justify-between px-6"
                      >
                        <span>Add to cart</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-6 pt-8 border-t border-[#252525]/10">
                      <h3 className="text-sm uppercase tracking-wide">Benefits</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.benefits?.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#F6F5E8] rounded-xl shadow-md shadow-[#252525]/10 border border-[#252525]/10 p-4 flex items-center gap-3"
                          >
                            <span className="text-[#252525]/40 text-lg">•</span>
                            <span className="font-light text-[#252525]/80">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* How to Use */}
                    <div className="space-y-6 pt-8 border-t border-[#252525]/10">
                      <h3 className="text-sm uppercase tracking-wide">How to use</h3>
                      <p className="font-light leading-relaxed text-[#252525]/80">
                        {product.howToUse}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default AesopInspiredProduct;