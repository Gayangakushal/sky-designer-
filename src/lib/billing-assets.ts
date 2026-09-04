const BILLING_ASSET_BASE_URL = (
  import.meta.env.VITE_BILLING_API_URL || "https://api.skydesigners.lk/billing"
).replace(/\/$/, "");

export function resolveBillingAssetUrl(path?: string | null): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${BILLING_ASSET_BASE_URL}/${path.replace(/^\/+/, "")}`;
}