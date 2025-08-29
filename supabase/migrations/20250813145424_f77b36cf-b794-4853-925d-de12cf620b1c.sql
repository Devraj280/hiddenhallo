-- Add address field to auth signup and profiles
-- Update profiles table to store address data properly for checkout auto-fill

-- No changes needed to profiles table structure as address is already jsonb
-- Just ensuring we can store the address data properly

-- Example of what address data should look like:
-- {
--   "street": "123 Main Street",
--   "city": "Ahmedabad", 
--   "state": "Gujarat",
--   "zipCode": "380001",
--   "phone": "+91 9737940267"
-- }