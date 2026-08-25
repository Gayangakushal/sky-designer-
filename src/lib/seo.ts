import { company, founder, services } from "@/data/siteData";

export const SITE_URL = "https://skydesigners.lk";
export const SITE_NAME = "Sky Designers";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/images/who-we-are-poster.webp`;

export const absoluteUrl = (path = "/") =>
  path.startsWith("http://") || path.startsWith("https://")
    ? path
    : `${SITE_URL}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;

export const cleanDescription = (value: string, fallback: string) => {
  const text = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, 160);
};

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  robots?: string;
};

export const createSeoHead = ({
  title,
  description,
  path,
  image,
  type = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
}: SeoInput) => {
  const canonical = absoluteUrl(path);
  const socialImage = image ? absoluteUrl(image) : DEFAULT_SOCIAL_IMAGE;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_LK" },
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:image", content: socialImage },
      { property: "og:image:alt", content: `${SITE_NAME} — ${title}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: `${SITE_NAME} — ${title}` },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: company.email.toLowerCase(),
  telephone: company.phone,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: company.phone,
    email: company.email.toLowerCase(),
    areaServed: "LK",
  },
  areaServed: { "@type": "Country", name: "Sri Lanka" },
  description:
    "Sky Designers is a Sri Lankan digital marketing and creative agency providing advertising, social media, branding, content production, web development, and digital strategy services.",
  identifier: {
    "@type": "PropertyValue",
    name: "Business Registration",
    value: company.registration,
  },
  founder: {
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.role,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Sky Designers services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Sri Lanka" },
      },
    })),
  },
  sameAs: [
    company.facebook,
    company.instagram,
    company.linkedin,
    company.threads,
    company.tiktok,
    company.youtube,
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-LK",
};

export const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" };
    return entities[character];
  });
