import { queryOptions, useQuery } from "@tanstack/react-query";
import {
  fetchAllCategories,
  fetchAllPosts,
  fetchCategories,
  fetchPublishedPostBySlug,
  fetchPublishedPosts,
} from "@/lib/content";

export const contentCategoriesQuery = () =>
  queryOptions({ queryKey: ["content_categories"], queryFn: fetchCategories, staleTime: 60_000 });

export const publishedContentPostsQuery = (limit?: number) =>
  queryOptions({ queryKey: ["content_posts", "published", limit ?? "all"], queryFn: () => fetchPublishedPosts(limit ? { limit } : {}), staleTime: 30_000, refetchInterval: 60_000, refetchOnWindowFocus: true });

export const publishedContentPostQuery = (slug: string) =>
  queryOptions({ queryKey: ["content_posts", "published", "slug", slug], queryFn: () => fetchPublishedPostBySlug(slug), staleTime: 30_000, refetchInterval: 60_000, refetchOnWindowFocus: true });

export const useContentCategories = () => useQuery(contentCategoriesQuery());

export const usePublishedPosts = (limit?: number) =>
  useQuery(publishedContentPostsQuery(limit));

export const usePublishedPost = (slug: string | undefined) =>
  useQuery({ ...publishedContentPostQuery(slug ?? ""), enabled: Boolean(slug) });

export const useAdminPosts = (enabled = true) =>
  useQuery({ queryKey: ["content_posts", "admin"], queryFn: fetchAllPosts, enabled });

export const useAdminCategories = (enabled = true) =>
  useQuery({ queryKey: ["content_categories", "admin"], queryFn: fetchAllCategories, enabled });
