-- Update products with origin_state and variants
-- Run this in Supabase SQL Editor or via psql if Prisma migration fails

-- Garlic - Gujarat
UPDATE products
SET origin_state = 'Gujarat',
    variants = '[{"size":"40mm+","price":"140","unit":"kg","description":"Jumbo Grade"},{"size":"35-40mm","price":"125","unit":"kg","description":"Large Grade"},{"size":"30-35mm","price":"110","unit":"kg","description":"Medium Grade"}]'::jsonb
WHERE name ILIKE '%Garlic%';

-- Banana - Tamil Nadu
UPDATE products
SET origin_state = 'Tamil Nadu',
    variants = '[{"size":"A++ (23cm+)","price":"85","unit":"box","description":"Premium Export Quality"},{"size":"A+ (20-23cm)","price":"70","unit":"box","description":"Grade A"},{"size":"A (17-20cm)","price":"55","unit":"box","description":"Standard Grade"}]'::jsonb
WHERE name ILIKE '%Banana%';

-- Pomegranate - Maharashtra
UPDATE products
SET origin_state = 'Maharashtra',
    variants = '[{"size":"A++ (500g+)","price":"180","unit":"box","description":"Super Premium"},{"size":"A+ (400-500g)","price":"155","unit":"box","description":"Premium Grade"},{"size":"A (300-400g)","price":"130","unit":"box","description":"Standard Grade"}]'::jsonb
WHERE name ILIKE '%Pomegranate%';

-- Papaya - Karnataka
UPDATE products
SET origin_state = 'Karnataka',
    variants = '[{"size":"A+ (2kg+)","price":"95","unit":"box","description":"Large Premium"},{"size":"A (1.5-2kg)","price":"80","unit":"box","description":"Medium Grade"},{"size":"B (1-1.5kg)","price":"65","unit":"box","description":"Small Grade"}]'::jsonb
WHERE name ILIKE '%Papaya%';

-- Tomato - Andhra Pradesh
UPDATE products
SET origin_state = 'Andhra Pradesh',
    variants = '[{"size":"A++ (Hybrid)","price":"120","unit":"box","description":"Premium Hybrid"},{"size":"A+ (Deshi)","price":"95","unit":"box","description":"Local Premium"},{"size":"A (Regular)","price":"75","unit":"box","description":"Standard Quality"}]'::jsonb
WHERE name ILIKE '%Tomato%';

-- Bedsheet - Chandigarh
UPDATE products
SET origin_state = 'Chandigarh',
    variants = '[{"size":"King (108x108)","price":"450","unit":"piece","description":"Premium Cotton"},{"size":"Queen (90x102)","price":"380","unit":"piece","description":"Standard Cotton"},{"size":"Single (72x102)","price":"280","unit":"piece","description":"Economy"}]'::jsonb
WHERE name ILIKE '%Bedsheet%';

-- Curtains - Rajasthan
UPDATE products
SET origin_state = 'Rajasthan',
    variants = '[{"size":"9ft (Blackout)","price":"850","unit":"pair","description":"Premium Blackout"},{"size":"7ft (Semi-Blackout)","price":"650","unit":"pair","description":"Medium Grade"},{"size":"6ft (Sheer)","price":"450","unit":"pair","description":"Light Filter"}]'::jsonb
WHERE name ILIKE '%Curtain%';

-- Towels - Punjab
UPDATE products
SET origin_state = 'Punjab',
    variants = '[{"size":"Bath (700 GSM)","price":"280","unit":"piece","description":"Luxury Hotel Grade"},{"size":"Hand (500 GSM)","price":"180","unit":"piece","description":"Premium Home"},{"size":"Face (400 GSM)","price":"120","unit":"piece","description":"Standard"}]'::jsonb
WHERE name ILIKE '%Towel%';
