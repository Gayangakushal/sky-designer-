export type BlogStatus = "draft" | "published";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

export interface BlogPost {
  id: number;
  category_id: number;
  category?: BlogCategory | null;
  category_name?: string | null;
  category_slug?: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_name: string | null;
  status: BlogStatus;
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostListResponse {
  success: boolean;
  posts: BlogPost[];
  message?: string;
}

export interface BlogPostResponse {
  success: boolean;
  post: BlogPost;
  message?: string;
}

export interface BlogCategoriesResponse {
  success: boolean;
  categories: BlogCategory[];
  message?: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  category_id: number;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  status: BlogStatus;
  is_featured: boolean;
  seo_title: string;
  seo_description: string;
  published_at: string | null;
}
