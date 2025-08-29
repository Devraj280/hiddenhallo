-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 10,
  sizes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing products (public access)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products data
INSERT INTO public.products (name, price, original_price, description, image, category, sizes) VALUES
('Oxidized Silver Ring Collection', 1299, 1999, 'Handcrafted oxidized silver rings with intricate traditional patterns perfect for everyday wear.', 'https://images.pexels.com/photos/1697111/pexels-photo-1697111.jpeg?auto=compress&cs=tinysrgb&w=600', 'Rings', ARRAY['S', 'M', 'L']),
('Vintage Toe Ring Set', 899, 1299, 'Beautiful set of 3 oxidized toe rings featuring traditional Indian motifs and adjustable sizing.', 'https://images.pexels.com/photos/1697112/pexels-photo-1697112.jpeg?auto=compress&cs=tinysrgb&w=600', 'Toe Rings', ARRAY['Adjustable']),
('Antique Pendant Necklace', 2199, 2999, 'Stunning oxidized silver pendant with detailed craftsmanship, comes with matching chain.', 'https://images.pexels.com/photos/1697113/pexels-photo-1697113.jpeg?auto=compress&cs=tinysrgb&w=600', 'Pendants', NULL),
('Traditional Jewelry Set', 3999, 5499, 'Complete jewelry set including necklace, earrings, and bracelet with oxidized finish.', 'https://images.pexels.com/photos/1697114/pexels-photo-1697114.jpeg?auto=compress&cs=tinysrgb&w=600', 'Sets', NULL),
('Oxidized Bracelet Collection', 1599, 2199, 'Elegant oxidized silver bracelets with contemporary design and traditional appeal.', 'https://images.pexels.com/photos/1697115/pexels-photo-1697115.jpeg?auto=compress&cs=tinysrgb&w=600', 'Bracelets', ARRAY['S', 'M', 'L']),
('Heritage Necklace Set', 4299, 5999, 'Exquisite necklace set featuring traditional Indian patterns with oxidized silver finish.', 'https://images.pexels.com/photos/1697116/pexels-photo-1697116.jpeg?auto=compress&cs=tinysrgb&w=600', 'Necklace Sets', NULL);