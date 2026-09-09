import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Validates the Authorization Bearer JWT token from an incoming API request.
 * Returns the authenticated user or null if unauthenticated.
 */
export async function getAuthenticatedAdmin(req: Request) {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;

  const client = supabaseAdmin || supabase;
  if (isSupabaseConfigured && client) {
    try {
      const {
        data: { user },
        error,
      } = await client.auth.getUser(token);

      if (!error && user) {
        return user;
      }
    } catch (err) {
      console.warn("Token verification failed:", err);
    }
  }

  return null;
}
