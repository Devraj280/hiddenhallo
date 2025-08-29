-- Add multiple image columns to products table
ALTER TABLE public.products 
ADD COLUMN image1 TEXT,
ADD COLUMN image2 TEXT,
ADD COLUMN image3 TEXT,
ADD COLUMN image4 TEXT,
ADD COLUMN image5 TEXT;