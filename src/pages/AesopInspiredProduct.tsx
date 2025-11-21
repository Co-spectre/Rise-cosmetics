import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/optimizedProductService';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AesopInspiredProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
        <Header />
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-stone-200 rounded w-48"></div>
            <div className="h-4 bg-stone-200 rounded w-32"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF2] text-[#252525]">
      <Header />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
            
            {/* Left Column - Product Image (Sticky) */}
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-32 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[4/5] bg-[#F6F5E8] overflow-hidden rounded-sm"
                  >
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </AnimatePresence>

                {product.images.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm transition-all duration-300 ${
                          selectedImage === index 
                            ? 'ring-1 ring-[#252525] opacity-100' 
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Product Info & Accordions */}
            <div className="lg:col-span-5 space-y-8 sm:space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Header Info */}
                <div className="space-y-2">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-[#252525]/60">
                    {product.category}
                  </h2>
                  <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-[#252525]">
                    {product.name}
                  </h1>
                  <p className="text-lg font-light text-[#252525]/80 pt-1">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Price & Cart */}
                <div className="pt-6 border-t border-[#252525]/10 space-y-6">
                  <div className="text-2xl font-light">
                    €{product.price.toFixed(2)}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#252525]/20 rounded-full px-4 py-2 gap-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="hover:text-[#252525]/60 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-4 text-center text-sm font-light">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="hover:text-[#252525]/60 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 h-12 bg-[#252525] text-white text-sm tracking-widest uppercase hover:bg-[#333333] transition-colors flex items-center justify-center gap-2 px-8 rounded-full"
                      >
                        <span>Add to Cart</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Accordions */}
                <div className="pt-8">
                  <Accordion type="single" collapsible className="w-full" defaultValue="description">
                    
                    <AccordionItem value="description" className="border-t border-[#252525]/10">
                      <AccordionTrigger className="text-sm uppercase tracking-widest font-light hover:no-underline py-4">
                        Description
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-light leading-relaxed text-[#252525]/80 pb-6">
                        {product.description}
                        {product.benefits && (
                          <div className="mt-4">
                            <strong className="font-medium text-[#252525] block mb-2">Key Benefits:</strong>
                            <ul className="list-disc pl-5 space-y-1">
                              {product.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ingredients" className="border-t border-[#252525]/10">
                      <AccordionTrigger className="text-sm uppercase tracking-widest font-light hover:no-underline py-4">
                        Ingredients
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-light leading-relaxed text-[#252525]/80 pb-6">
                        <div className="flex flex-wrap gap-2">
                          {product.ingredients?.map((ingredient, index) => (
                            <span key={index} className="bg-[#F6F5E8] px-3 py-1 rounded-full text-sm border border-[#252525]/5">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 text-xs text-[#252525]/60 italic">
                          *Ingredients are subject to change at the manufacturer's discretion. For the most complete and up-to-date list of ingredients, refer to the product packaging.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="howto" className="border-t border-[#252525]/10 border-b">
                      <AccordionTrigger className="text-sm uppercase tracking-widest font-light hover:no-underline py-4">
                        How to Use
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-light leading-relaxed text-[#252525]/80 pb-6">
                        {product.howToUse}
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AesopInspiredProduct;