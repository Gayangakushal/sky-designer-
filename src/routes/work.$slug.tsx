import { createFileRoute, notFound } from "@tanstack/react-router";
import WorkDetail from "@/pages/WorkDetail";
import { publishedContentPostQuery, publishedContentPostsQuery } from "@/hooks/useContent";
import { postPreviewImage } from "@/lib/content";
import { cleanDescription, createSeoHead } from "@/lib/seo";

const workSeoTitleOverrides: Record<string, string> = {
  "pet-expo-2026-sri-lankas-premier-pet-animal-lifestyle-exhibition":
    "Pet Expo 2026: Sri Lanka Pet Exhibition | Sky Designers",
  "lustre-legacy-discover-the-beauty-of-ceylon-gemstones":
    "Ceylon Gemstones by Lustre & Legacy | Sky Designers",
  "alloves-baby-care-gentle-care-for-happy-little-moments":
    "Alloves Baby Care Creative Campaign | Sky Designers",
  "lustre-legacy-luxury-gemstone-e-commerce-website":
    "Lustre & Legacy Gemstone Website | Sky Designers",
  "ayora-varicose-ayurvedic-care-natural-ayurvedic-support":
    "Ayora Varicose Ayurvedic Care Campaign | Sky Designers",
};

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ context, params }) => {
    const post = await context.queryClient.ensureQueryData(publishedContentPostQuery(params.slug));
    if (!post) throw notFound();
    void context.queryClient.ensureQueryData(publishedContentPostsQuery());
    return post;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData
      ? workSeoTitleOverrides[params.slug] || `${loaderData.title} | Sky Designers Work`
      : "Creative Work | Sky Designers";
    const description = cleanDescription(loaderData?.excerpt || loaderData?.content || "", "Explore campaign, design, video and digital project work by Sky Designers in Sri Lanka.");
    return createSeoHead({ title, description, path: `/work/${params.slug}`, image: loaderData ? postPreviewImage(loaderData) : null, type: "article" });
  },
  component: WorkDetail,
});
