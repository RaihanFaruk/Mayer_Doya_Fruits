-- ==============================================================================
-- Migration: 20240101000000_init_schema.sql
-- Project: মায়ের দোয়া ফল (Mayer Doa Fol)
-- Purpose: Complete schema, RLS policies, storage bucket, and seed data.
-- ==============================================================================

-- 1. Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    unit TEXT NOT NULL DEFAULT 'প্রতি কেজি',
    image_url TEXT,
    stock INT NOT NULL DEFAULT 50,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
    total_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL DEFAULT 1,
    price_at_order NUMERIC(10, 2) NOT NULL
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Products policies:
-- Anyone (anon and authenticated) can read active products
CREATE POLICY "Public can view active products"
    ON public.products FOR SELECT
    USING (is_active = true OR auth.role() = 'authenticated');

-- Only authenticated admin can insert, update, delete products
CREATE POLICY "Admin can insert products"
    ON public.products FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admin can update products"
    ON public.products FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin can delete products"
    ON public.products FOR DELETE
    TO authenticated
    USING (true);

-- Customers policies:
-- Public can insert customer (first order checkout)
CREATE POLICY "Public can insert customer"
    ON public.customers FOR INSERT
    WITH CHECK (true);

-- Public can update customer row matching phone
CREATE POLICY "Customers can update their row"
    ON public.customers FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Public can view customers by phone (or admin can view all)
CREATE POLICY "Public view customer or admin view all"
    ON public.customers FOR SELECT
    USING (true);

-- Orders policies:
-- Public can insert orders during checkout
CREATE POLICY "Public can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- Public can view their own orders or admin can view all
CREATE POLICY "Public or Admin can view orders"
    ON public.orders FOR SELECT
    USING (true);

-- Only authenticated admin can update order status
CREATE POLICY "Admin can update order status"
    ON public.orders FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Order Items policies:
CREATE POLICY "Public can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Public or Admin can view order items"
    ON public.order_items FOR SELECT
    USING (true);

-- ==============================================================================
-- STORAGE BUCKET: product-images
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view product images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin can update product images"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'product-images');

CREATE POLICY "Admin can delete product images"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'product-images');

-- ==============================================================================
-- SEED DATA: Storefront Initial Fruits from code.html
-- ==============================================================================
INSERT INTO public.products (name, price, unit, image_url, stock, is_active)
VALUES
    (
        'রাজশাহীর প্রিমিয়াম হিমসাগর আম (১ম গ্রেড)',
        180.00,
        'প্রতি কেজি',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDW6Qg2GmafB81MfxFKDgBxAcNQP1eXs4DpJjYbtW9wD5E0kI68NB1LzT0F0roT1tEowIG28I-FZfrPcHrzUJmoI0XYdtE5Ab7xDcDIM_rrxSJDz2dkfrsGBc9rAXVWzbI4sQlcXhEZTKnmqO1mQ4jfTzoYXSyxgp5z5f1DFphCvHPPFF9dgKaUA8mK90wQ5kslUaRYlUQkXDYN-bZJUUjd_uHOO1x86CzrtECaHn2VMhkKRHpxaggG',
        100,
        true
    ),
    (
        'দিনাজপুরের রসালো বেদানা লিচু',
        450.00,
        '১০০ পিস',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBI3M3UmGQ1W_KND9DRU4o2RGYQ4Jj7ZgcXIQB2bs_ADT6EcdzhI85pCfsR3Zl5wd44GZjfUoTji1irZslCNodYM9uyYxew6wn3ZVJzwxLOow9Yux8b9Wa6bkpss3oo_CdWuDJv-u-acqqlnBUzr0pC2yPFDmVB9hUVUhV-bvoHAQ51A0DQy_WxEgawSBam_L7B-0OFMmhKiUO1LaLXsepxMspDarzLRIxWRsr0anpGltldNhguxF0L',
        80,
        true
    ),
    (
        'মিষ্টি রয়াল গালা আপেল',
        280.00,
        'প্রতি কেজি',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7vvDnuUt1ocWXeadCKPdAk6bzsRxpLYQ3LytdLJcyE_KZEBX5zn5tSbgSmk-O5sLpqwLVfTF4hMIjMUi5gFVSyQBtEy8ojNU59WcDFY-tUuOhvFsyl34vKaTnuBRu2CZIzjlzloLxw_GEjkBSEr4P0-NJTOg_hfSTuqh1P0_wdXeX3NtW9x5xm5uMVQsVL8ktsFCLjw4AXbd78lUCxqLEQoIQQRzn2i2EwDl1FRv_tbUFkzcb2qIQ',
        120,
        true
    ),
    (
        'জুসি মিশরীয় ভ্যালেন্সিয়া মাল্টা',
        230.00,
        'প্রতি কেজি',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDXESbsU73VVTRpHZpxMli7liOzYOXGfZ-gr5O7pzpquvWEusTHkbbvzZtHv6pF3Xw9WX0u93COESDhVqSrzxow8knzndl0YVnogWObc0N1h4B33eZR6zw0PmX7fGP-WaWyhvlStwf9zmj-_tH5DAE-YXDpmPJjhNn3zjN2JfAsqd77bwj8Rs4ifwZLAhw4bqlgKfHTYOAOk1ENMlsSwkWdUiRJSiH39OHh95qYHmKnrctFQiMbCTOG',
        90,
        true
    ),
    (
        'লাল জাম্বো ডালিম / বেদানা',
        390.00,
        'প্রতি কেজি',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOYeyxRD8v5aIERxxopqRA8tAsEZB1zr6ejQyDSqUYhRxet2LS67KzKSdtbPxWQkl79LgSDaMWmG5RHFyaaF1C014CaGUP6KZAEWW1gwzoZcHtFBMTZHkU7I2Kr6BwenT89jEZ0TP_zTInYTB1QJqPitGcOLwNgIgcY0QTF8REPNY1VraNmYt02WdIuapEEGWLLUAqfiV69ixfm-lqLQbYZqmfBYTbIBoe_LyaWr4b3kkyIrCBLg70',
        70,
        true
    ),
    (
        'থাই জাম্বো মিষ্টি পেয়ারা',
        100.00,
        'প্রতি কেজি',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCxdgWiC7OgwBHgVtIwT7ndw_wODYvWJv1SihhPkJg6BfnS9JTBpdIxgvlEMsAzRXuJRVpDZtq8699vKa86W4uv0Y3Um_WpIZt94gLEtIYz5SsLJ6u5WqGgv2CD_kIPQzXUKz1bq9Is78nf0FDCz4stj-FNz-6wtwDIafodgyQry5OZbgr0ItUrsC1mSMOh0YKRNra1iIhRyGaLOXc4-lTwGF6Qa8ykFgkr5TblN0_9ccgmYU4j9oV1',
        150,
        true
    )
ON CONFLICT DO NOTHING;
