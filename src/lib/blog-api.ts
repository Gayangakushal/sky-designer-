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

const serverBlogApiUrl =
  typeof process !== "undefined"
    ? process.env.BLOG_API_URL || process.env.VITE_BLOG_API_URL
    : undefined;

export const BLOG_API_URL = (
  serverBlogApiUrl || import.meta.env.VITE_BLOG_API_URL || "https://api.skydesigners.lk/blog"
).replace(/\/$/, "");

type JsonObject = Record<string, unknown>;

export class BlogApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public confirmedNotFound = false,
  ) {
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

export function normalizeBlogPost(value: unknown, fallbackStatus: BlogStatus = "draft"): BlogPost {
  const post = asObject(value);
  const nestedCategory = post.category ? normalizeCategory(post.category) : null;
  const rawStatus = asString(post.status).toLowerCase();
  const status: BlogStatus =
    rawStatus === "published" || rawStatus === "scheduled" || rawStatus === "draft"
      ? rawStatus
      : fallbackStatus;
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
    scheduled_at: asNullableString(post.scheduled_at),
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
    // An HTML/error-page 404 is not proof that a blog slug is unpublished.
    throw new BlogApiError("The blog service returned an invalid response.", 502);
  }
  if (!response.ok || payload.success === false) {
    const confirmedNotFound = response.status === 404 && payload.success === false;
    throw new BlogApiError(
      asString(payload.message, "The blog service could not complete the request."),
      confirmedNotFound ? 404 : response.status || 502,
      confirmedNotFound,
    );
  }
  return payload;
}

export async function fetchPublishedPosts(): Promise<BlogPostListResponse> {
  const payload = await requestJson("posts.php");
  const posts = Array.isArray(payload.posts)
    ? payload.posts.map((post) => normalizeBlogPost(post, "published"))
    : [];
  return { success: true, posts };
}

export async function fetchBlogCategories(): Promise<BlogCategoriesResponse> {
  const payload = await requestJson("categories.php");
  const categories = Array.isArray(payload.categories)
    ? payload.categories.map(normalizeCategory)
    : [];
  return { success: true, categories };
}

export async function fetchPostBySlug(slug: string): Promise<BlogPostResponse> {
  const payload = await requestJson(`post.php?slug=${encodeURIComponent(slug)}`);
  const rawPost = asObject(payload.post);
  if (!asString(rawPost.slug) || !asString(rawPost.title)) {
    throw new BlogApiError("The blog service returned an incomplete post.", 502);
  }
  // A successful response from this public endpoint is itself confirmation that
  // the record is published; the PHP response does not include a status field.
  return { success: true, post: normalizeBlogPost(rawPost, "published") };
}

async function adminRequest(path: string, init?: RequestInit): Promise<JsonObject> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token)
    throw new BlogApiError("Your admin session has expired. Please sign in again.", 401);
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
  return Array.isArray(payload.posts) ? payload.posts.map((post) => normalizeBlogPost(post)) : [];
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const payload = await adminRequest("create.php", { method: "POST", body: JSON.stringify(input) });
  return normalizeBlogPost(payload.post);
}

export async function updateBlogPost(id: number, input: BlogPostInput): Promise<BlogPost> {
  const payload = await adminRequest("update.php", {
    method: "PATCH",
    body: JSON.stringify({ id, ...input }),
  });
  return normalizeBlogPost(payload.post);
}

export async function deleteBlogPost(id: number): Promise<void> {
  await adminRequest("delete.php", { method: "DELETE", body: JSON.stringify({ id }) });
}

export const getPostCategoryName = (post: BlogPost) =>
  post.category?.name || post.category_name || "Insights";

export const formatBlogDate = (date: string | null | undefined) => {
  if (!date) return "Not published";
  const parsed = new Date(date.replace(" ", "T"));
  return Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(
        parsed,
      );
};

export const sanitizeBlogHtml = (html: string) => {
  // The page title is the article's only H1. Content entered with H1 tags is
  // demoted so authored sections start at H2 and keep a logical hierarchy.
  const normalizedHeadings = html
    .replace(/<h1(\s[^>]*)?>/gi, (_match, attributes = "") => `<h2${attributes}>`)
    .replace(/<\/h1>/gi, "</h2>");
  if (typeof window === "undefined") return normalizedHeadings;
  const documentNode = new DOMParser().parseFromString(normalizedHeadings, "text/html");
  documentNode
    .querySelectorAll("script, style, iframe, object, embed, form")
    .forEach((node) => node.remove());
  documentNode.querySelectorAll("*").forEach((node) => {
    for (const attribute of Array.from(node.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      if (
        name === "style" ||
        name.startsWith("on") ||
        ((name === "href" || name === "src") && value.startsWith("javascript:"))
      ) {
        node.removeAttribute(attribute.name);
      }
    }
  });
  return documentNode.body.innerHTML;
};
