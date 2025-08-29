import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Download, Calendar, MapPin, Phone, Mail, Package, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface OrderDetails {
  orderId: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Get order details from location state or localStorage
    const details = location.state?.orderDetails || 
      JSON.parse(localStorage.getItem('lastOrder') || '{}');
    
    if (details.orderId) {
      setOrderDetails(details);
    } else {
      // Generate a mock order if no details found
      const mockOrder: OrderDetails = {
        orderId: `HH${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('en-IN'),
        items: [
          {
            id: '1',
            name: 'Oxidized Silver Ring',
            price: 899,
            quantity: 1,
            image: '/api/placeholder/100/100'
          }
        ],
        subtotal: 899,
        shipping: 55,
        tax: 162,
        discount: 0,
        total: 1116,
        customerInfo: {
          name: 'Valued Customer',
          email: 'customer@example.com',
          phone: '+91 9173312623',
          address: 'Ahmedabad',
          city: 'Ahmedabad',
          state: 'Gujarat',
          zipCode: '380001'
        }
      };
      setOrderDetails(mockOrder);
    }
  }, [location.state]);

  const downloadBill = () => {
    if (!orderDetails) return;

    const pdf = new jsPDF();
    
    // Set up colors
    const primaryColor = [25, 102, 102]; // Deep teal color
    const goldColor = [218, 165, 32];   // Warm gold color
    
    // Company Header
    pdf.setFillColor(25, 102, 102);
    pdf.rect(0, 0, 210, 40, 'F');
    
    // Company name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('HIDDENHALLO', 20, 25);
    
    // Invoice label
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('TAX INVOICE', 150, 20);
    pdf.text(`Invoice #${orderDetails.orderId}`, 150, 30);
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    
    // Invoice details section
    let yPos = 55;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Invoice Date:', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(orderDetails.date, 50, yPos);
    
    yPos += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Order ID:', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    pdf.text(orderDetails.orderId, 50, yPos);
    
    // Customer details section
    yPos += 20;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BILL TO:', 20, yPos);
    
    yPos += 10;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(orderDetails.customerInfo.name, 20, yPos);
    
    yPos += 8;
    pdf.text(orderDetails.customerInfo.address, 20, yPos);
    
    yPos += 8;
    pdf.text(`${orderDetails.customerInfo.city}, ${orderDetails.customerInfo.state} - ${orderDetails.customerInfo.zipCode}`, 20, yPos);
    
    yPos += 8;
    pdf.text(`Email: ${orderDetails.customerInfo.email}`, 20, yPos);
    
    yPos += 8;
    pdf.text(`Phone: ${orderDetails.customerInfo.phone}`, 20, yPos);
    
    // Items table header
    yPos += 20;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, yPos - 5, 170, 10, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('Item', 25, yPos);
    pdf.text('Qty', 120, yPos);
    pdf.text('Price', 140, yPos);
    pdf.text('Total', 170, yPos);
    
    // Items
    yPos += 15;
    pdf.setFont('helvetica', 'normal');
    
    orderDetails.items.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      
      pdf.text(item.name + (item.size ? ` (Size: ${item.size})` : ''), 25, yPos);
      pdf.text(item.quantity.toString(), 125, yPos);
      pdf.text(`₹${item.price}`, 140, yPos);
      pdf.text(`₹${itemTotal}`, 170, yPos);
      
      yPos += 10;
    });
    
    // Add line separator
    yPos += 5;
    pdf.line(20, yPos, 190, yPos);
    
    // Payment summary
    yPos += 15;
    pdf.text('Subtotal:', 120, yPos);
    pdf.text(`₹${orderDetails.subtotal.toLocaleString()}`, 170, yPos);
    
    if (orderDetails.discount > 0) {
      yPos += 10;
      pdf.text('Discount:', 120, yPos);
      pdf.text(`-₹${orderDetails.discount.toLocaleString()}`, 170, yPos);
    }
    
    yPos += 10;
    pdf.text('Shipping:', 120, yPos);
    pdf.text(orderDetails.shipping === 0 ? 'Free' : `₹${orderDetails.shipping.toLocaleString()}`, 170, yPos);
    
    // Total
    yPos += 15;
    pdf.line(120, yPos - 5, 190, yPos - 5);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Total Amount:', 120, yPos);
    pdf.text(`₹${orderDetails.total.toLocaleString()}`, 170, yPos);
    
    // Footer
    yPos = 270;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Thank you for shopping with HiddenHallo!', 20, yPos);
    
    yPos += 10;
    pdf.text('Contact: hiddenhalloinfo@gmail.com | Phone: +91 9173312623', 20, yPos);
    
    yPos += 10;
    pdf.text('This is a computer generated invoice and does not require signature.', 20, yPos);
    
    // Save the PDF
    pdf.save(`HiddenHallo_Invoice_${orderDetails.orderId}.pdf`);
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-deep-teal mb-4">Loading order details...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur opacity-25 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-deep-teal mb-4 bg-gradient-to-r from-deep-teal to-warm-gold bg-clip-text text-transparent">
            Order Confirmed! 🎉
          </h1>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-lg text-green-800 font-semibold">
              Thank you for choosing HiddenHallo
            </p>
            <p className="text-green-700">
              Order ID: <span className="font-bold text-deep-teal">#{orderDetails.orderId}</span>
            </p>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-deep-teal text-white p-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
              <div className="flex items-center mb-2 sm:mb-0">
                <Calendar className="w-4 h-4 mr-2" />
                Order Date: {orderDetails.date}
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Expected Delivery: 5-7 business days
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Items */}
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-deep-teal">{item.name}</h3>
                    {item.size && <p className="text-sm text-oxidized-silver">Size: {item.size}</p>}
                    <p className="text-sm text-oxidized-silver">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-deep-teal">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="border-t pt-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-oxidized-silver">Subtotal</span>
                  <span className="font-semibold">₹{orderDetails.subtotal.toLocaleString()}</span>
                </div>
                {orderDetails.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{orderDetails.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-oxidized-silver">Shipping</span>
                  <span className="font-semibold">
                    {orderDetails.shipping === 0 ? 'Free' : `₹${orderDetails.shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid</span>
                    <span className="text-deep-teal">₹{orderDetails.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-deep-teal mb-4">Customer & Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-oxidized-silver mb-3">Customer Details</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Name:</span>
                  <span className="ml-2">{orderDetails.customerInfo.name}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-warm-gold" />
                  <span>{orderDetails.customerInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-warm-gold" />
                  <span>{orderDetails.customerInfo.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-oxidized-silver mb-3">Shipping Address</h4>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-warm-gold mt-1 flex-shrink-0" />
                <div>
                  <p>{orderDetails.customerInfo.address}</p>
                  <p>{orderDetails.customerInfo.city}, {orderDetails.customerInfo.state}</p>
                  <p>PIN: {orderDetails.customerInfo.zipCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <button
            onClick={downloadBill}
            className="inline-flex items-center bg-warm-gold hover:bg-warm-gold/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 mr-4"
          >
            <FileText className="w-5 h-5 mr-2" />
            Download PDF Invoice
          </button>
          
          <div className="space-x-4">
            <Link
              to="/products"
              className="inline-block bg-deep-teal hover:bg-deep-teal/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </Link>
            <Link
              to="/contact"
              className="inline-block border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <div className="bg-deep-teal/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-deep-teal mb-2">Need Help?</h3>
            <p className="text-oxidized-silver mb-4">
              If you have any questions about your order, feel free to contact us:
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:hiddenhalloinfo@gmail.com"
                className="flex items-center text-deep-teal hover:text-warm-gold transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                hiddenhalloinfo@gmail.com
              </a>
              <a 
                href="https://wa.me/919173312623"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-deep-teal hover:text-warm-gold transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +91 9173312623
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;