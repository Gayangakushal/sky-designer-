import { useQuery } from "@tanstack/react-query";
import { fetchAdminPosts, fetchBlogCategories, fetchPostBySlug, fetchPublishedPosts } from "@/lib/blog-api";

export const usePublishedPosts = () =>
  useQuery({ queryKey: ["blog", "published"], queryFn: () => fetchPublishedPosts().then((data) => data.posts) });

export const useBlogPost = (slug: string) =>
  useQuery({ queryKey: ["blog", "post", slug], queryFn: () => fetchPostBySlug(slug).then((data) => data.post), enabled: Boolean(slug), retry: (count, error) => !("status" in error && error.status === 404) && count < 2 });

export const useBlogCategories = () =>
  useQuery({ queryKey: ["blog", "categories"], queryFn: () => fetchBlogCategories().then((data) => data.categories), staleTime: 5 * 60 * 1000 });

export const useAdminBlogPosts = (enabled = true) =>
  useQuery({ queryKey: ["blog", "admin"], queryFn: fetchAdminPosts, enabled });
