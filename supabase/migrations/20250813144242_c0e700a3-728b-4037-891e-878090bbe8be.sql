-- Add phone number field to orders table for shipping address
ALTER TABLE public.orders ADD COLUMN phone TEXT;

-- Create coupons table for discount codes
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_percentage INTEGER NOT NULL,
  usage_limit INTEGER NOT NULL DEFAULT 0,
  used_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS on coupons table
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing active coupons
CREATE POLICY "Anyone can view active coupons" 
ON public.coupons 
FOR SELECT 
USING (active = true);

-- Insert FIRST5 coupon
INSERT INTO public.coupons (code, discount_percentage, usage_limit, active) 
VALUES ('FIRST5', 10, 5, true);

-- Create trigger for timestamp updates on coupons
CREATE TRIGGER update_coupons_updated_at
BEFORE UPDATE ON public.coupons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();