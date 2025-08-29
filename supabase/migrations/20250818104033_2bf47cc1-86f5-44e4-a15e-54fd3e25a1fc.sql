-- Insert a demo product with multiple images
INSERT INTO public.products (
  name,
  description,
  price,
  original_price,
  image,
  image1,
  image2,
  image3,
  image4,
  images,
  category,
  rating,
  reviews_count,
  stock,
  sizes
) VALUES (
  'Premium Gold Chain Necklace',
  'Exquisite handcrafted gold chain necklace with intricate design patterns. Perfect for special occasions and daily wear. Made with high-quality materials and traditional craftsmanship.',
  2499,
  3199,
  'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg',
  ARRAY['https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg', 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg'],
  'Necklaces',
  4.8,
  127,
  15,
  ARRAY['Small', 'Medium', 'Large']
);