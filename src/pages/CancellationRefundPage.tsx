import React from 'react';
import { XCircle, AlertTriangle, Clock, ArrowLeft, RefreshCw } from 'lucide-react';

const CancellationRefundPage: React.FC = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cancellation & Refund Policy</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Important information about order cancellations and our strict refund policy.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Critical Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-500 mt-1 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Critical Policy Notice</h3>
                <p className="text-red-700 font-medium">
                  ALL SALES ARE FINAL. NO CANCELLATIONS after order confirmation. 
                  NO REFUNDS except for manufacturing defects or shipping damage.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="space-y-8">
              {/* Order Cancellation Policy */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                  <XCircle className="w-6 h-6 mr-2" />
                  Order Cancellation Policy
                </h2>
                <div className="space-y-4 text-orange-700">
                  <p className="font-semibold text-lg">STRICT NO CANCELLATION POLICY</p>
                  
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                    <h3 className="font-semibold text-orange-800 mb-2">Once Order is Confirmed:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>NO cancellations will be accepted</li>
                      <li>Orders enter production immediately</li>
                      <li>All handcrafted items are made-to-order</li>
                      <li>Customization begins upon payment confirmation</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-orange-800 mb-2">Pre-Confirmation Cancellation:</h3>
                    <p>Orders can ONLY be cancelled before payment confirmation and order processing begins.</p>
                    <p className="text-sm mt-2">
                      <strong>Time Limit:</strong> Within 30 minutes of placing order, subject to processing status.
                    </p>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                  <RefreshCw className="w-6 h-6 mr-2" />
                  Refund Policy
                </h2>
                <div className="space-y-4 text-red-700">
                  <p className="font-semibold text-lg">NO REFUNDS - ALL SALES FINAL</p>
                  
                  <div className="space-y-3">
                    <p><strong>We DO NOT provide refunds for:</strong></p>
                    <ul className="list-disc pl-6 space-y-1 bg-red-100 p-4 rounded-lg">
                      <li>Change of mind or preference</li>
                      <li>Size issues or fit problems</li>
                      <li>Color variations from photos</li>
                      <li>Design expectations not met</li>
                      <li>Delayed delivery</li>
                      <li>Natural oxidation changes over time</li>
                      <li>Personal dissatisfaction</li>
                      <li>Gifting purpose changes</li>
                    </ul>
                    
                    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                      <p className="font-semibold text-green-800">Limited Refund Exceptions:</p>
                      <p className="text-green-700">Refunds ONLY provided for:</p>
                      <ul className="list-disc pl-6 mt-2 text-green-700">
                        <li><strong>Manufacturing Defects:</strong> Proven production flaws</li>
                        <li><strong>Shipping Damage:</strong> Items damaged during transit</li>
                        <li><strong>Wrong Item Sent:</strong> Incorrect product shipped</li>
                      </ul>
                      <div className="mt-3 p-3 bg-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Claim Process:</strong> Must report within 48 hours of delivery with clear photo evidence. 
                          Claims subject to verification and approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Refund Process */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Refund Process (For Approved Cases Only)
                </h2>
                <div className="space-y-4 text-oxidized-silver">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Step-by-Step Process:</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-blue-700">
                      <li><strong>Report Issue:</strong> Contact us within 48 hours with photos</li>
                      <li><strong>Verification:</strong> Our team reviews the claim (2-3 business days)</li>
                      <li><strong>Approval:</strong> If approved, return instructions provided</li>
                      <li><strong>Return Item:</strong> Send back item in original condition</li>
                      <li><strong>Inspection:</strong> Item inspected upon receipt</li>
                      <li><strong>Refund Processing:</strong> 7-14 business days after approval</li>
                    </ol>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold text-deep-teal mb-2">Refund Method:</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Refunds processed to original payment method only</li>
                      <li>Bank transfer fees may be deducted from refund amount</li>
                      <li>Processing time depends on bank/payment gateway</li>
                      <li>Shipping charges are non-refundable</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quality Assurance */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Quality Assurance</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>At HiddenHallo, we take pride in our craftsmanship:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Each piece is carefully handcrafted and inspected</li>
                    <li>Quality checks performed before shipping</li>
                    <li>Proper packaging to prevent shipping damage</li>
                    <li>Care instructions provided with each purchase</li>
                    <li>Customer support available for product queries</li>
                  </ul>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4">Important Notes</h2>
                <div className="space-y-4 text-yellow-700">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Oxidized Jewelry Nature:</strong> Natural color variations and aging are expected characteristics, not defects</li>
                    <li><strong>Handmade Items:</strong> Slight variations in size, shape, and finish are normal for handcrafted products</li>
                    <li><strong>Photo Differences:</strong> Screen displays may show colors differently than actual items</li>
                    <li><strong>Care Instructions:</strong> Proper care is essential; damage from misuse is not covered</li>
                    <li><strong>Final Decision:</strong> HiddenHallo reserves the right to make final decisions on all refund claims</li>
                  </ul>
                </div>
              </div>

              {/* Contact for Claims */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Contact for Claims</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>For defect claims or shipping damage reports:</p>
                  <div className="bg-cream/50 rounded-lg p-4">
                    <p><strong>Email:</strong> HiddenHalloinfo@gmail.com</p>
                    <p><strong>Subject Line:</strong> "REFUND CLAIM - [Order Number]"</p>
                    <p><strong>Include:</strong> Order details, clear photos, description of issue</p>
                    <p><strong>Response Time:</strong> 24-48 hours</p>
                  </div>
                  <p className="text-sm text-red-600 font-medium mt-4">
                    ⚠️ Claims without proper documentation will be automatically rejected
                  </p>
                </div>
              </div>

              {/* Customer Acknowledgment */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Acknowledgment</h2>
                <div className="space-y-4 text-gray-700">
                  <p className="font-semibold">By placing an order with HiddenHallo, you acknowledge that:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You have read and understood this Cancellation & Refund Policy</li>
                    <li>You accept the NO CANCELLATION and NO REFUND terms</li>
                    <li>You understand the handmade nature of our products</li>
                    <li>You agree to the limited exceptions for defects only</li>
                    <li>All sales are final upon order confirmation</li>
                  </ul>
                </div>
              </div>

              {/* Policy Updates */}
              <div>
                <h2 className="text-2xl font-bold text-deep-teal mb-4">Policy Updates</h2>
                <div className="space-y-4 text-oxidized-silver">
                  <p>
                    HiddenHallo reserves the right to modify this Cancellation & Refund Policy at any time. 
                    Changes will be effective immediately upon posting on our website. Customers are responsible 
                    for reviewing policy updates.
                  </p>
                </div>
              </div>

              {/* Last Updated */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-oxidized-silver">
                  <strong>Last Updated:</strong> December 2024
                </p>
                <p className="text-sm text-oxidized-silver mt-2">
                  <strong>Effective Date:</strong> Applicable to all orders placed after this date
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CancellationRefundPage;