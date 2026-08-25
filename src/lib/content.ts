import { supabase } from "@/integrations/supabase/client";

export const POST_TYPES = ["image", "video", "youtube", "carousel", "project"] as const;
export const POST_STATUSES = ["draft", "published", "archived"] as const;

export type PostType = (typeof POST_TYPES)[number];
export type PostStatus = (typeof POST_STATUSES)[number];

export const POST_TYPE_LABELS: Record<PostType, string> = {
  image: "Image Post",
  video: "Video / Reel",
  youtube: "YouTube Video",
  carousel: "Carousel",
  project: "Project",
};

export const CONTENT_BUCKET = "content-media";

export interface ContentCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

export interface ContentMedia {
  id: string;
  post_id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string | null;
  alt_text: string | null;
  sort_order: number;
}

export interface ContentPost {
  id: string;
  title: string;
  slug: string;
  post_type: PostType;
  excerpt: string | null;
  content: string | null;
  category_id: string | null;
  cover_image_url: string | null;
  video_url: string | null;
  youtube_url: string | null;
  youtube_video_id: string | null;
  client_name: string | null;
  services: string[];
  external_url: string | null;
  status: PostStatus;
  is_featured: boolean;
  sort_order: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Pick<ContentCategory, "id" | "name" | "slug"> | null;
  media?: ContentMedia[];
}

const POST_SELECT =
  "*, category:content_categories(id,name,slug), media:content_post_media(id,post_id,media_type,media_url,thumbnail_url,alt_text,sort_order)";

const sortMedia = (posts: ContentPost[]) =>
  posts.map((post) => ({
    ...post,
    media: [...(post.media ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }));

/* ---------------------------------- utils --------------------------------- */

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

/** Extracts the video id from any common YouTube URL shape. */
export const parseYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/(?:embed|v|shorts|live)\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return /^[\w-]{11}$/.test(url.trim()) ? url.trim() : null;
};

export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const youtubeEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;

/** Best available preview image for a card. */
export const postPreviewImage = (post: ContentPost): string | null => {
  if (post.cover_image_url) return post.cover_image_url;
  if (post.post_type === "youtube" && post.youtube_video_id) return youtubeThumbnail(post.youtube_video_id);
  const firstImage = (post.media ?? []).find((m) => m.media_type === "image");
  return firstImage?.media_url ?? (post.media ?? [])[0]?.thumbnail_url ?? null;
};

export const postDate = (post: ContentPost) => post.published_at ?? post.created_at;

/* ------------------------------- public reads ------------------------------ */

export const fetchCategories = async (): Promise<ContentCategory[]> => {
  const { data, error } = await supabase
    .from("content_categories")
    .select("id,name,slug,sort_order,is_active")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as ContentCategory[];
};

export const fetchPublishedPosts = async (options: { categorySlug?: string; limit?: number } = {}) => {
  let query = supabase
    .from("content_posts")
    .select(POST_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .order("sort_order", { ascending: true });
  if (options.limit) query = query.limit(options.limit);
  const { data, error } = await query;
  if (error) throw error;
  let posts = sortMedia((data ?? []) as unknown as ContentPost[]);
  if (options.categorySlug && options.categorySlug !== "all") {
    posts = posts.filter((post) => post.category?.slug === options.categorySlug);
  }
  return posts;
};

export const fetchPublishedPostBySlug = async (slug: string): Promise<ContentPost | null> => {
  const { data, error } = await supabase
    .from("content_posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return sortMedia([data as unknown as ContentPost])[0] ?? null;
};

/* ------------------------------- admin reads ------------------------------ */

export const fetchAllPosts = async (): Promise<ContentPost[]> => {
  const { data, error } = await supabase
    .from("content_posts")
    .select(POST_SELECT)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return sortMedia((data ?? []) as unknown as ContentPost[]);
};

export const fetchAllCategories = async (): Promise<ContentCategory[]> => {
  const { data, error } = await supabase
    .from("content_categories")
    .select("id,name,slug,sort_order,is_active")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as ContentCategory[];
};

/* ------------------------------ admin writes ------------------------------ */

export interface PostInput {
  title: string;
  slug: string;
  post_type: PostType;
  excerpt: string | null;
  content: string | null;
  category_id: string | null;
  cover_image_url: string | null;
  video_url: string | null;
  youtube_url: string | null;
  youtube_video_id: string | null;
  client_name: string | null;
  services: string[];
  external_url: string | null;
  status: PostStatus;
  is_featured: boolean;
  published_at: string | null;
}

export const createPost = async (input: PostInput): Promise<ContentPost> => {
  const { data, error } = await supabase.from("content_posts").insert(input).select("id").single();
  if (error) throw error;
  return data as unknown as ContentPost;
};

export const updatePost = async (id: string, input: Partial<PostInput>) => {
  const { error } = await supabase.from("content_posts").update(input).eq("id", id);
  if (error) throw error;
};

export const deletePost = async (post: ContentPost) => {
  const paths = [...(post.media ?? []).map((m) => storagePathFromUrl(m.media_url)), storagePathFromUrl(post.cover_image_url)]
    .filter((p): p is string => Boolean(p));
  if (paths.length) await supabase.storage.from(CONTENT_BUCKET).remove(paths);
  const { error } = await supabase.from("content_posts").delete().eq("id", post.id);
  if (error) throw error;
};

export interface MediaInput {
  media_type: string;
  media_url: string;
  thumbnail_url?: string | null;
  alt_text?: string | null;
  sort_order: number;
}

export const replacePostMedia = async (postId: string, items: MediaInput[]) => {
  const { error: deleteError } = await supabase.from("content_post_media").delete().eq("post_id", postId);
  if (deleteError) throw deleteError;
  if (!items.length) return;
  const { error } = await supabase
    .from("content_post_media")
    .insert(items.map((item, index) => ({ ...item, post_id: postId, sort_order: item.sort_order ?? index })));
  if (error) throw error;
};

const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;

/** Uploads a file to the private content bucket and returns a long-lived link. */
export const uploadContentFile = async (file: File): Promise<{ url: string; path: string }> => {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(CONTENT_BUCKET).upload(path, file, { cacheControl: "3600" });
  if (error) throw error;
  const { data, error: signError } = await supabase.storage.from(CONTENT_BUCKET).createSignedUrl(path, SIGNED_URL_TTL);
  if (signError) throw signError;
  return { url: data?.signedUrl ?? "", path };
};

/** Recovers the object path from a stored signed URL so files can be cleaned up. */
export const storagePathFromUrl = (url: string | null): string | null => {
  if (!url) return null;
  const marker = `/${CONTENT_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length).split("?")[0] ?? null;
};

export const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/jpg,image/png,image/webp";
export const ACCEPTED_VIDEO_TYPES = "video/mp4,video/webm,video/quicktime";
