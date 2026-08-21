import { useQuery } from "@tanstack/react-query";
import {
  getBlogImageStoragePath,
  getExternalBlogImageUrl,
  resolveBlogImageUrl,
} from "@/lib/blog-images";

/** Cached resolver for external image URLs and private blog-images paths. */
export function useBlogImageUrl(value: string | null | undefined) {
  const externalUrl = getExternalBlogImageUrl(value);
  const storagePath = getBlogImageStoragePath(value);
  const query = useQuery({
    queryKey: ["blog-image-url", storagePath],
    queryFn: () => resolveBlogImageUrl(storagePath),
    enabled: Boolean(storagePath),
    staleTime: 50 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });

  return {
    url: externalUrl ?? query.data ?? null,
    isLoading: Boolean(storagePath) && query.isLoading,
  };
}
