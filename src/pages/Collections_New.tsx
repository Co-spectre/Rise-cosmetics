import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import { Sparkles, Crown, Star, Diamond } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Collections = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [collections, setCollections] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const data = await productService.getFeaturedProducts();
      setCollections(data);
    } catch (error) {
      console.error('Error loading collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: parseInt(product.id),
      name: product.name,
      subtitle: product.shortDescription || '',
      price: product.price,
      type: product.category,
      color: '',
      description: product.description,
      image: product.images[0]
    };
    addToCart(cartItem, 1);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      const wishlistItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      };
      addToWishlist(wishlistItem);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      
      {/* Exclusive Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Video or Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-gold/10" />
        
        {/* Floating Diamonds Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Diamond className="w-4 h-4 text-gold/30" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Crown className="w-8 h-8 text-gold" />
              <Star className="w-6 h-6 text-gold/70" />
              <Crown className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent mb-4">
              EXCLUSIVE
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              LIMITED EDITION
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover our most coveted collection of rare, luxury skincare treasures. 
              Each piece is crafted for the discerning connoisseur.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-gold text-sm tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-4 h-4" />
            <span>By Invitation Only</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      {/* Main Collections Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full"
                />
                <p className="text-gold text-lg tracking-wide">Curating Excellence...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Collection Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-8 px-8 py-4 bg-black/50 backdrop-blur-sm border border-gold/20 rounded-full">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">{collections.length}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Exclusive Items</div>
                  </div>
                  <div className="w-px h-8 bg-gold/20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">24K</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Gold Infused</div>
                  </div>
                  <div className="w-px h-8 bg-gold/20" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">∞</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">Luxury</div>
                  </div>
                </div>
              </motion.div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {collections.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Premium Badge */}
                    <div className="absolute -top-2 -right-2 z-20">
                      <div className="bg-gradient-to-r from-gold to-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                        EXCLUSIVE
                      </div>
                    </div>

                    {/* Luxury Product Card */}
                    <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gold/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-gold/20 transition-all duration-500 group-hover:scale-105">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.images?.[0] || '/placeholder.svg'}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {product.shortDescription}
                            </p>
                          </div>
                          <button
                            onClick={() => handleWishlistToggle(product)}
                            className={cn(
                              "p-2 rounded-full transition-all duration-300",
                              isInWishlist(product.id)
                                ? "bg-gold text-black"
                                : "bg-white/10 text-white hover:bg-gold hover:text-black"
                            )}
                          >
                            <Star className={cn("w-4 h-4", isInWishlist(product.id) && "fill-current")} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gold">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:from-yellow-500 hover:to-gold transition-all duration-300 shadow-lg hover:shadow-gold/30"
                        >
                          Add to Collection
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {collections.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Crown className="w-16 h-16 text-gold/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Collection Coming Soon</h3>
                  <p className="text-gray-400">
                    Our exclusive limited edition pieces are being carefully curated for you.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;
