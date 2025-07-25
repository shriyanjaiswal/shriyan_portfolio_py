
-- Add image_url column to personal_info table
ALTER TABLE public.personal_info 
ADD COLUMN image_url TEXT;

-- Update the existing record with a placeholder or you can update it later with your actual image URL
-- UPDATE public.personal_info 
-- SET image_url = 'your-image-url-here' 
-- WHERE id = (SELECT id FROM personal_info LIMIT 1);
