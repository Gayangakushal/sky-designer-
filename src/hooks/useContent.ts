import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCategories,
  fetchAllPosts,
  fetchCategories,
  fetchPublishedPostBySlug,
  fetchPublishedPosts,
} from "@/lib/content";

export const useContentCategories = () =>
  useQuery({ queryKey: ["content_categories"], queryFn: fetchCategories, staleTime: 60_000 });

export const usePublishedPosts = (limit?: number) =>
  useQuery({
    queryKey: ["content_posts", "published", limit ?? "all"],
    queryFn: () => fetchPublishedPosts(limit ? { limit } : {}),
    staleTime: 30_000,
  });

export const usePublishedPost = (slug: string | undefined) =>
  useQuery({
    queryKey: ["content_posts", "published", "slug", slug],
    queryFn: () => fetchPublishedPostBySlug(slug as string),
    enabled: Boolean(slug),
  });

export const useAdminPosts = (enabled = true) =>
  useQuery({ queryKey: ["content_posts", "admin"], queryFn: fetchAllPosts, enabled });

export const useAdminCategories = (enabled = true) =>
  useQuery({ queryKey: ["content_categories", "admin"], queryFn: fetchAllCategories, enabled });