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

interface PaymentInfo {
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
}

export const sendPaymentConfirmationEmailDirect = async (
  orderDetails: OrderDetails,
  paymentInfo: PaymentInfo
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    // Email template for payment confirmation
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - HiddenHallo</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2C5530, #8B4513); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
          .total { font-weight: bold; font-size: 18px; margin-top: 20px; padding-top: 20px; border-top: 2px solid #2C5530; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Payment Successful!</h1>
            <p>Order Confirmation from HiddenHallo</p>
          </div>
          
          <div class="content">
            <h2>Dear ${orderDetails.customerInfo.name},</h2>
            <p>Thank you for your purchase! Your payment has been successfully processed and your order has been confirmed.</p>
            
            <div class="order-details">
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> #${orderDetails.orderId}</p>
              <p><strong>Order Date:</strong> ${orderDetails.date}</p>
              <p><strong>Payment ID:</strong> ${paymentInfo.paymentId}</p>
              <p><strong>Payment Method:</strong> ${paymentInfo.paymentMethod}</p>
              
              <h4>Items Ordered:</h4>
              ${orderDetails.items.map(item => `
                <div class="item">
                  <span>${item.name} ${item.size ? `(${item.size})` : ''} x ${item.quantity}</span>
                  <span>₹${item.price}</span>
                </div>
              `).join('')}
              
              <div class="total">
                <div class="item">
                  <span>Subtotal:</span>
                  <span>₹${orderDetails.subtotal}</span>
                </div>
                <div class="item">
                  <span>Shipping:</span>
                  <span>₹${orderDetails.shipping}</span>
                </div>
                <div class="item">
                  <span>Tax:</span>
                  <span>₹${orderDetails.tax}</span>
                </div>
                ${orderDetails.discount > 0 ? `
                <div class="item">
                  <span>Discount:</span>
                  <span>-₹${orderDetails.discount}</span>
                </div>
                ` : ''}
                <div class="item">
                  <span><strong>Total:</strong></span>
                  <span><strong>₹${orderDetails.total}</strong></span>
                </div>
              </div>
            </div>
            
            <div class="order-details">
              <h3>Shipping Address</h3>
              <p>${orderDetails.customerInfo.name}</p>
              <p>${orderDetails.customerInfo.address}</p>
              <p>${orderDetails.customerInfo.city}, ${orderDetails.customerInfo.state} ${orderDetails.customerInfo.zipCode}</p>
              <p>Phone: ${orderDetails.customerInfo.phone}</p>
            </div>
            
            <p>We'll send you a shipping confirmation email with tracking information once your order is shipped.</p>
            
            <p>If you have any questions, please don't hesitate to contact us at hiddenhalloinfo@gmail.com</p>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing HiddenHallo!</p>
            <p>© 2024 HiddenHallo. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Call your backend API endpoint that handles email sending
    const response = await fetch('/api/send-payment-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'hiddenhalloinfo@gmail.com',
        subject: `Payment Confirmation - Order #${orderDetails.orderId}`,
        html: emailContent,
        orderDetails,
        paymentInfo
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      message: 'Payment confirmation email sent successfully'
    };

  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
