import { createFileRoute } from "@tanstack/react-router";
import Work from "@/pages/Work";
import { createSeoHead } from "@/lib/seo";
import { contentCategoriesQuery, publishedContentPostsQuery } from "@/hooks/useContent";

const title = "Our Latest Work | Sky Designers Portfolio";
const description =
  "Explore the campaigns, designs, productions and digital experiences Sky Designers creates for brands in Sri Lanka and beyond.";

export const Route = createFileRoute("/work/")({
  loader: async ({ context }) => {
    const categoriesQuery = contentCategoriesQuery();
    const postsQuery = publishedContentPostsQuery();
    const [categories, posts] = await Promise.all([
      context.queryClient.ensureQueryData(categoriesQuery).catch((error) => {
        console.error("[SEO] Work categories SSR data unavailable:", error);
        context.queryClient.removeQueries({ queryKey: categoriesQuery.queryKey, exact: true });
        context.queryClient.setQueryData(categoriesQuery.queryKey, [], { updatedAt: 0 });
        return [];
      }),
      context.queryClient.ensureQueryData(postsQuery).catch((error) => {
        console.error("[SEO] Work index SSR data unavailable:", error);
        context.queryClient.removeQueries({ queryKey: postsQuery.queryKey, exact: true });
        context.queryClient.setQueryData(postsQuery.queryKey, [], { updatedAt: 0 });
        return [];
      }),
    ]);
    return { categories, posts };
  },
  head: () => createSeoHead({ title, description, path: "/work" }),
  component: Work,
});
