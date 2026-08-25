import { createFileRoute, notFound } from "@tanstack/react-router";
import ServiceDetail from "@/pages/ServiceDetail";
import { getServicePage } from "@/data/servicePages";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServicePage(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData, params }) => createSeoHead({
    title: loaderData?.seoTitle || "Digital Marketing Service | Sky Designers",
    description: loaderData?.seoDescription || "Digital marketing services from Sky Designers in Sri Lanka.",
    path: `/services/${params.slug}`,
  }),
  component: () => <ServiceDetail service={Route.useLoaderData()} />,
});
