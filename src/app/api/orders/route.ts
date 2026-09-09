import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { CartItem } from "@/types";

export const dynamic = "force-dynamic";

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

    if (isSupabaseConfigured && supabase) {
      // 1. Find or create customer
      let customerId: string;
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", phone)
        .single();

      if (existingCustomer) {
        customerId = existingCustomer.id;
        // Update name/address if changed
        await supabase
          .from("customers")
          .update({ name, address })
          .eq("id", customerId);
      } else {
        const { data: newCustomer, error: custErr } = await supabase
          .from("customers")
          .insert({ name, phone, address })
          .select("id")
          .single();

        if (custErr) throw custErr;
        customerId = newCustomer.id;
      }

      // 2. Insert order
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          customer_id: customerId,
          total_amount: totalAmount,
          status: "pending",
        })
        .select("id")
        .single();

      if (orderErr) throw orderErr;

      // 3. Insert order items
      const orderItems = items.map((item: CartItem) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_order: item.product.price,
      }));

      const { error: itemsErr } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsErr) {
        console.warn("Error inserting order items:", itemsErr);
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
        customerId,
      });
    }

    // Fallback if Supabase credentials are not yet wired:
    const mockOrderId = `MDF-${Math.floor(10000 + Math.random() * 90000)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      note: "Order created successfully (Demo mode)",
    });
  } catch (error: unknown) {
    console.error("Order processing error:", error);
    const mockOrderId = `MDF-${Math.floor(10000 + Math.random() * 90000)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      error: error instanceof Error ? error.message : "Internal error",
    });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        orders: [],
        note: "Supabase not configured",
      });
    }

    let query = supabase
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
      const { data: customer } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", phone)
        .single();

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
