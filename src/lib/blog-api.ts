import { supabase } from "@/integrations/supabase/client";
import type {
  BlogCategoriesResponse,
  BlogCategory,
  BlogPost,
  BlogPostInput,
  BlogPostListResponse,
  BlogPostResponse,
  BlogStatus,
} from "@/types/blog";

export const BLOG_API_URL = (
  import.meta.env.VITE_BLOG_API_URL || "https://api.skydesigners.lk/blog"
).replace(/\/$/, "");

type JsonObject = Record<string, unknown>;

export class BlogApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "BlogApiError";
  }
}

const asObject = (value: unknown): JsonObject =>
  typeof value === "object" && value !== null ? (value as JsonObject) : {};
const asString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : value == null ? fallback : String(value);
const asNullableString = (value: unknown) => {
  const text = asString(value).trim();
  return text || null;
};
const asNumber = (value: unknown) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};
const asBoolean = (value: unknown) =>
  value === true || value === 1 || value === "1" || value === "true";

function normalizeCategory(value: unknown): BlogCategory {
  const category = asObject(value);
  return {
    id: asNumber(category.id),
    name: asString(category.name),
    slug: asString(category.slug),
    created_at: asNullableString(category.created_at) ?? undefined,
  };
}

export function normalizeBlogPost(value: unknown): BlogPost {
  const post = asObject(value);
  const nestedCategory = post.category ? normalizeCategory(post.category) : null;
  const status: BlogStatus = asString(post.status).toLowerCase() === "published" ? "published" : "draft";
  return {
    id: asNumber(post.id),
    category_id: asNumber(post.category_id ?? nestedCategory?.id),
    category: nestedCategory,
    category_name: asNullableString(post.category_name) ?? nestedCategory?.name ?? null,
    category_slug: asNullableString(post.category_slug) ?? nestedCategory?.slug ?? null,
    title: asString(post.title),
    slug: asString(post.slug),
    excerpt: asNullableString(post.excerpt),
    content: asString(post.content),
    featured_image: asNullableString(post.featured_image),
    author_name: asNullableString(post.author_name),
    status,
    is_featured: asBoolean(post.is_featured),
    seo_title: asNullableString(post.seo_title),
    seo_description: asNullableString(post.seo_description),
    published_at: asNullableString(post.published_at),
    created_at: asString(post.created_at),
    updated_at: asString(post.updated_at),
  };
}

async function requestJson(path: string, init?: RequestInit): Promise<JsonObject> {
  const response = await fetch(`${BLOG_API_URL}/${path}`, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });
  let payload: JsonObject = {};
  try {
    payload = asObject(await response.json());
  } catch {
    throw new BlogApiError("The blog service returned an invalid response.", response.status);
  }
  if (!response.ok || payload.success === false) {
    throw new BlogApiError(asString(payload.message, "The blog service could not complete the request."), response.status);
  }
  return payload;
}

export async function fetchPublishedPosts(): Promise<BlogPostListResponse> {
  const payload = await requestJson("posts.php");
  const posts = Array.isArray(payload.posts) ? payload.posts.map(normalizeBlogPost) : [];
  return { success: true, posts };
}

export async function fetchBlogCategories(): Promise<BlogCategoriesResponse> {
  const payload = await requestJson("categories.php");
  const categories = Array.isArray(payload.categories) ? payload.categories.map(normalizeCategory) : [];
  return { success: true, categories };
}

export async function fetchPostBySlug(slug: string): Promise<BlogPostResponse> {
  const payload = await requestJson(`post.php?slug=${encodeURIComponent(slug)}`);
  return { success: true, post: normalizeBlogPost(payload.post) };
}

async function adminRequest(path: string, init?: RequestInit): Promise<JsonObject> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new BlogApiError("Your admin session has expired. Please sign in again.", 401);
  return requestJson(`admin/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...init?.headers,
    },
  });
}

export async function fetchAdminPosts(): Promise<BlogPost[]> {
  const payload = await adminRequest("posts.php");
  return Array.isArray(payload.posts) ? payload.posts.map(normalizeBlogPost) : [];
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const payload = await adminRequest("create.php", { method: "POST", body: JSON.stringify(input) });
  return normalizeBlogPost(payload.post);
}

export async function updateBlogPost(id: number, input: BlogPostInput): Promise<BlogPost> {
  const payload = await adminRequest("update.php", { method: "PATCH", body: JSON.stringify({ id, ...input }) });
  return normalizeBlogPost(payload.post);
}

export async function deleteBlogPost(id: number): Promise<void> {
  await adminRequest("delete.php", { method: "DELETE", body: JSON.stringify({ id }) });
}

export const getPostCategoryName = (post: BlogPost) =>
  post.category?.name || post.category_name || "Insights";

export const getBlogImageUrl = (image: string | null) => {
  if (!image) return null;
  if (/^https?:\/\//i.test(image)) return image;
  return `${BLOG_API_URL}/${image.replace(/^\//, "")}`;
};

export const formatBlogDate = (date: string | null | undefined) => {
  if (!date) return "Not published";
  const parsed = new Date(date.replace(" ", "T"));
  return Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(parsed);
};

export const sanitizeBlogHtml = (html: string) => {
  if (typeof window === "undefined") return html;
  const documentNode = new DOMParser().parseFromString(html, "text/html");
  documentNode.querySelectorAll("script, style, iframe, object, embed, form").forEach((node) => node.remove());
  documentNode.querySelectorAll("*").forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      if (name === "style" || name.startsWith("on") || ((name === "href" || name === "src") && value.startsWith("javascript:"))) {
        node.removeAttribute(attribute.name);
      }
    }
  });
  return documentNode.body.innerHTML;
};
