import { supabase } from "@/integrations/supabase/client";

export const BLOG_IMAGE_BUCKET = "blog-images";
export const MAX_BLOG_IMAGE_BYTES = 5 * 1024 * 1024;
export const BLOG_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const BLOG_IMAGE_ACCEPT = BLOG_IMAGE_TYPES.join(",");
export const BLOG_IMAGE_SIGNED_URL_TTL = 60 * 60;

const LEGACY_PUBLIC_MARKER = `/storage/v1/object/public/${BLOG_IMAGE_BUCKET}/`;
const LEGACY_SIGNED_MARKER = `/storage/v1/object/sign/${BLOG_IMAGE_BUCKET}/`;
const signedUrlCache = new Map<string, { url: string; expiresAt: number }>();

const extensions: Record<(typeof BLOG_IMAGE_TYPES)[number], string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function validateBlogImage(file: File): string | null {
  if (!BLOG_IMAGE_TYPES.includes(file.type as (typeof BLOG_IMAGE_TYPES)[number])) {
    return "Choose a JPG, PNG, or WebP image.";
  }
  if (file.size > MAX_BLOG_IMAGE_BYTES) {
    return "The featured image must be 5 MB or smaller.";
  }
  return null;
}

/** Uploads an admin-selected image and returns its stable path inside the private bucket. */
export async function uploadBlogImage(file: File): Promise<string> {
  const validationError = validateBlogImage(file);
  if (validationError) throw new Error(validationError);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error("Your admin session has expired. Please sign in again.");

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const extension = extensions[file.type as (typeof BLOG_IMAGE_TYPES)[number]];
  const path = `blog/${year}/${month}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(BLOG_IMAGE_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return path;
}

/**
 * Returns a bucket path for private images, including URLs saved by the former
 * public-bucket implementation. Normal external URLs deliberately return null.
 */
export function getBlogImageStoragePath(value: string | null | undefined): string | null {
  const image = value?.trim();
  if (!image) return null;

  for (const marker of [LEGACY_PUBLIC_MARKER, LEGACY_SIGNED_MARKER]) {
    const markerIndex = image.indexOf(marker);
    if (markerIndex >= 0) {
      const encodedPath = image.slice(markerIndex + marker.length).split("?")[0];
      try {
        return decodeURIComponent(encodedPath);
      } catch {
        return encodedPath;
      }
    }
  }

  if (/^https?:\/\//i.test(image)) return null;
  return image.replace(/^\/+/, "").replace(new RegExp(`^${BLOG_IMAGE_BUCKET}/`), "");
}

export function getExternalBlogImageUrl(value: string | null | undefined): string | null {
  const image = value?.trim();
  return image && /^https?:\/\//i.test(image) && !getBlogImageStoragePath(image) ? image : null;
}

/** Resolves private storage paths to cached signed URLs. */
export async function resolveBlogImageUrl(
  value: string | null | undefined,
): Promise<string | null> {
  const externalUrl = getExternalBlogImageUrl(value);
  if (externalUrl) return externalUrl;

  const path = getBlogImageStoragePath(value);
  if (!path) return null;
  const cached = signedUrlCache.get(path);
  if (cached && cached.expiresAt > Date.now()) return cached.url;

  const { data, error } = await supabase.storage
    .from(BLOG_IMAGE_BUCKET)
    .createSignedUrl(path, BLOG_IMAGE_SIGNED_URL_TTL);
  if (error || !data?.signedUrl) {
    console.warn(`[Blog images] Could not sign ${path}:`, error?.message ?? "No URL returned");
    return null;
  }

  signedUrlCache.set(path, {
    url: data.signedUrl,
    expiresAt: Date.now() + (BLOG_IMAGE_SIGNED_URL_TTL - 15 * 60) * 1000,
  });
  return data.signedUrl;
}
