import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxWrapper } from '@/components/ParallaxWrapper';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/optimizedProductService';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Minus, Heart } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const OptimizedProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState('details');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Use React Query for efficient data fetching and caching
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
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
      image: product.images[0],
      quantity
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  // Loading skeleton with layout
  if (isLoading) {
    return (
      <div className="min-h-screen bg-rice-50">
        <Header />
        <main className="pt-24 pb-24">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image skeleton */}
              <div className="aspect-square bg-stone-100 animate-pulse rounded-lg"></div>
              {/* Content skeleton */}
              <div className="space-y-8 p-6">
                <div className="space-y-4">
                  <div className="h-4 w-24 bg-stone-200 animate-pulse rounded"></div>
                  <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded"></div>
                  <div className="h-20 w-full bg-stone-200 animate-pulse rounded"></div>
                </div>
                <div className="h-8 w-32 bg-stone-200 animate-pulse rounded"></div>
                <div className="space-y-4">
                  <div className="h-12 w-full bg-stone-200 animate-pulse rounded-full"></div>
                  <div className="h-12 w-12 bg-stone-200 animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-rice-50">
      <Header />
      
      <main className="pt-24 pb-24">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 z-20 bg-rice-50/80 backdrop-blur-sm"
        >
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <Link 
              to="/products" 
              className="inline-flex items-center text-stone-500 hover:text-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm tracking-wide">Back to Products</span>
            </Link>
          </div>
        </motion.div>

        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Images */}
            <div className="relative">
              <div className="sticky top-36 h-[calc(100vh-144px)]">
                {/* Main Image */}
                <div className="h-full flex items-center justify-center p-6">
                  <ParallaxWrapper
                    speed={0.3}
                    mouseInfluence={0.05}
                    rotate
                    scale
                    baseScale={1}
                    scaleRange={0.1}
                    rotateSensitivity={10}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedImage}
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="max-h-full w-auto object-contain"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        loading="eager"
                      />
                    </AnimatePresence>
                  </ParallaxWrapper>
                </div>

                {/* Thumbnail Navigation */}
                {product.images.length > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <div className="flex justify-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200">
                      {product.images.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            selectedImage === index 
                              ? 'bg-stone-900 scale-150' 
                              : 'bg-stone-300 hover:bg-stone-400'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label={`View image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column - Product Information */}
            <div className="p-6 lg:p-12 xl:p-20">
              <div className="max-w-xl">
                {/* Product Title & Category */}
                <ParallaxWrapper speed={0.2} direction="vertical">
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-xs tracking-widest text-stone-500 uppercase mb-4">
                      {product.category}
                    </div>
                    <h1 className="text-4xl font-light text-stone-900 tracking-wide mb-4">
                      {product.name}
                    </h1>
                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </motion.div>
                </ParallaxWrapper>

                {/* Price */}
                <ParallaxWrapper speed={0.3} direction="vertical">
                  <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-2xl text-stone-900 font-light tracking-wide">
                      €{product.price.toFixed(2)}
                    </div>
                  </motion.div>
                </ParallaxWrapper>

                {/* Product Actions */}
                <ParallaxWrapper speed={0.4} direction="vertical">
                  <motion.div 
                    className="space-y-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <motion.button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
                        disabled={quantity <= 1}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Minus className="w-4 h-4 text-stone-600" />
                      </motion.button>
                      <span className="text-lg text-stone-900 font-light w-12 text-center">
                        {quantity}
                      </span>
                      <motion.button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4 text-stone-600" />
                      </motion.button>
                    </div>

                    {/* Add to Cart & Wishlist */}
                    <div className="flex gap-4">
                      <motion.button
                        onClick={handleAddToCart}
                        className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-sm tracking-wide flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Add to Cart
                      </motion.button>
                      <motion.button
                        onClick={handleWishlistToggle}
                        className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-stone-200 hover:bg-stone-100"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isInWishlist(product.id)
                              ? 'text-rose-500 fill-rose-500'
                              : 'text-stone-600'
                          }`}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                </ParallaxWrapper>

                {/* Content Sections */}
                <ParallaxWrapper speed={0.5} direction="vertical">
                  <motion.div 
                    className="space-y-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {/* Section Navigation */}
                    <div className="flex gap-8 border-b border-stone-200">
                      {['details', 'ingredients', 'how to use'].map((section) => (
                        <motion.button
                          key={section}
                          onClick={() => setActiveSection(section)}
                          className={`pb-4 text-sm tracking-wide capitalize transition-colors ${
                            activeSection === section
                              ? 'text-stone-900 border-b-2 border-stone-900'
                              : 'text-stone-500 hover:text-stone-700'
                          }`}
                          whileHover={{ y: -2 }}
                        >
                          {section}
                        </motion.button>
                      ))}
                    </div>

                    {/* Section Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="font-light"
                      >
                        {activeSection === 'details' && (
                          <div className="space-y-6">
                            <p className="text-stone-600 leading-relaxed">
                              {product.description}
                            </p>
                            {product.benefits && (
                              <ul className="space-y-3">
                                {product.benefits.map((benefit, index) => (
                                  <motion.li 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 text-stone-600"
                                  >
                                    <span className="text-stone-400">·</span>
                                    <span>{benefit}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        {activeSection === 'ingredients' && product.ingredients && (
                          <div className="space-y-6">
                            <p className="text-stone-600 leading-relaxed">
                              Our products are formulated with carefully selected natural ingredients:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {product.ingredients.map((ingredient, index) => (
                                <motion.span
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="px-4 py-2 bg-white text-stone-600 text-sm border border-stone-200 rounded-full"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {ingredient}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeSection === 'how to use' && product.howToUse && (
                          <div className="space-y-6">
                            <p className="text-stone-600 leading-relaxed">
                              {product.howToUse}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </ParallaxWrapper>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OptimizedProductDetail;