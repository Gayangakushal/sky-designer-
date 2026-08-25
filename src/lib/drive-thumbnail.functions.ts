import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { parseVideoUrl } from "@/lib/video-embed";

const inputSchema = z.object({
  driveUrl: z.string().url().max(2_048),
});

const CONTENT_BUCKET = "content-media";
const CACHE_FOLDER = "drive-thumbnails";
const MAX_THUMBNAIL_BYTES = 8 * 1024 * 1024;
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;
const allowedThumbnailHost = (hostname: string) =>
  hostname === "drive.google.com" ||
  hostname === "drive.usercontent.google.com" ||
  hostname.endsWith(".googleusercontent.com");

type ImageFormat = {
  extension: "jpg" | "png" | "webp";
  contentType: "image/jpeg" | "image/png" | "image/webp";
};

export type DriveThumbnailResult = {
  fileId: string;
  url: string | null;
  status: "available" | "unavailable";
};

const imageFormat = (bytes: Uint8Array): ImageFormat | null => {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { extension: "jpg", contentType: "image/jpeg" };
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return { extension: "png", contentType: "image/png" };
  }
  const signature = new TextDecoder().decode(bytes.slice(0, 12));
  if (signature.startsWith("RIFF") && signature.slice(8, 12) === "WEBP") {
    return { extension: "webp", contentType: "image/webp" };
  }
  return null;
};

export const cacheGoogleDriveThumbnail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data, context }): Promise<DriveThumbnailResult> => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _role: "admin",
      _user_id: context.userId,
    });
    if (roleError || !isAdmin) throw new Error("Unauthorized: Admin access required.");

    const suppliedUrl = new URL(data.driveUrl);
    const parsed = parseVideoUrl(data.driveUrl);
    if (suppliedUrl.protocol !== "https:" || parsed?.provider !== "google-drive") {
      throw new Error("Only verified drive.google.com video URLs are supported.");
    }

    const fileId = parsed.id;
    const folderFiles = await context.supabase.storage.from(CONTENT_BUCKET).list(CACHE_FOLDER, {
      limit: 3,
      search: `${fileId}.`,
    });
    const existing = folderFiles.data?.find((file) =>
      [`${fileId}.jpg`, `${fileId}.png`, `${fileId}.webp`].includes(file.name),
    );

    if (existing) {
      const path = `${CACHE_FOLDER}/${existing.name}`;
      const { data: signed } = await context.supabase.storage
        .from(CONTENT_BUCKET)
        .createSignedUrl(path, SIGNED_URL_TTL);
      if (signed?.signedUrl) return { fileId, url: signed.signedUrl, status: "available" };
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      let response: Response | null = null;
      try {
        const thumbnailUrl = new URL("https://drive.google.com/thumbnail");
        thumbnailUrl.searchParams.set("id", fileId);
        thumbnailUrl.searchParams.set("sz", "w1280");
        let requestUrl = thumbnailUrl;
        for (let redirectCount = 0; redirectCount < 4; redirectCount += 1) {
          const fetched = await fetch(requestUrl, {
            signal: controller.signal,
            redirect: "manual",
            headers: { Accept: "image/avif,image/webp,image/png,image/jpeg" },
          });
          if (fetched.status < 300 || fetched.status >= 400) {
            response = fetched;
            break;
          }
          const location = fetched.headers.get("location");
          if (!location) break;
          const nextUrl = new URL(location, requestUrl);
          if (nextUrl.protocol !== "https:" || !allowedThumbnailHost(nextUrl.hostname)) break;
          requestUrl = nextUrl;
        }
      } finally {
        clearTimeout(timeout);
      }

      if (!response?.ok) return { fileId, url: null, status: "unavailable" };
      const reportedLength = Number(response.headers.get("content-length") || 0);
      if (reportedLength > MAX_THUMBNAIL_BYTES) {
        return { fileId, url: null, status: "unavailable" };
      }

      const buffer = await response.arrayBuffer();
      if (buffer.byteLength === 0 || buffer.byteLength > MAX_THUMBNAIL_BYTES) {
        return { fileId, url: null, status: "unavailable" };
      }
      const format = imageFormat(new Uint8Array(buffer));
      if (!format) return { fileId, url: null, status: "unavailable" };

      const path = `${CACHE_FOLDER}/${fileId}.${format.extension}`;
      const { error: uploadError } = await context.supabase.storage
        .from(CONTENT_BUCKET)
        .upload(path, buffer, {
          contentType: format.contentType,
          cacheControl: "31536000",
          upsert: true,
        });
      if (uploadError) return { fileId, url: null, status: "unavailable" };

      const { data: signed, error: signError } = await context.supabase.storage
        .from(CONTENT_BUCKET)
        .createSignedUrl(path, SIGNED_URL_TTL);
      if (signError || !signed?.signedUrl) {
        return { fileId, url: null, status: "unavailable" };
      }
      return { fileId, url: signed.signedUrl, status: "available" };
    } catch {
      return { fileId, url: null, status: "unavailable" };
    }
  });
