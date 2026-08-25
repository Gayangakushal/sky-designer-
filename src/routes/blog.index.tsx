import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { publishedBlogPostsQuery } from "@/hooks/useBlog";
import { createSeoHead } from "@/lib/seo";

const title = "Digital Marketing Blog & Insights | Sky Designers";
const description = "Practical guidance on digital marketing, social media, advertising, branding, websites and business growth from the Sky Designers team in Sri Lanka.";

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
