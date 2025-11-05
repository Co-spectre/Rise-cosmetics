import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, ArrowLeft, Minus, Plus, Droplets, Sparkles, Clock, Sun, Moon, Leaf, CheckCircle2, Info, Zap } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
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
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-light text-gray-900 mb-4">Product Not Found</h1>
            <Link to="/products" className="text-olive-600 hover:text-olive-700">
              Return to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice-50/40 via-white to-rice-50/20">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-12">
            <Link to="/products" className="text-sm text-olive-700 hover:text-olive-900 flex items-center gap-2 font-light tracking-wide">
              <ArrowLeft className="w-4 h-4" />
              Back to Collection
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Product Images */}
            <div className="space-y-4 md:space-y-6 sticky top-24 self-start">
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-rice-100/50 to-olive-50/30 rounded-xl md:rounded-2xl overflow-hidden border border-olive-100/30 shadow-sm hover:shadow-lg transition-shadow duration-500">
                <img
                  src={product.images[selectedImage] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 md:gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 aspect-square rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-olive-600 shadow-md ring-1 ring-olive-200' 
                          : 'border-olive-100/50 hover:border-olive-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Elegant Trust Section */}
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl border border-olive-100/30 shadow-sm">
                <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                  <div className="group">
                    <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 rounded-full bg-olive-50 flex items-center justify-center group-hover:bg-olive-100 transition-colors">
                      <Truck className="w-4 h-4 md:w-5 md:h-5 text-olive-700" />
                    </div>
                    <p className="text-[10px] md:text-xs font-light text-olive-800 uppercase tracking-wider">Free Shipping</p>
                  </div>
                  <div className="group">
                    <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 rounded-full bg-olive-50 flex items-center justify-center group-hover:bg-olive-100 transition-colors">
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-olive-700" />
                    </div>
                    <p className="text-[10px] md:text-xs font-light text-olive-800 uppercase tracking-wider">Secure</p>
                  </div>
                  <div className="group">
                    <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 rounded-full bg-olive-50 flex items-center justify-center group-hover:bg-olive-100 transition-colors">
                      <RotateCcw className="w-4 h-4 md:w-5 md:h-5 text-olive-700" />
                    </div>
                    <p className="text-[10px] md:text-xs font-light text-olive-800 uppercase tracking-wider">Easy Returns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 md:space-y-8">
              {/* Product Title & Rating */}
              <div className="space-y-3 md:space-y-4">
                <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-olive-50 border border-olive-200/50 rounded-full">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-olive-800 font-medium">{product.category}</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-light text-olive-900 leading-tight tracking-tight">
                  {product.name}
                </h1>
                
                <p className="text-base md:text-lg text-olive-700/80 leading-relaxed font-light max-w-xl">
                  {product.shortDescription}
                </p>
                
                {product.rating && (
                  <div className="flex items-center gap-2 md:gap-3 pt-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < Math.floor(product.rating!)
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-olive-700 font-light">
                      {product.rating} <span className="text-olive-500">· {product.reviewCount} reviews</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="py-4 md:py-6 border-y border-olive-100">
                <div className="flex items-baseline gap-3 md:gap-4">
                  <span className="text-3xl md:text-4xl font-light text-olive-900 tracking-tight">€{product.price.toFixed(2)}</span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <>
                      <span className="text-lg md:text-xl text-olive-500 line-through font-light">€{product.compareAtPrice.toFixed(2)}</span>
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-rose-50 text-rose-700 text-[10px] md:text-xs font-medium rounded-full border border-rose-200">
                        Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-olive-50/50 rounded-lg md:rounded-xl border border-olive-100/50">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                <span className="text-xs md:text-sm text-olive-800 font-light tracking-wide">
                  {product.inStock ? 'Available in stock' : 'Currently unavailable'}
                  {product.stockQuantity && product.stockQuantity < 10 && product.inStock && (
                    <span className="text-olive-600 ml-2">· Only {product.stockQuantity} remaining</span>
                  )}
                </span>
              </div>

              {/* Description */}
              <div className="text-sm md:text-base text-olive-700/90 leading-relaxed font-light">
                <p>{product.description}</p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 md:space-y-5 p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-olive-100/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-olive-800 font-light uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center border-2 border-olive-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 md:p-3 hover:bg-olive-50 transition-colors disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3 h-3 md:w-4 md:h-4 text-olive-700" />
                    </button>
                    <span className="px-4 md:px-6 py-2 md:py-3 text-center min-w-[50px] md:min-w-[60px] font-light text-olive-900 border-x-2 border-olive-200 text-sm md:text-base">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 md:p-3 hover:bg-olive-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4 text-olive-700" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 md:gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-olive-800 text-white hover:bg-olive-900 disabled:bg-gray-300 h-12 md:h-14 rounded-xl font-light tracking-wide uppercase text-xs md:text-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleWishlistToggle}
                    className="h-12 md:h-14 px-4 md:px-5 border-2 border-olive-200 hover:bg-olive-50 rounded-xl transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        isInWishlist(product.id)
                          ? 'text-rose-500 fill-rose-500'
                          : 'text-olive-700'
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Key Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="space-y-5 pt-8 border-t border-olive-100">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-olive-600" />
                    <h3 className="text-lg font-light text-olive-900 uppercase tracking-widest">Key Benefits</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {product.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-olive-50/50 to-rice-50/50 rounded-xl border border-olive-100/30 hover:border-olive-200 transition-all duration-300"
                      >
                        <div className="w-6 h-6 bg-olive-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-olive-800 leading-relaxed font-light">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Use - Elegant Section */}
              {product.howToUse && (
                <div className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-olive-100">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-olive-600 rounded-full flex items-center justify-center">
                      <Droplets className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-light text-olive-900 uppercase tracking-widest">How to Use</h3>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    {/* Cards - Morning & Evening */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      {/* Morning Routine */}
                      <div className="p-4 md:p-5 bg-gradient-to-br from-amber-50/50 to-rice-50/50 rounded-xl md:rounded-2xl border border-amber-100/50">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="w-7 h-7 md:w-8 md:h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Sun className="w-3 h-3 md:w-4 md:h-4 text-amber-700" />
                          </div>
                          <h4 className="text-xs md:text-sm font-light text-olive-900 uppercase tracking-wider">Morning</h4>
                        </div>
                        <div className="space-y-2 md:space-y-2.5 text-xs md:text-sm text-olive-700 font-light">
                          <p className="flex items-start gap-2">
                            <span className="text-amber-600">•</span>
                            Cleanse with lukewarm water
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-amber-600">•</span>
                            Apply 2-3 drops to damp skin
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-amber-600">•</span>
                            Massage gently upward
                          </p>
                        </div>
                      </div>

                      {/* Evening Routine */}
                      <div className="p-4 md:p-5 bg-gradient-to-br from-indigo-50/50 to-rice-50/50 rounded-xl md:rounded-2xl border border-indigo-100/50">
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <div className="w-7 h-7 md:w-8 md:h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <Moon className="w-3 h-3 md:w-4 md:h-4 text-indigo-700" />
                          </div>
                          <h4 className="text-xs md:text-sm font-light text-olive-900 uppercase tracking-wider">Evening</h4>
                        </div>
                        <div className="space-y-2 md:space-y-2.5 text-xs md:text-sm text-olive-700 font-light">
                          <p className="flex items-start gap-2">
                            <span className="text-indigo-600">•</span>
                            Remove all makeup
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-indigo-600">•</span>
                            Apply to face and neck
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-indigo-600">•</span>
                            Let absorb overnight
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Instructions */}
                    <div className="p-4 md:p-5 bg-white/60 backdrop-blur-sm rounded-lg md:rounded-xl border border-olive-100/50">
                      <p className="text-xs md:text-sm text-olive-700 leading-relaxed font-light italic">
                        {product.howToUse}
                      </p>
                    </div>

                    {/* Quick Tips */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <div className="text-center p-3 md:p-4 bg-olive-50/50 rounded-lg md:rounded-xl border border-olive-100/30">
                        <Droplets className="w-5 h-5 md:w-6 md:h-6 text-olive-600 mx-auto mb-1 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-olive-800 font-light">Damp skin</p>
                      </div>
                      <div className="text-center p-3 md:p-4 bg-olive-50/50 rounded-lg md:rounded-xl border border-olive-100/30">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-olive-600 mx-auto mb-1 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-olive-800 font-light">2-3 min</p>
                      </div>
                      <div className="text-center p-3 md:p-4 bg-olive-50/50 rounded-lg md:rounded-xl border border-olive-100/30">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-olive-600 mx-auto mb-1 md:mb-2" />
                        <p className="text-[10px] md:text-xs text-olive-800 font-light">2-4 weeks</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="space-y-5 pt-8 border-t border-olive-100">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-olive-600" />
                    <h3 className="text-lg font-light text-olive-900 uppercase tracking-widest">Natural Ingredients</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-olive-50/70 to-rice-50/70 text-olive-800 text-xs font-light border border-olive-100/50 rounded-full hover:bg-olive-100 transition-colors"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
