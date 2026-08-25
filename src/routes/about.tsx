import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import { createSeoHead, SITE_URL } from "@/lib/seo";

const title = "About Sky Designers | Sri Lankan Digital Agency";
const description =
  "Learn about Sky Designers, its digital marketing and creative services, leadership, team expertise, official profiles, and Sri Lankan business details.";

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: title,
  description,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: "en-LK",
};

export const Route = createFileRoute("/about")({
  head: () => {
    const seo = createSeoHead({ title, description, path: "/about" });
    return {
      ...seo,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(aboutPageJsonLd) }],
    };
  },
  component: About,
});
