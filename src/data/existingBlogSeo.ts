export type BlogResourceLink = {
  label: string;
  href: string;
  description: string;
};

export type ExistingBlogSeoProfile = {
  cluster: string;
  intent: string;
  serviceLinks: BlogResourceLink[];
  workLinks: BlogResourceLink[];
  articleLinks: BlogResourceLink[];
  seoTitle?: string;
  seoDescription?: string;
  imageAlt: string;
};

/**
 * Explicit relationships for the seven published articles audited on 31 August 2026.
 * This keeps internal links accurate without changing the live Blog API records.
 */
export const existingBlogSeoProfiles: Record<string, ExistingBlogSeoProfile> = {
  "lbc-life-insurance-course-37x-roas-meta-case-study": {
    cluster: "Performance Advertising",
    intent: "Creative-performance and post-click leakage case study",
    seoTitle: "37x ROAS: Creative & Lead Leakage Case Study | Sky Designers",
    seoDescription:
      "See how two videos drove most results in a Sri Lankan insurance diploma campaign and where post-click follow-up leaked value.",
    imageAlt: "Cover graphic for the 37x ROAS insurance diploma Meta campaign case study",
    serviceLinks: [
      {
        label: "Performance advertising and Meta Ads",
        href: "/services/performance-advertising",
        description: "Explore the campaign strategy, creative testing and reporting service.",
      },
    ],
    workLinks: [],
    articleLinks: [
      {
        label: "Compare the 9.09x ROAS English diploma funnel",
        href: "/blog/9x-roas-english-diploma-meta-ads-case-study",
        description: "A separate education campaign focused on full-funnel enrolment economics.",
      },
    ],
  },
  "brand-resonance-index-bri-meta-ads-kpi": {
    cluster: "Performance Advertising",
    intent: "Brand-campaign measurement framework",
    imageAlt: "Cover graphic introducing the Brand Resonance Index for Meta Ads",
    serviceLinks: [
      {
        label: "Performance advertising and Meta Ads",
        href: "/services/performance-advertising",
        description: "Connect campaign measurement with creative testing and paid-media strategy.",
      },
      {
        label: "Branding and creative design",
        href: "/services/branding-creative-design",
        description:
          "See how brand identity and campaign creative are developed as a consistent system.",
      },
    ],
    workLinks: [],
    articleLinks: [
      {
        label: "How Meta creative testing protects a winning campaign",
        href: "/blog/meta-creative-test-setup-real-scale-tool",
        description: "A related guide to testing new creative without confusing the core result.",
      },
    ],
  },
  "meta-creative-test-setup-real-scale-tool": {
    cluster: "Performance Advertising",
    intent: "Meta creative-testing guidance",
    imageAlt: "Cover graphic for the Meta creative testing guide",
    serviceLinks: [
      {
        label: "Performance advertising and Meta Ads",
        href: "/services/performance-advertising",
        description: "Review Sky Designers' approach to campaign structure and creative testing.",
      },
    ],
    workLinks: [],
    articleLinks: [
      {
        label: "See how two videos carried a 37x ROAS campaign",
        href: "/blog/lbc-life-insurance-course-37x-roas-meta-case-study",
        description: "A real campaign analysis showing why creative-level evidence matters.",
      },
      {
        label: "Understand Meta Value Rules",
        href: "/blog/meta-value-rules-stop-chasing-cheap-clicks",
        description:
          "A complementary article about value-based bidding rather than creative testing.",
      },
    ],
  },
  "facebook-monetization-myth-ads-kill-reach": {
    cluster: "Video & Content Production",
    intent: "Facebook creator retention and monetisation guidance",
    imageAlt: "Cover graphic for the Facebook monetisation and video retention article",
    serviceLinks: [
      {
        label: "Video and content production",
        href: "/services/video-content-production",
        description: "Plan platform-ready video, editing and motion content for digital audiences.",
      },
      {
        label: "Social media management",
        href: "/services/social-media-management",
        description: "Connect content planning with publishing, page activity and reporting.",
      },
    ],
    workLinks: [
      {
        label: "OMS T30 promotional video",
        href: "/work/video-production-brand-promotion",
        description: "A published example of short-form product video production.",
      },
    ],
    articleLinks: [],
  },
  "geo-generative-engine-optimization-seo-shift": {
    cluster: "Digital Strategy & Growth",
    intent: "Introductory GEO and search-strategy guidance",
    imageAlt: "Cover graphic explaining the shift from traditional SEO to GEO",
    serviceLinks: [
      {
        label: "Digital strategy and growth",
        href: "/services/digital-strategy-growth",
        description: "Build a practical roadmap across search, content, advertising and web.",
      },
      {
        label: "Website design and development",
        href: "/services/website-design-development",
        description: "Review the search-ready website foundations offered by Sky Designers.",
      },
    ],
    workLinks: [],
    articleLinks: [],
  },
  "meta-value-rules-stop-chasing-cheap-clicks": {
    cluster: "Performance Advertising",
    intent: "Meta value-based bidding guidance",
    imageAlt: "Cover graphic for the Meta Value Rules bidding guide",
    serviceLinks: [
      {
        label: "Performance advertising and Meta Ads",
        href: "/services/performance-advertising",
        description: "Explore paid-media strategy, testing and performance reporting.",
      },
    ],
    workLinks: [],
    articleLinks: [
      {
        label: "How Meta creative testing differs",
        href: "/blog/meta-creative-test-setup-real-scale-tool",
        description:
          "Creative testing answers a different campaign question from value-based bidding.",
      },
    ],
  },
  "9x-roas-english-diploma-meta-ads-case-study": {
    cluster: "Performance Advertising",
    intent: "Full-funnel education enrolment case study",
    seoTitle: "9.09x ROAS: English Diploma Funnel Case Study | Sky Designers",
    seoDescription:
      "See the Meta funnel behind 1,628 confirmed English diploma bookings, from LKR 2.33M spend to tracked enrolment revenue.",
    imageAlt: "Cover graphic for the 9.09x ROAS English diploma Meta campaign case study",
    serviceLinks: [
      {
        label: "Performance advertising and Meta Ads",
        href: "/services/performance-advertising",
        description:
          "Explore the paid-media service behind structured campaign and funnel analysis.",
      },
    ],
    workLinks: [],
    articleLinks: [
      {
        label: "Compare the 37x ROAS creative and lead-leakage study",
        href: "/blog/lbc-life-insurance-course-37x-roas-meta-case-study",
        description:
          "A separate education campaign focused on creative concentration and follow-up leakage.",
      },
    ],
  },
};

export const getExistingBlogSeoProfile = (slug: string) => existingBlogSeoProfiles[slug];
