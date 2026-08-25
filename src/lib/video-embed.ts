export type VideoProvider = "youtube" | "google-drive";

export type ParsedVideoUrl = {
  provider: VideoProvider;
  id: string;
  originalUrl: string;
  embedUrl: string;
  thumbnailUrl: string | null;
};

export type VideoThumbnailOptions = {
  coverImageUrl?: string | null;
  videoUrl?: string | null;
  legacyYouTubeId?: string | null;
  fallbackImageUrl?: string | null;
};

const VALID_ID = /^[A-Za-z0-9_-]{6,200}$/;
const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]);

const validId = (value: string | null | undefined) => {
  const id = value?.trim() ?? "";
  return VALID_ID.test(id) ? id : null;
};

export const youtubeEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}`;
export const youtubeThumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const googleDriveEmbedUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

export const parseVideoUrl = (input: string | null | undefined): ParsedVideoUrl | null => {
  const originalUrl = input?.trim() ?? "";
  if (!originalUrl) return null;

  let url: URL;
  try {
    url = new URL(originalUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const hostname = url.hostname.toLowerCase();
  let provider: VideoProvider | null = null;
  let id: string | null = null;

  if (hostname === "youtu.be") {
    provider = "youtube";
    id = validId(url.pathname.split("/").filter(Boolean)[0]);
  } else if (YOUTUBE_HOSTS.has(hostname)) {
    provider = "youtube";
    if (url.pathname === "/watch") id = validId(url.searchParams.get("v"));
    else {
      const [kind, pathId] = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live", "v"].includes(kind ?? "")) id = validId(pathId);
    }
  } else if (hostname === "drive.google.com") {
    provider = "google-drive";
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts[0] === "file" && pathParts[1] === "d") id = validId(pathParts[2]);
    else if (pathParts[0] === "open") id = validId(url.searchParams.get("id"));
  }

  if (!provider || !id) return null;
  return {
    provider,
    id,
    originalUrl,
    embedUrl: provider === "youtube" ? youtubeEmbedUrl(id) : googleDriveEmbedUrl(id),
    thumbnailUrl: provider === "youtube" ? youtubeThumbnailUrl(id) : null,
  };
};

/** Resolves a preview without requesting an undocumented provider thumbnail. */
export const resolveVideoThumbnail = ({
  coverImageUrl,
  videoUrl,
  legacyYouTubeId,
  fallbackImageUrl,
}: VideoThumbnailOptions): string | null => {
  const customCover = coverImageUrl?.trim();
  if (customCover) return customCover;

  const parsedVideo = parseVideoUrl(videoUrl);
  if (parsedVideo?.provider === "youtube" && parsedVideo.thumbnailUrl) {
    return parsedVideo.thumbnailUrl;
  }

  const legacyId = validId(legacyYouTubeId);
  if (legacyId) return youtubeThumbnailUrl(legacyId);

  return fallbackImageUrl?.trim() || null;
};

export const videoProviderLabel = (provider: VideoProvider) =>
  provider === "youtube" ? "YouTube" : "Google Drive";

export const isSafeDirectVideoUrl = (input: string | null | undefined) => {
  const value = input?.trim() ?? "";
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};
