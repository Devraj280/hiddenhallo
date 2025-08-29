import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  const updateQuantity = (id: string, size: string | undefined, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, size, quantity }
    });
  };

  const removeItem = (id: string, size: string | undefined) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, size }
    });
  };

  const shipping = state.total >= 2000 ? 0 : 55;
  const finalTotal = state.total + shipping;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-deep-teal mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-oxidized-silver mb-8 max-w-md mx-auto">
              Looks like you haven't added any beautiful jewelry pieces to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Shopping
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
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-deep-teal">Shopping Cart</h1>
          <p className="text-oxidized-silver mt-2">
            {state.items.length} {state.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div
                key={`${item.id}-${item.size || 'default'}`}
                className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-deep-teal mb-1">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-sm text-oxidized-silver mb-2">Size: {item.size}</p>
                      )}
                      <p className="text-lg font-bold text-deep-teal">₹{item.price}</p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="flex items-center text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </button>

                      {/* Subtotal */}
                      <p className="text-lg font-bold text-deep-teal">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-deep-teal mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-oxidized-silver">Subtotal</span>
                  <span className="font-semibold">₹{state.total}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-oxidized-silver">Shipping</span>
                  <div className="text-right">
                    <span className="font-semibold">
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                    {shipping === 0 && (
                      <div className="flex items-center text-xs text-green-600 mt-1">
                        <Truck className="w-3 h-3 mr-1" />
                        Free shipping applied!
                      </div>
                    )}
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-oxidized-silver bg-warm-gold/10 p-3 rounded-lg">
                    Shipping charges: ₹55. Add ₹{2000 - state.total} more for free shipping!
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-deep-teal">₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="block w-full mt-6 bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>

              <div className="mt-6 text-center text-sm text-oxidized-silver space-y-2">
                <div className="flex items-center justify-center">
                  <Truck className="w-4 h-4 mr-2" />
                  Free shipping on orders above ₹2000
                </div>
                <p>🔒 Secure checkout with SSL encryption</p>
                <p>📞 24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;