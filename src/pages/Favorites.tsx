import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useWishlist } from '@/contexts/WishlistContext';
import { Heart, ShoppingBag, X, Star, Sparkles, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Favorites = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { toast } = useToast();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Mock featured products for when favorites is empty
  const featuredProducts = [
    {
      id: 'rise-1',
      name: 'Luminous Rice Water Essence',
      price: 89.00,
      image: '/placeholder.svg',
      rating: 4.9,
      category: 'Essence'
    },
    {
      id: 'rise-2', 
      name: 'Rejuvenating Rice Bran Serum',
      price: 145.00,
      image: '/placeholder.svg',
      rating: 4.8,
      category: 'Serum'
    },
    {
      id: 'rise-5',
      name: 'Radiance Rice Glow Oil',
      price: 198.00,
      image: '/placeholder.svg',
      rating: 4.9,
      category: 'Oil'
    }
  ];

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from favorites",
      description: `${productName} has been removed from your favorites.`,
    });
  };

  const handleClearAll = () => {
    clearWishlist();
    setShowClearConfirm(false);
    toast({
      title: "Favorites cleared",
      description: "All items have been removed from your favorites.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 via-white to-rice-50">
      <Header />
      
      <main className="pt-20 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-olive-100 to-rice-100">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-olive-600 to-rice-600 rounded-full mb-8 shadow-lg">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-light text-olive-900 mb-4 tracking-wide">
              Your Favorites
            </h1>
            <p className="text-xl text-olive-700 font-light max-w-2xl mx-auto">
              The products you love, curated just for you. Your personal collection of beauty essentials.
            </p>
            {items.length > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <p className="text-olive-600 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your favorites
                </p>
                <Button
                  onClick={() => setShowClearConfirm(true)}
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          {items.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Heart className="w-16 h-16 text-rose-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-playfair text-olive-900 mb-4">Your Heart's Empty</h3>
                <p className="text-olive-700 font-light text-lg mb-8 leading-relaxed">
                  Start building your collection of favorite products. Discover what makes your skin glow.
                </p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-olive-600 to-rice-600 hover:from-olive-700 hover:to-rice-700 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Explore Products
                  </Button>
                </Link>
              </div>

              {/* Featured Products Section */}
              <div className="mt-20">
                <h4 className="text-xl font-playfair text-olive-900 mb-8">You Might Love These</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {featuredProducts.map((product) => (
                    <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="aspect-square bg-gradient-to-br from-olive-50 to-rice-50 rounded-lg mb-4 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-olive-400" />
                        </div>
                        <h5 className="font-medium text-olive-900 mb-2">{product.name}</h5>
                        <p className="text-olive-600 text-sm mb-2">{product.category}</p>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                        </div>
                        <p className="font-medium text-olive-900">${product.price}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Favorites Grid */
            <div className="py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item) => (
                  <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <div className="relative aspect-square bg-gradient-to-br from-olive-50 to-rice-50 flex items-center justify-center">
                        <img 
                          src={item.image || '/placeholder.svg'} 
                          alt={item.name}
                          className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.productId, item.name)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        {/* Heart Icon */}
                        <div className="absolute top-3 left-3 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-md">
                          <Heart className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="font-medium text-olive-900 mb-2 group-hover:text-olive-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-lg font-light text-olive-800 mb-4">
                          ${item.price}
                        </p>
                        <p className="text-sm text-olive-600 mb-4">
                          Added {new Date(item.addedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link to={`/products/${item.productId}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-olive-600 to-rice-600 hover:from-olive-700 hover:to-rice-700 text-white text-sm py-2 rounded-lg transition-all duration-300">
                              View Product
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            className="px-3 border-olive-200 hover:bg-olive-50 hover:border-olive-300 text-olive-600"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Bar */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/products">
                  <Button 
                    variant="outline"
                    className="border-olive-200 hover:bg-olive-50 hover:border-olive-300 text-olive-600 px-6"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add More Products
                  </Button>
                </Link>
                <Link to="/checkout">
                  <Button className="bg-gradient-to-r from-olive-600 to-rice-600 hover:from-olive-700 hover:to-rice-700 text-white px-8">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shop Favorites
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Clear All Favorites?</h3>
                <p className="text-gray-600 mb-6">
                  This will remove all {items.length} items from your favorites. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleClearAll}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
