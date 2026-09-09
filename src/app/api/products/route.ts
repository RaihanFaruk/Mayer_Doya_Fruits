import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { INITIAL_PRODUCTS } from "@/lib/initialData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ products: data });
      }
    }
    return NextResponse.json({ products: INITIAL_PRODUCTS });
  } catch (err: unknown) {
    console.error("Failed to fetch products, falling back to initial data:", err);
    return NextResponse.json({ products: INITIAL_PRODUCTS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, unit, image_url, stock, is_active } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name,
          price: Number(price),
          unit: unit || "প্রতি কেজি",
          image_url,
          stock: stock !== undefined ? Number(stock) : 50,
          is_active: is_active !== undefined ? is_active : true,
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ product: data });
    }

    return NextResponse.json({
      product: {
        id: `mock-${Date.now()}`,
        name,
        price: Number(price),
        unit: unit || "প্রতি কেজি",
        image_url,
        stock: Number(stock) || 50,
        is_active: is_active ?? true,
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ product: data });
    }

    return NextResponse.json({ success: true, updated: updates });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete product" },
      { status: 500 }
    );
  }
}
