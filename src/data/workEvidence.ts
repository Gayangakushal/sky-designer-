import type { ContentPost } from "@/lib/content";

export type WorkEvidenceProfile = {
  clientOrBrand: string;
  citationSummary: string;
  projectScope: string;
  direction: string;
  deliverables: string[];
  measurementContext: string;
  seoTitle?: string;
  seoDescription?: string;
  creatorSupported: boolean;
  priority: number;
};

/**
 * Evidence summaries are limited to statements already present in the published
 * work record. They do not add campaign results, dates, client claims, or scope
 * that is absent from the public content source.
 */
export const workEvidenceProfiles: Record<string, WorkEvidenceProfile> = {
  "lulu-bridal-studio-academy-website": {
    clientOrBrand: "Lulu Bridal Studio & Academy",
    citationSummary:
      "Sky Designers designed and developed a responsive website for Lulu Bridal Studio & Academy. The published project record says the website presents bridal services, academy information, collections, appointment booking, FAQs, and business contact information.",
    projectScope:
      "The project covered a public website for a bridal studio and beauty academy, with separate information for services, collections, academy programmes, appointments, FAQs, and contact details.",
    direction:
      "The stored project description identifies a modern, elegant bridal aesthetic and a customer-focused experience designed to remain simple to navigate across mobile, tablet, and desktop screens.",
    deliverables: [
      "UI and UX design",
      "Responsive website development",
      "Bridal service and collection presentation",
      "Beauty academy information",
      "Appointment booking form",
      "FAQ, contact, and business-information sections",
    ],
    measurementContext:
      "The published record documents scope and delivered website features. It does not report traffic, enquiry, conversion, speed, or revenue outcomes.",
    seoTitle: "Lulu Bridal Studio Website Project | Sky Designers",
    seoDescription:
      "See the responsive website Sky Designers designed and developed for Lulu Bridal Studio & Academy, including service, academy and booking sections.",
    creatorSupported: true,
    priority: 100,
  },
  "lustre-legacy-luxury-gemstone-e-commerce-website": {
    clientOrBrand: "Lustre & Legacy",
    citationSummary:
      "Sky Designers designed and developed a responsive ecommerce website for Lustre & Legacy. The published project record describes a luxury digital experience for presenting natural Ceylon gemstone collections, certification information, private consultation, and customer enquiries.",
    projectScope:
      "The project covered an ecommerce website for a luxury gemstone brand, with collection pages, detailed gemstone information, certification and authenticity information, consultation, shipping, FAQs, testimonials, and contact features.",
    direction:
      "The stored description identifies a premium luxury visual direction and a clean browsing experience for collectors, jewellers, and luxury buyers exploring Ceylon gemstone collections.",
    deliverables: [
      "Luxury ecommerce UI and UX design",
      "Responsive website development",
      "Gemstone collection and product presentation",
      "Certification and authenticity information",
      "Private consultation and enquiry features",
      "FAQ, testimonial, shipping, and contact sections",
    ],
    measurementContext:
      "The published record documents scope and delivered website features. It does not report ecommerce sales, traffic, conversion, speed, or revenue outcomes.",
    seoTitle: "Lustre & Legacy Ecommerce Website Project | Sky Designers",
    seoDescription:
      "Explore the responsive gemstone ecommerce website Sky Designers created for Lustre & Legacy, with collections, certification and enquiry information.",
    creatorSupported: true,
    priority: 100,
  },
  "oms-sri-lanka-social-media-carousel-design": {
    clientOrBrand: "OMS Sri Lanka",
    citationSummary:
      "Sky Designers created a social media carousel project for OMS Sri Lanka. The published record says the multi-slide creative presented product features and benefits through a modern, consistent visual format.",
    projectScope:
      "The stored record covers a social media carousel created to showcase OMS Sri Lanka products across multiple slides.",
    direction:
      "The published description identifies an eye-catching, modern, and brand-focused direction intended to communicate product features and benefits clearly.",
    deliverables: ["Multi-slide social media carousel", "Product-focused visual layouts", "Consistent visual treatment across slides"],
    measurementContext:
      "This is a creative-output record. It does not include reach, engagement, lead, sales, campaign-period, or attribution data.",
    seoTitle: "OMS Sri Lanka Social Media Carousel Project | Sky Designers",
    seoDescription:
      "View the OMS Sri Lanka social media carousel created by Sky Designers to present product features through consistent multi-slide creative.",
    creatorSupported: true,
    priority: 80,
  },
  "oms-sri-lanka-social-media-post-designs": {
    clientOrBrand: "OMS Sri Lanka",
    citationSummary:
      "Sky Designers developed a collection of social media post designs for OMS Sri Lanka. The published record describes product promotions and brand communication presented in a clean, modern, and consistent visual format.",
    projectScope:
      "The stored record covers a collection of social media designs for product promotion and brand communication.",
    direction:
      "The published description identifies a clean, modern, attention-focused direction designed to maintain the existing OMS Sri Lanka brand identity.",
    deliverables: ["Social media post collection", "Product-promotion layouts", "Consistent brand-focused visual treatment"],
    measurementContext:
      "This is a creative-output record. It does not include reach, engagement, lead, sales, campaign-period, or attribution data.",
    seoTitle: "OMS Sri Lanka Social Media Design Project | Sky Designers",
    seoDescription:
      "Explore the OMS Sri Lanka social media post collection developed by Sky Designers for product promotion and consistent brand communication.",
    creatorSupported: true,
    priority: 80,
  },
  "alloves-baby-care-gentle-care-for-happy-little-moments": {
    clientOrBrand: "Alloves Baby Care",
    citationSummary:
      "Sky Designers published a creative social media campaign for Alloves Baby Care. The stored project description says the work presented baby-focused products through warm, family-friendly visual content centred on love, comfort, and care.",
    projectScope:
      "The record covers a social media creative campaign presenting Alloves Baby Care products.",
    direction:
      "The published description identifies a warm, family-friendly visual direction using simple, engaging product presentation.",
    deliverables: ["Multi-image social media creative", "Baby-product presentation", "Family-focused campaign visual direction"],
    measurementContext:
      "This is a creative-output record. It does not include reach, engagement, lead, sales, campaign-period, or attribution data.",
    seoTitle: "Alloves Baby Care Social Media Project | Sky Designers",
    seoDescription:
      "See the warm, family-focused social media creative published by Sky Designers for Alloves Baby Care and its baby-focused product communication.",
    creatorSupported: true,
    priority: 70,
  },
  "video-production-brand-promotion": {
    clientOrBrand: "OMS",
    citationSummary:
      "Sky Designers published a promotional video created for OMS T30 Wireless Earbuds. The stored record says the video showcased the product's sound, ENC technology, and all-day listening messages.",
    projectScope:
      "The record covers a promotional product video for OMS T30 Wireless Earbuds.",
    direction:
      "The published description focuses the video on selected product features and brand-promotion messaging.",
    deliverables: ["Promotional product video", "Product-feature presentation"],
    measurementContext:
      "This is a video-output record. It does not include platform, campaign-period, view, engagement, lead, sales, or attribution data.",
    seoTitle: "OMS T30 Promotional Video Project | Sky Designers",
    seoDescription:
      "Watch the promotional video Sky Designers created for OMS T30 Wireless Earbuds, presenting selected product features and brand messaging.",
    creatorSupported: true,
    priority: 70,
  },
};

export const getWorkEvidenceProfile = (slug: string) => workEvidenceProfiles[slug];

export const workEvidencePriority = (post: Pick<ContentPost, "slug">) =>
  getWorkEvidenceProfile(post.slug)?.priority ?? 0;

const formatLabels: Record<ContentPost["post_type"], string> = {
  image: "image creative",
  video: "video",
  youtube: "video",
  carousel: "carousel",
  project: "project",
};

export const genericWorkEvidenceSummary = (post: ContentPost) => {
  const category = post.category?.name ? ` in ${post.category.name}` : "";
  return `This Sky Designers portfolio page presents “${post.title}” as a published ${formatLabels[post.post_type]}${category}. The current record documents the creative and its published description but does not report campaign outcomes.`;
};
