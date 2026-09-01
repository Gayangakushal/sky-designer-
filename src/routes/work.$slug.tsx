import { createFileRoute, notFound } from "@tanstack/react-router";
import WorkDetail from "@/pages/WorkDetail";
import { publishedContentPostQuery, publishedContentPostsQuery } from "@/hooks/useContent";
import { postPreviewImage } from "@/lib/content";
import { cleanDescription, createSeoHead, SITE_URL } from "@/lib/seo";
import { getWorkEvidenceProfile } from "@/data/workEvidence";
import { relatedServicePagesForWork } from "@/lib/service-links";

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
    await context.queryClient.ensureQueryData(publishedContentPostsQuery()).catch(() => []);
    return post;
  },
  head: ({ loaderData, params }) => {
    const evidenceProfile = getWorkEvidenceProfile(params.slug);
    const title = loaderData
      ? evidenceProfile?.seoTitle ||
        workSeoTitleOverrides[params.slug] ||
        `${loaderData.title} | Sky Designers Work`
      : "Creative Work | Sky Designers";
    const description = cleanDescription(
      evidenceProfile?.seoDescription || loaderData?.excerpt || loaderData?.content || "",
      "Explore campaign, design, video and digital project work by Sky Designers in Sri Lanka.",
    );
    const path = `/work/${params.slug}`;
    const image = loaderData ? postPreviewImage(loaderData) : null;
    const seo = createSeoHead({ title, description, path, image, type: "article" });
    if (!loaderData) return seo;

    const relatedServices = relatedServicePagesForWork(loaderData);
    const clientOrBrand = loaderData.client_name || evidenceProfile?.clientOrBrand;
    const about = [
      ...(clientOrBrand ? [{ "@type": "Organization", name: clientOrBrand }] : []),
      ...relatedServices.map((service) => ({
        "@type": "Service",
        "@id": `${SITE_URL}/services/${service.slug}#service`,
        name: service.title,
        url: `${SITE_URL}/services/${service.slug}`,
      })),
    ];
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${SITE_URL}${path}#work`,
      url: `${SITE_URL}${path}`,
      mainEntityOfPage: `${SITE_URL}${path}`,
      name: loaderData.title,
      description,
      ...(image ? { image } : {}),
      ...(loaderData.category?.name ? { genre: loaderData.category.name } : {}),
      ...(loaderData.published_at ? { datePublished: loaderData.published_at } : {}),
      dateModified: loaderData.updated_at,
      publisher: { "@id": `${SITE_URL}/#organization` },
      ...(evidenceProfile?.creatorSupported
        ? { creator: { "@id": `${SITE_URL}/#organization` } }
        : {}),
      ...(about.length > 0 ? { about } : {}),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-LK",
    };
    return {
      ...seo,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: WorkDetail,
});
