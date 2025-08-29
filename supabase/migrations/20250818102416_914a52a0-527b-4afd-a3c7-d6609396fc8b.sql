-- Add invoices table for order documentation
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  pdf_url TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for invoices
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- RLS policies for invoices
CREATE POLICY "Users can view their own invoices" 
ON public.invoices 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM orders 
  WHERE orders.id = invoices.order_id 
  AND orders.user_id = auth.uid()
));

-- Add activity logs table for tracking user actions
CREATE TABLE public.activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for activity logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for activity logs (users can view their own logs)
CREATE POLICY "Users can view their own activity logs" 
ON public.activity_logs 
FOR SELECT 
USING (auth.uid() = user_id);

-- Add support for multiple images in products table
ALTER TABLE public.products 
ADD COLUMN images TEXT[] DEFAULT ARRAY[image],
ADD COLUMN featured_image TEXT;

-- Update existing products to use the new images array structure
UPDATE public.products 
SET images = ARRAY[image], 
    featured_image = image 
WHERE images IS NULL;

-- Add enhanced order tracking columns
ALTER TABLE public.orders 
ADD COLUMN payment_method TEXT DEFAULT 'razorpay',
ADD COLUMN payment_status TEXT DEFAULT 'pending',
ADD COLUMN razorpay_order_id TEXT,
ADD COLUMN razorpay_payment_id TEXT,
ADD COLUMN tracking_number TEXT,
ADD COLUMN estimated_delivery_date DATE,
ADD COLUMN notes TEXT;

-- Add order status update trigger for activity logging
CREATE OR REPLACE FUNCTION public.log_order_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Log order creation
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.activity_logs (user_id, action, description, metadata)
    VALUES (
      NEW.user_id,
      'order_created',
      'New order placed',
      jsonb_build_object(
        'order_id', NEW.id,
        'total_amount', NEW.total_amount,
        'status', NEW.status
      )
    );
    RETURN NEW;
  END IF;
  
  -- Log order updates
  IF TG_OP = 'UPDATE' THEN
    -- Log status changes
    IF OLD.status != NEW.status THEN
      INSERT INTO public.activity_logs (user_id, action, description, metadata)
      VALUES (
        NEW.user_id,
        'order_status_updated',
        'Order status changed from ' || OLD.status || ' to ' || NEW.status,
        jsonb_build_object(
          'order_id', NEW.id,
          'old_status', OLD.status,
          'new_status', NEW.status
        )
      );
    END IF;
    
    -- Log payment status changes
    IF OLD.payment_status != NEW.payment_status THEN
      INSERT INTO public.activity_logs (user_id, action, description, metadata)
      VALUES (
        NEW.user_id,
        'payment_status_updated',
        'Payment status changed from ' || OLD.payment_status || ' to ' || NEW.payment_status,
        jsonb_build_object(
          'order_id', NEW.id,
          'old_payment_status', OLD.payment_status,
          'new_payment_status', NEW.payment_status,
          'razorpay_payment_id', NEW.razorpay_payment_id
        )
      );
    END IF;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for order activity logging
CREATE TRIGGER order_activity_log_trigger
  AFTER INSERT OR UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.log_order_activity();

-- Add trigger for updating orders updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for updating invoices updated_at if we need to track changes
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comprehensive indexes for better performance
CREATE INDEX idx_invoices_order_id ON public.invoices(order_id);
CREATE INDEX idx_activity_logs_user_id ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  invoice_num TEXT;
BEGIN
  -- Get the next invoice number (starting from 1001)
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 5) AS INTEGER)), 1000) + 1
  INTO next_number
  FROM public.invoices
  WHERE invoice_number ~ '^INV[0-9]+$';
  
  invoice_num := 'INV' || next_number::TEXT;
  
  RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;