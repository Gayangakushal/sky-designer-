import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { publishedBlogPostsQuery } from "@/hooks/useBlog";
import { createSeoHead } from "@/lib/seo";

const title = "Digital Marketing Insights Sri Lanka | Sky Designers";
const description = "Read practical digital marketing insights from Sri Lanka on social media, advertising, branding, websites and business growth from Sky Designers.";

export const Route = createFileRoute("/blog/")({
  loader: async ({ context }) => {
    const query = publishedBlogPostsQuery();
    try {
      return await context.queryClient.ensureQueryData(query);
    } catch (error) {
      console.error("[SEO] Blog index SSR data unavailable:", error);
      context.queryClient.removeQueries({ queryKey: query.queryKey, exact: true });
      context.queryClient.setQueryData(query.queryKey, []);
      return [];
    }
  },
  head: () => createSeoHead({ title, description, path: "/blog" }),
  component: Blog,
});
