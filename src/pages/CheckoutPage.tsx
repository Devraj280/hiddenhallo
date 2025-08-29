import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, ArrowLeft, Tag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { sendPaymentConfirmationEmail } from '@/lib/emailService';
import { trackPurchase, trackBeginCheckout } from '@/components/GoogleAnalytics';

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'razorpay'
  });
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadUserProfile();
  }, [user, navigate]);

  // Track begin checkout event
  useEffect(() => {
    if (state.items.length > 0) {
      trackBeginCheckout(state.items, total);
    }
  }, [state.items, total]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (data) {
        const address = data.address as any;
        setFormData(prev => ({
          ...prev,
          fullName: data.full_name || '',
          email: data.email || user?.email || '',
          address: address?.street || '',
          city: address?.city || '',
          state: address?.state || '',
          zipCode: address?.zipCode || '',
          phone: address?.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const applyCoupon = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('active', true)
        .single();

      if (error || !data) {
        toast.error('Invalid coupon code');
        return;
      }

      if (data.used_count >= data.usage_limit) {
        toast.error('Coupon usage limit exceeded');
        return;
      }

      setAppliedCoupon(data);
      toast.success(`Coupon applied! ${data.discount_percentage}% discount`);
    } catch (error) {
      toast.error('Failed to apply coupon');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const subtotal = state.total;
  const couponDiscount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount_percentage / 100)) : 0;
  const discountedSubtotal = subtotal - couponDiscount;
  const shipping = discountedSubtotal >= 2000 ? 0 : 55;
  const total = discountedSubtotal + shipping;

  const createOrderDetails = () => ({
    orderId: `HH${Date.now().toString().slice(-6)}`,
    date: new Date().toLocaleDateString('en-IN'),
    items: state.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.image
    })),
    subtotal,
    shipping,
    discount: couponDiscount,
    total,
    customerInfo: {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode
    }
  });

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      toast.error('Payment gateway not loaded. Please refresh and try again.');
      return;
    }

    setIsProcessing(true);
    const orderDetails = createOrderDetails();

    const options = {
      key: 'rzp_live_R9AHrmp6j2ID7W', // Your Razorpay live key
      amount: total * 100, // Amount in paisa
      currency: 'INR',
      name: 'HiddenHallo',
      description: `Order #${orderDetails.orderId}`,
      image: '/logo.png', // Your company logo URL
      order_id: '', // You can generate this from backend if needed
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`
      },
      theme: {
        color: '#2C5530' // Your deep-teal color
      },
      handler: async function (response: any) {
        // Payment successful
        console.log('Payment successful:', response);
        
        // Store order details with payment info
        const orderWithPayment = {
          ...orderDetails,
          paymentId: response.razorpay_payment_id,
          paymentMethod: 'razorpay',
          paymentStatus: 'completed'
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderWithPayment));
        
        // Send payment confirmation email
        try {
          const emailResult = await sendPaymentConfirmationEmail(
            orderDetails,
            {
              paymentId: response.razorpay_payment_id,
              paymentMethod: 'razorpay',
              paymentStatus: 'completed'
            }
          );
          
          if (emailResult.success) {
            console.log('Payment confirmation email sent successfully');
          } else {
            console.error('Failed to send confirmation email:', emailResult.error);
          }
        } catch (error) {
          console.error('Error sending confirmation email:', error);
        }

        // Track purchase event
        trackPurchase(orderDetails, {
          paymentId: response.razorpay_payment_id,
          paymentMethod: 'razorpay',
          paymentStatus: 'completed'
        });
        
        // Clear cart
        dispatch({ type: 'CLEAR_CART' });
        
        // Navigate to thank you page
        navigate('/thank-you', { state: { orderDetails: orderWithPayment } });
        
        toast.success('Payment successful! Order placed.');
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          toast.error('Payment cancelled');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response: any) {
      setIsProcessing(false);
      console.error('Payment failed:', response.error);
      toast.error(`Payment failed: ${response.error.description}`);
    });

    rzp.open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || 
        !formData.city || !formData.state || !formData.zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    handleRazorpayPayment();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-deep-teal mb-2">No items to checkout</h1>
            <p className="text-oxidized-silver mb-8">
              Your cart is empty. Add some items to proceed with checkout.
            </p>
            <Link
              to="/products"
              className="inline-block bg-deep-teal hover:bg-deep-teal/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-deep-teal hover:text-warm-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-deep-teal mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 9737940267"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="380001"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Gujarat"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method - Only Razorpay */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border-deep-teal bg-deep-teal/5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked
                        readOnly
                        className="w-4 h-4 text-deep-teal"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-2 text-deep-teal" />
                          <span className="font-medium">Pay Online</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Pay securely using Credit/Debit Cards, UPI, Net Banking, Wallets
                        </p>
                        <div className="flex items-center mt-2 space-x-2 text-xs text-green-600">
                          <Shield className="w-4 h-4" />
                          <span>100% Secure • SSL Encrypted</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Tag className="w-6 h-6 mr-2" />
                  Coupon Code
                </h2>
                
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code (e.g., FIRST5)"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-teal bg-white"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="bg-warm-gold hover:bg-warm-gold/90 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">
                        Coupon "{appliedCoupon.code}" applied!
                      </p>
                      <p className="text-sm text-green-600">
                        {appliedCoupon.discount_percentage}% discount (₹{couponDiscount} off)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-deep-teal hover:bg-deep-teal/90 text-white'
                }`}
              >
                {isProcessing ? (
                  'Processing...'
                ) : (
                  `Pay ₹${total.toLocaleString()} Online`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Items with Controls */}
              <div className="space-y-3 mb-6">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.size || 'default'}`} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-deep-teal">{item.name}</p>
                        {item.size && <p className="text-xs text-oxidized-silver">Size: {item.size}</p>}
                        <p className="font-semibold text-warm-gold">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => dispatch({ 
                          type: 'REMOVE_ITEM', 
                          payload: { id: item.id, size: item.size } 
                        })}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-oxidized-silver">Quantity:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => dispatch({ 
                              type: 'UPDATE_QUANTITY', 
                              payload: { 
                                id: item.id, 
                                size: item.size,
                                quantity: Math.max(1, item.quantity - 1)
                              } 
                            })}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-12 text-center py-1 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => dispatch({ 
                              type: 'UPDATE_QUANTITY', 
                              payload: { 
                                id: item.id, 
                                size: item.size,
                                quantity: Math.min(10, item.quantity + 1)
                              } 
                            })}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-lg transition-colors"
                            disabled={item.quantity >= 10}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="font-semibold text-deep-teal">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-oxidized-silver">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount_percentage}%)</span>
                    <span className="font-semibold">-₹{couponDiscount}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-oxidized-silver">Shipping</span>
                  <div className="text-right">
                    <span className="font-semibold">
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                    {shipping === 0 && (
                      <div className="flex items-center text-xs text-green-600">
                        <Truck className="w-3 h-3 mr-1" />
                        Free shipping applied
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-oxidized-silver">
                <p className="mb-2">🔒 Secure SSL Checkout</p>
                <p className="text-xs">Powered by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;