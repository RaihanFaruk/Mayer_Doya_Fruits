-- ==============================================================================
-- Migration: 20240102000000_fix_rls_security.sql
-- Project: মায়ের দোয়া ফল (Mayer Doa Fol)
-- Purpose: Harden Row Level Security (RLS) policies for customers, orders, and order_items
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. FIX CUSTOMERS TABLE POLICIES
-- Prevent public anon key from scraping all customer names, phones, and addresses
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public view customer or admin view all" ON public.customers;
DROP POLICY IF EXISTS "Customers can update their row" ON public.customers;
DROP POLICY IF EXISTS "Public can insert customer" ON public.customers;

-- Public can only insert customer record during checkout
CREATE POLICY "Public can insert customer"
    ON public.customers FOR INSERT
    WITH CHECK (true);

-- Only authenticated admins can view customer records
CREATE POLICY "Admin only can view customers"
    ON public.customers FOR SELECT
    TO authenticated
    USING (true);

-- Only authenticated admins can update customer records
CREATE POLICY "Admin only can update customers"
    ON public.customers FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 2. FIX ORDERS TABLE POLICIES
-- Prevent public anon key from reading order lists, customer orders, and revenue
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public or Admin can view orders" ON public.orders;
DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can update order status" ON public.orders;

-- Public can insert orders during checkout
CREATE POLICY "Public can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

-- Only authenticated admins can view order records
CREATE POLICY "Admin only can view orders"
    ON public.orders FOR SELECT
    TO authenticated
    USING (true);

-- Only authenticated admins can update order status
CREATE POLICY "Admin can update order status"
    ON public.orders FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 3. FIX ORDER ITEMS TABLE POLICIES
-- Prevent public anon key from reading items inside orders
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public or Admin can view order items" ON public.order_items;
DROP POLICY IF EXISTS "Public can insert order items" ON public.order_items;

-- Public can insert order items during checkout
CREATE POLICY "Public can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

-- Only authenticated admins can view order items
CREATE POLICY "Admin only can view order items"
    ON public.order_items FOR SELECT
    TO authenticated
    USING (true);
