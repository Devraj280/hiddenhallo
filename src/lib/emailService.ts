import { supabase } from '@/integrations/supabase/client';

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

export const sendPaymentConfirmationEmail = async (
  orderDetails: OrderDetails,
  paymentInfo: PaymentInfo
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-payment-confirmation', {
      body: {
        orderDetails,
        customerInfo: orderDetails.customerInfo,
        paymentInfo
      }
    });

    if (error) {
      console.error('Error calling edge function:', error);
      return {
        success: false,
        error: error.message || 'Failed to send confirmation email'
      };
    }

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
