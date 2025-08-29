import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const WishlistPage: React.FC = () => {
  const { state: wishlistState, removeFromWishlist, clearWishlist } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleRemoveFromWishlist = async (itemId: string, itemName: string) => {
    await removeFromWishlist(itemId);
    toast.success(`${itemName} removed from wishlist`);
  };

  const handleAddToCart = (item: any) => {
    cartDispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        category: item.category
      }
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleMoveToCart = async (item: any) => {
    handleAddToCart(item);
    await removeFromWishlist(item.id);
    toast.success(`${item.name} moved to cart!`);
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center text-deep-teal hover:text-warm-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>

          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <Heart className="w-24 h-24 text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold text-deep-teal mb-4">Your Wishlist is Empty</h1>
            <p className="text-lg text-oxidized-silver mb-8">
              Save your favorite jewelry pieces to your wishlist for easy access later.
            </p>
            <Link
              to="/products"
              className="inline-block bg-deep-teal hover:bg-deep-teal/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-deep-teal hover:text-warm-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-deep-teal mb-2">My Wishlist</h1>
              <p className="text-lg text-oxidized-silver">
                {wishlistState.items.length} {wishlistState.items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            
            {wishlistState.items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-oxidized-silver hover:text-red-500 transition-colors text-sm"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistState.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                
                {item.original_price && (
                  <div className="absolute top-3 left-3 bg-warm-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(((item.original_price - item.price) / item.original_price) * 100)}% OFF
                  </div>
                )}

                <button
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-110"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <Link to={`/products/${item.id}`}>
                  <h3 className="text-lg font-semibold text-deep-teal mb-2 hover:text-warm-gold transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-warm-gold fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-oxidized-silver ml-2">
                    ({item.reviews_count})
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-deep-teal">₹{item.price.toLocaleString()}</span>
                  {item.original_price && (
                    <span className="text-sm text-gray-500 line-through">₹{item.original_price.toLocaleString()}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Move to Cart
                  </button>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full border-2 border-deep-teal text-deep-teal font-semibold py-2.5 rounded-lg hover:bg-deep-teal hover:text-white transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-warm-gold hover:bg-warm-gold/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;