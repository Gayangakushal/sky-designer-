import { servicePages, type ServicePageData } from "@/data/servicePages";

const normalize = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();

const serviceAliases: Record<string, string[]> = {
  "performance-advertising": [
    "performance advertising",
    "meta ads",
    "facebook ads",
    "instagram ads",
    "paid media",
    "paid advertising",
    "lead generation",
  ],
  "social-media-management": [
    "social media management",
    "social media marketing",
    "social media",
    "community management",
  ],
  "branding-creative-design": [
    "branding and creative design",
    "branding",
    "brand identity",
    "creative design",
    "graphic design",
  ],
  "video-content-production": [
    "video and content production",
    "video production",
    "content production",
    "video and reels",
    "video reels",
    "motion graphics",
  ],
  "website-design-development": [
    "website design and development",
    "website design",
    "web development",
    "website development",
    "responsive web design",
    "ui ux design",
    "e commerce development",
    "e commerce website",
    "ecommerce website",
  ],
  "digital-strategy-growth": [
    "digital strategy and growth",
    "digital strategy",
    "growth strategy",
    "funnel strategy",
    "digital audit",
  ],
};

export const servicePageForLabel = (label: string | null | undefined) => {
  if (!label) return undefined;
  const normalizedLabel = normalize(label);
  return servicePages.find((service) => {
    const labels = [service.slug, service.title, service.shortTitle, ...(serviceAliases[service.slug] ?? [])];
    return labels.some((candidate) => normalize(candidate) === normalizedLabel);
  });
};

const topicKeywords: Record<string, string[]> = {
  "performance-advertising": [
    "meta ads",
    "facebook ads",
    "performance advertising",
    "paid advertising",
    "roas",
    "creative test",
    "value rules",
  ],
  "social-media-management": [
    "social media",
    "facebook monetization",
    "organic reach",
    "community management",
  ],
  "branding-creative-design": ["branding", "brand identity", "creative design", "graphic design"],
  "video-content-production": ["video production", "content production", "short form video", "reels"],
  "website-design-development": [
    "website design",
    "web development",
    "ecommerce",
    "e commerce",
    "technical seo",
  ],
  "digital-strategy-growth": [
    "digital strategy",
    "growth strategy",
    "generative engine optimization",
    "geo",
    "seo",
    "funnel",
  ],
};

export const inferServicePagesFromText = (value: string): ServicePageData[] => {
  const normalizedValue = normalize(value);
  return servicePages.filter((service) =>
    (topicKeywords[service.slug] ?? []).some((keyword) =>
      normalizedValue.includes(normalize(keyword)),
    ),
  );
};

type WorkServiceSource = {
  title: string;
  excerpt?: string | null;
  content?: string | null;
  services: string[];
  category?: { name: string } | null;
};

export const relatedServicePagesForWork = (work: WorkServiceSource): ServicePageData[] => {
  const explicit = [...work.services, work.category?.name]
    .map((label) => servicePageForLabel(label))
    .filter((service): service is ServicePageData => Boolean(service));
  const inferred = inferServicePagesFromText(
    [work.title, work.excerpt, work.content, work.category?.name].filter(Boolean).join(" "),
  );
  return Array.from(new Map([...explicit, ...inferred].map((service) => [service.slug, service])).values());
};
