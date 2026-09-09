/**
 * Centralized site configuration and canonical base URL resolution.
 *
 * Priority order:
 * 1. NEXT_PUBLIC_SITE_URL environment variable (set in .env.local or Vercel dashboard)
 * 2. NEXT_PUBLIC_VERCEL_URL or VERCEL_URL (injected automatically by Vercel for preview/prod)
 * 3. Default fallback for local development or production default
 */
export const getSiteUrl = (): string => {
  const customUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (customUrl && customUrl.trim().length > 0) {
    return customUrl.trim().replace(/\/+$/, "");
  }

  const vercelPublicUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelPublicUrl && vercelPublicUrl.trim().length > 0) {
    return `https://${vercelPublicUrl.trim().replace(/\/+$/, "")}`;
  }

  const vercelSystemUrl = process.env.VERCEL_URL;
  if (vercelSystemUrl && vercelSystemUrl.trim().length > 0) {
    return `https://${vercelSystemUrl.trim().replace(/\/+$/, "")}`;
  }

  return "https://mayer-doya-fruits.vercel.app";
};

export const SITE_URL = getSiteUrl();
