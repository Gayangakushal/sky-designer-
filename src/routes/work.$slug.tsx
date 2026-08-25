import { createFileRoute, notFound } from "@tanstack/react-router";
import WorkDetail from "@/pages/WorkDetail";
import { publishedContentPostQuery, publishedContentPostsQuery } from "@/hooks/useContent";
import { postPreviewImage } from "@/lib/content";
import { cleanDescription, createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(publishedContentPostQuery(params.slug));
    if (!post) throw notFound();
    void context.queryClient.ensureQueryData(publishedContentPostsQuery());
    return post;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.title} | Sky Designers Work` : "Creative Work | Sky Designers";
    const description = cleanDescription(loaderData?.excerpt || loaderData?.content || "", "Explore campaign, design, video and digital project work by Sky Designers in Sri Lanka.");
    return createSeoHead({ title, description, path: `/work/${params.slug}`, image: loaderData ? postPreviewImage(loaderData) : null, type: "article" });
  },
  component: WorkDetail,
});
