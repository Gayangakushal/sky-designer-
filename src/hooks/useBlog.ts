import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchAdminPosts, fetchBlogCategories, fetchPostBySlug, fetchPublishedPosts } from "@/lib/blog-api";

export const publishedBlogPostsQuery = () =>
  queryOptions({ queryKey: ["blog", "published"], queryFn: () => fetchPublishedPosts().then((data) => data.posts), staleTime: 30_000, refetchInterval: 60_000, refetchOnWindowFocus: true });

export const blogPostQuery = (slug: string) =>
  queryOptions({ queryKey: ["blog", "post", slug], queryFn: () => fetchPostBySlug(slug).then((data) => data.post), staleTime: 30_000, refetchInterval: 60_000, refetchOnWindowFocus: true });

export const usePublishedPosts = () => useQuery(publishedBlogPostsQuery());

export const useBlogPost = (slug: string) =>
  useQuery({ ...blogPostQuery(slug), enabled: Boolean(slug), retry: (count, error) => !(error instanceof Error && "confirmedNotFound" in error && error.confirmedNotFound === true) && count < 2 });

export const useBlogCategories = () =>
  useQuery({ queryKey: ["blog", "categories"], queryFn: () => fetchBlogCategories().then((data) => data.categories), staleTime: 5 * 60 * 1000 });

export const useAdminBlogPosts = (enabled = true) =>
  useQuery({ queryKey: ["blog", "admin"], queryFn: fetchAdminPosts, enabled });
