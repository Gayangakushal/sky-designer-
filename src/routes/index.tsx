import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { createSeoHead } from "@/lib/seo";
import { publishedContentPostsQuery } from "@/hooks/useContent";

const title = "Sky Designers | Digital Marketing & Creative Agency Sri Lanka";
const description =
  "Sky Designers is a Sri Lankan digital marketing and creative agency for social media, Meta ads, branding, content production, and web development.";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const query = publishedContentPostsQuery(6);
    try {
      return await context.queryClient.ensureQueryData(query);
    } catch (error) {
      console.error("[Homepage] Latest work SSR data unavailable:", error);
      context.queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
      // Seed a stale placeholder so SSR stays available and hydration immediately
      // retries against Supabase instead of treating the fallback as real content.
      context.queryClient.setQueryData(query.queryKey, [], { updatedAt: 0 });
      return [];
    }
  },
  head: () => createSeoHead({ title, description, path: "/" }),
  component: Index,
});
