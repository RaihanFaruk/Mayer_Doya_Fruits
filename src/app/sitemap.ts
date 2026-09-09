import { MetadataRoute } from "next";
import { INITIAL_PRODUCTS } from "@/lib/initialData";
import { CATEGORIES_DATA } from "@/lib/categories";
import { SITE_URL } from "@/lib/siteConfig";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Category Landing Pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES_DATA.map((cat) => ({
    url: `${baseUrl}/categories/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // Individual Product Pages (Fetch from Supabase if configured, merge with INITIAL_PRODUCTS)
  let productList = INITIAL_PRODUCTS;
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, created_at")
        .eq("is_active", true);

      if (!error && data && data.length > 0) {
        const productMap = new Map<string, { id: string }>();
        INITIAL_PRODUCTS.forEach((p) => productMap.set(p.id, { id: p.id }));
        data.forEach((p) => productMap.set(p.id, { id: p.id }));
        productList = Array.from(productMap.values()) as typeof INITIAL_PRODUCTS;
      }
    } catch (err) {
      console.warn("Sitemap: Falling back to initial product data", err);
    }
  }

  const productRoutes: MetadataRoute.Sitemap = productList.map((prod) => ({
    url: `${baseUrl}/products/${prod.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
