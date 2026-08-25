import { createFileRoute, notFound } from "@tanstack/react-router";
import ServiceDetail from "@/pages/ServiceDetail";
import { getServicePage } from "@/data/servicePages";
import { createSeoHead, SITE_URL } from "@/lib/seo";
import { publishedContentPostsQuery } from "@/hooks/useContent";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ context, params }) => {
    const service = getServicePage(params.slug);
    if (!service) throw notFound();
    await context.queryClient.ensureQueryData(publishedContentPostsQuery()).catch(() => []);
    return { slug: service.slug };
  },
  head: ({ loaderData, params }) => {
    const service = getServicePage(loaderData?.slug || params.slug);
    const seo = createSeoHead({
      title: service?.seoTitle || "Digital Marketing Service | Sky Designers",
      description: service?.seoDescription || "Digital marketing services from Sky Designers in Sri Lanka.",
      path: `/services/${params.slug}`,
    });
    if (!service) return seo;
    const serviceJsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/services/${service.slug}#service`,
      name: service.title,
      serviceType: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
      description: service.definition,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Sri Lanka" },
    };
    return {
      ...seo,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(serviceJsonLd) }],
    };
  },
  component: () => <ServiceDetail service={getServicePage(Route.useLoaderData().slug)!} />,
});
