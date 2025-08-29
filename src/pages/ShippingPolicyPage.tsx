import React from 'react';
import { Truck, MapPin, Clock, Package, ArrowLeft, AlertCircle, IndianRupee } from 'lucide-react';

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-deep-teal to-deep-teal/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shipping Policy</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about our shipping process, delivery times, and affordable charges.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Shipping Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-500 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Shipping Information</h3>
                <p className="text-blue-700">
                  We ship across India with affordable flat-rate shipping of just ₹55. 
                  Get FREE shipping on orders above ₹2000!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-8">
              {/* Shipping Coverage */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Shipping Coverage
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">We Ship Across India:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-green-700">
                      <li>All major cities and metros</li>
                      <li>Tier 2 and Tier 3 cities</li>
                      <li>Rural and remote areas (subject to courier availability)</li>
                      <li>Union Territories and Island regions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">Currently NOT Shipping To:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-red-700">
                      <li>International destinations</li>
                      <li>P.O. Box addresses</li>
                      <li>Areas not serviceable by our courier partners</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Delivery Timeline
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Processing Time:</h3>
                    <p className="text-blue-700 mb-2"><strong>2-4 business days</strong> for order processing and packaging</p>
                    <p className="text-blue-600 text-sm">
                      * Handcrafted items may require additional time during peak seasons
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Major Cities:</h3>
                      <p className="text-green-700"><strong>3-5 business days</strong></p>
                      <p className="text-sm text-green-600">Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2">Other Cities:</h3>
                      <p className="text-yellow-700"><strong>5-7 business days</strong></p>
                      <p className="text-sm text-yellow-600">Tier 2 cities and smaller towns</p>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-2">Remote Areas:</h3>
                    <p className="text-orange-700"><strong>7-10 business days</strong></p>
                    <p className="text-sm text-orange-600">Rural areas, hill stations, and remote locations</p>
                  </div>

                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> Delivery times are estimates and may vary due to weather conditions, 
                      local holidays, courier delays, or unforeseen circumstances. We are not responsible for delays 
                      beyond our control.
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Charges */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
                  <IndianRupee className="w-6 h-6 mr-2" />
                  Shipping Charges
                </h2>
                <div className="space-y-4 text-yellow-700">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 mb-4">
                    <h3 className="font-bold text-green-800 text-xl mb-3 text-center">🎉 Simple & Affordable Shipping 🎉</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="bg-white border-2 border-green-400 rounded-lg p-4 shadow-sm">
                          <h4 className="font-bold text-green-800 text-lg mb-2">All Over India</h4>
                          <div className="text-3xl font-bold text-green-700 mb-1">₹55</div>
                          <p className="text-green-600 text-sm">Flat shipping charge</p>
                          <p className="text-green-600 text-xs mt-1">No hidden costs • All cities covered</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-lg p-4 shadow-lg">
                          <h4 className="font-bold text-lg mb-2">🚚 FREE SHIPPING</h4>
                          <div className="text-2xl font-bold mb-1">On Orders ₹2000+</div>
                          <p className="text-yellow-100 text-sm">Save on shipping costs!</p>
                          <p className="text-yellow-100 text-xs mt-1">Shop more, save more</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-yellow-300 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-800 mb-3">Express Delivery (Optional):</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-yellow-700"><strong>Major Cities:</strong> ₹150 (additional)</p>
                        <p className="text-sm text-yellow-600">Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad</p>
                      </div>
                      <div>
                        <p className="text-yellow-700"><strong>Delivery:</strong> 1-2 business days</p>
                        <p className="text-sm text-yellow-600">After processing • Subject to availability</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg border border-blue-300">
                    <p className="text-blue-800 font-medium text-center">
                      💡 <strong>Smart Tip:</strong> Add items worth ₹2000+ to your cart and get FREE shipping across India!
                    </p>
                  </div>
                </div>
              </div>

              {/* Packaging & Handling */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  Packaging & Handling
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-3">Premium Packaging:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-purple-700">
                      <li>Eco-friendly packaging materials</li>
                      <li>Bubble wrap protection for jewelry items</li>
                      <li>Branded HiddenHallo boxes for gifting</li>
                      <li>Tamper-proof sealing</li>
                      <li>Fragile handling labels</li>
                    </ul>
                  </div>
                  
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h3 className="font-semibold text-teal-800 mb-3">What's Included:</h3>
                    <ul className="list-disc pl-6 space-y-1 text-teal-700">
                      <li>Care instructions card</li>
                      <li>Authenticity certificate</li>
                      <li>Jewelry pouch for storage</li>
                      <li>Thank you note</li>
                      <li>Invoice copy</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tracking & Updates */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <Truck className="w-6 h-6 mr-2" />
                  Tracking & Updates
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Order Tracking Process:</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-blue-700">
                      <li><strong>Order Confirmation:</strong> Email sent immediately after payment</li>
                      <li><strong>Processing Started:</strong> Notification within 24 hours</li>
                      <li><strong>Shipped:</strong> Tracking number provided via SMS & Email</li>
                      <li><strong>In Transit:</strong> Real-time tracking updates</li>
                      <li><strong>Out for Delivery:</strong> Same day delivery notification</li>
                      <li><strong>Delivered:</strong> Confirmation with delivery proof</li>
                    </ol>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-semibold text-green-800 mb-2">SMS Updates:</h3>
                      <p className="text-green-700 text-sm">Real-time SMS notifications for order status, shipping, and delivery updates</p>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-800 mb-2">Email Updates:</h3>
                      <p className="text-purple-700 text-sm">Detailed email updates with tracking links and delivery information</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">Delivery Instructions</h2>
                <div className="space-y-4 text-orange-700">
                  <div className="space-y-3">
                    <h3 className="font-semibold">Customer Responsibilities:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Provide complete and accurate shipping address</li>
                      <li>Include landmark and pin code</li>
                      <li>Provide working phone number for delivery updates</li>
                      <li>Be available during delivery hours (9 AM - 7 PM)</li>
                      <li>Have valid ID proof ready for verification</li>
                    </ul>
                    
                    <h3 className="font-semibold mt-4">Delivery Process:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Courier will call 30 minutes before delivery</li>
                      <li>ID verification required for high-value orders</li>
                      <li>Package inspection allowed before acceptance</li>
                      <li>Delivery proof (photo/signature) taken</li>
                      <li>Maximum 3 delivery attempts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Failed Delivery */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Failed Delivery Policy</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-3">What Happens if Delivery Fails:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-red-700">
                      <li><strong>1st Attempt:</strong> Rescheduled for next working day</li>
                      <li><strong>2nd Attempt:</strong> Customer contacted for preferred time</li>
                      <li><strong>3rd Attempt:</strong> Final delivery attempt</li>
                      <li><strong>After 3 Attempts:</strong> Package returned to HiddenHallo</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-red-100 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Return to Origin Charges:</strong> ₹55 will be deducted from refund if package 
                        returns due to customer unavailability or incorrect address provided by customer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Delivery Services */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Special Delivery Services</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-800 mb-2">Gift Delivery:</h3>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>Special gift wrapping available</li>
                        <li>Personalized message cards</li>
                        <li>Surprise delivery options</li>
                        <li>Additional ₹99 for gift packaging</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">Corporate Orders:</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>Bulk delivery arrangements</li>
                        <li>Multiple address shipping</li>
                        <li>Customized delivery timeline</li>
                        <li>Dedicated support manager</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Shipping Support</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>For shipping queries, tracking issues, or delivery concerns:</p>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <p><strong>Email:</strong> HiddenHalloinfo@gmail.com</p>
                    <p><strong>Subject:</strong> "SHIPPING QUERY - [Order Number]"</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                    <p><strong>Address:</strong> Nirnaynagar, Ahmedabad, Gujarat, India</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Track Your Order:</h3>
                    <p className="text-blue-700 text-sm">
                      Use your tracking number on our courier partner's website or contact us for real-time updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Terms */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Shipping Terms</h2>
                <div className="space-y-4 text-gray-700">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Risk of loss passes to customer upon delivery</li>
                    <li>Shipping charges are non-refundable</li>
                    <li>HiddenHallo is not responsible for delays due to courier issues</li>
                    <li>Address changes not possible after order dispatch</li>
                    <li>Weekend and holiday deliveries subject to courier availability</li>
                    <li>COD (Cash on Delivery) currently not available</li>
                    <li>International shipping may be introduced in future</li>
                  </ul>
                </div>
              </div>

              {/* Last Updated */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-oxidized-silver">
                  <strong>Last Updated:</strong> December 2024
                </p>
                <p className="text-sm text-oxidized-silver mt-2">
                  <strong>Policy Version:</strong> 1.2 - Applicable to all orders placed after this date
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicyPage;