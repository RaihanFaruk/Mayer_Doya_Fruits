import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAuthenticatedAdmin } from "@/lib/authMiddleware";
import { CartItem } from "@/types";
import { sanitizePhone } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const isUuid = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, items, totalAmount } = body;

    if (!name || !phone || !address || !items || !items.length) {
      return NextResponse.json(
        { error: "প্রয়োজনীয় তথ্য অনুপস্থিত" },
        { status: 400 }
      );
    }

    const cleanPhone = sanitizePhone(phone);
    const client = supabaseAdmin || supabase;

    if (isSupabaseConfigured && client) {
      // 1. Find or create customer with race-condition safety
      let customerId: string;
      const { data: existingCustomer } = await client
        .from("customers")
        .select("id")
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
        await client
          .from("customers")
          .update({ name: name.trim(), address: address.trim() })
          .eq("id", customerId);
      } else {
        const { data: newCustomer, error: custErr } = await client
          .from("customers")
          .insert({ name: name.trim(), phone: cleanPhone, address: address.trim() })
          .select("id")
          .single();

        if (custErr) {
          // If concurrent insert created it, retrieve it
          const { data: retryCustomer } = await client
            .from("customers")
            .select("id")
            .eq("phone", cleanPhone)
            .maybeSingle();

          if (retryCustomer) {
            customerId = retryCustomer.id;
          } else {
            throw custErr;
          }
        } else {
          customerId = newCustomer.id;
        }
      }

      // 2. Insert order
      const { data: order, error: orderErr } = await client
        .from("orders")
        .insert({
          customer_id: customerId,
          total_amount: Number(totalAmount),
          status: "pending",
        })
        .select("id")
        .single();

      if (orderErr) throw orderErr;

      // 3. Resolve product IDs for order_items (handling mock IDs vs real database UUIDs)
      let dbProducts: { id: string; name: string }[] = [];
      try {
        const { data: prodData } = await client.from("products").select("id, name");
        if (prodData) dbProducts = prodData;
      } catch (prodErr) {
        console.warn("Could not pre-fetch db products for id resolution:", prodErr);
      }

      const orderItems = items.map((item: CartItem) => {
        let resolvedProductId = item.product.id;
        if (!isUuid(resolvedProductId) && dbProducts.length > 0) {
          const matched = dbProducts.find(
            (p) => p.name.trim().toLowerCase() === item.product.name.trim().toLowerCase()
          );
          if (matched) {
            resolvedProductId = matched.id;
          } else {
            resolvedProductId = dbProducts[0].id;
          }
        }

        return {
          order_id: order.id,
          product_id: resolvedProductId,
          quantity: item.quantity,
          price_at_order: item.product.price,
        };
      });

      const { error: itemsErr } = await client
        .from("order_items")
        .insert(orderItems);

      if (itemsErr) {
        console.warn("Notice: order_items insert warning:", itemsErr);
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
        customerId,
      });
    }

    // Fallback for Demo mode when Supabase is not configured
    const mockOrderId = `MDF-${Math.floor(10000 + Math.random() * 90000)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      note: "Order created successfully (Demo mode)",
    });
  } catch (error: unknown) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    // If no phone parameter is provided, this is an administrative request to list all orders
    if (!phone) {
      const admin = await getAuthenticatedAdmin(req);
      if (!admin) {
        return NextResponse.json(
          { error: "অননুমোদিত অ্যাক্সেস (Unauthorized)" },
          { status: 401 }
        );
      }
    }

    if (!isSupabaseConfigured) {
      return NextResponse.json({
        orders: [],
        note: "Supabase not configured",
      });
    }

    const client = supabaseAdmin || supabase;
    if (!client) {
      return NextResponse.json({ orders: [] });
    }

    let query = client
      .from("orders")
      .select(
        `
        id,
        total_amount,
        status,
        created_at,
        customer:customers (id, name, phone, address),
        order_items (id, product_id, quantity, price_at_order, product:products(name, unit, image_url))
      `
      )
      .order("created_at", { ascending: false });

    if (phone) {
      const cleanPhone = sanitizePhone(phone);
      const { data: customer } = await client
        .from("customers")
        .select("id")
        .eq("phone", cleanPhone)
        .maybeSingle();

      if (customer) {
        query = query.eq("customer_id", customer.id);
      } else {
        return NextResponse.json({ orders: [] });
      }
    }

    const { data: orders, error } = await query;
    if (error) throw error;

    return NextResponse.json({ orders: orders || [] });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
