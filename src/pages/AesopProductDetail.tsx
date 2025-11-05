import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ArrowLeft, Plus, Minus, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  shortDescription?: string;
  description: string;
  images: string[];
  ingredients?: string[];
  howToUse?: string;
  benefits?: string[];
  size?: string;
}

const AesopProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    });
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#FFFEF2] text-[#252525]">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-stone-200 rounded w-48"></div>
            <div className="h-4 bg-stone-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF2] text-[#252525]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFEF2] border-b border-[#252525]/10">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            to="/products"
            className="inline-flex items-center text-sm hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-light tracking-wide">Return to products</span>
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-24">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left Column - Product Images */}
            <div className="space-y-6 px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-[4/5] bg-[#F6F5E8]"
                >
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "aspect-square bg-[#F6F5E8] transition-opacity",
                        selectedImage === index ? "opacity-100" : "opacity-50 hover:opacity-75"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Product Information */}
            <div className="px-6 lg:pr-12 max-w-xl">
              {/* Product Category & Name */}
              <div className="space-y-6 mb-12">
                <div>
                  <h2 className="text-xs uppercase tracking-widest mb-2">{product.category}</h2>
                  <h1 className="text-2xl font-light tracking-wide">{product.name}</h1>
                </div>
                {product.shortDescription && (
                  <p className="font-light leading-relaxed text-stone-600">
                    {product.shortDescription}
                  </p>
                )}
                {product.size && (
                  <p className="text-sm font-light text-stone-600">
                    {product.size}
                  </p>
                )}
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-[#252525]/10 mb-8">
                <div className="flex gap-8">
                  {['about', 'ingredients', 'how to use'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={cn(
                        "pb-4 text-sm tracking-wide capitalize transition-all",
                        activeSection === section
                          ? "text-[#252525] border-b-2 border-[#252525]"
                          : "text-stone-500 hover:text-stone-700"
                      )}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="mb-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="font-light space-y-6"
                  >
                    {activeSection === 'about' && (
                      <div className="space-y-6">
                        <p className="leading-relaxed">{product.description}</p>
                        {product.benefits && (
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium">Key features</h3>
                            <ul className="space-y-3">
                              {product.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3 text-stone-600">
                                  <span className="text-stone-400 mt-1">·</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {activeSection === 'ingredients' && product.ingredients && (
                      <div className="space-y-6">
                        <p className="leading-relaxed">
                          Our products are formulated with carefully selected natural ingredients:
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {product.ingredients.map((ingredient, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between py-4 border-b border-[#252525]/10"
                            >
                              <span className="font-light">{ingredient}</span>
                              <ChevronRight className="w-4 h-4 text-stone-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeSection === 'how to use' && product.howToUse && (
                      <div className="space-y-6">
                        <p className="leading-relaxed">{product.howToUse}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-light">€{product.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center border border-[#252525]/20 rounded-full hover:bg-[#252525]/5 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center border border-[#252525]/20 rounded-full hover:bg-[#252525]/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-[#252525] text-white rounded-full text-sm tracking-wide hover:bg-[#333333] transition-colors"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => {
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
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#252525]/20 hover:bg-[#252525]/5 transition-colors"
                  >
                    <Heart
                      className={cn(
                        "w-5 h-5",
                        isInWishlist(product.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-[#252525]"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AesopProductDetail;