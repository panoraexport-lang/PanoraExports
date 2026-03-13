-- =============================================================
-- Supabase RLS & Storage Policies for Panora Exports
-- Run these in: https://supabase.com/dashboard/project/qzixmcsgqhkhvhtlbopv/sql
-- =============================================================

-- ─────────────────────────────────────────────
-- 1. PRODUCTS TABLE — Row Level Security
-- ─────────────────────────────────────────────

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public: anyone can read active products (for product catalog page)
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (is_active = true);

-- Admins: full insert access (via service role key on server, or JWT role check for client)
CREATE POLICY "Admins can insert products"
ON products FOR INSERT
WITH CHECK (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'role')::text = 'ADMIN'
);

-- Admins: full update access
CREATE POLICY "Admins can update products"
ON products FOR UPDATE
USING (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'role')::text = 'ADMIN'
);

-- Admins: full delete access
CREATE POLICY "Admins can delete products"
ON products FOR DELETE
USING (
    auth.role() = 'service_role'
    OR (auth.jwt() ->> 'role')::text = 'ADMIN'
);


-- ─────────────────────────────────────────────
-- 2. STORAGE — Create product-images bucket
-- ─────────────────────────────────────────────

-- Create the bucket (safe to run even if it already exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    5242880,  -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
SET public = true;


-- ─────────────────────────────────────────────
-- 3. STORAGE POLICIES — product-images bucket
-- ─────────────────────────────────────────────

-- Public read: anyone can view product images
CREATE POLICY "Public read product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Authenticated upload: logged-in users can upload
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() IN ('authenticated', 'service_role')
);

-- Allow update (for upsert)
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'product-images'
    AND auth.role() IN ('authenticated', 'service_role')
);

-- Allow delete (for cleanup)
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'product-images'
    AND auth.role() IN ('authenticated', 'service_role')
);
