export type ComparisonValue = boolean | string;

export interface ComparisonFeature {
  name: string;
  values: ComparisonValue[];
}

export interface ComparisonCategory {
  name: string;
  features: ComparisonFeature[];
}

export const pricingComparison: ComparisonCategory[] = [
  {
    name: "Advertising Platforms",
    features: [
      { name: "Meta Ads – Facebook & Instagram", values: [true, true, true, true] },
      { name: "TikTok Ads", values: [false, true, true, true] },
      { name: "Google Ads – Search & Display", values: [false, false, true, true] },
      { name: "YouTube & Performance Max Ads", values: [false, false, false, true] },
      { name: "Active Campaigns Limit", values: ["Up to 04", "Up to 06", "Up to 10", "Unlimited"] },
    ],
  },
  {
    name: "Strategy & Onboarding",
    features: [
      { name: "Kick-off Strategy Call", values: [true, true, true, true] },
      { name: "Competitor Analysis", values: [false, true, true, true] },
      { name: "Target Audience Mapping", values: [false, true, true, true] },
      { name: "A/B Testing Strategy", values: [false, false, true, true] },
    ],
  },
  {
    name: "Content & Creative",
    features: [
      {
        name: "Monthly Creative Output",
        values: ["Up to 08", "Up to 13", "15+ Premium Assets", "Daily Output"],
      },
      { name: "Social Media Graphics", values: [true, true, true, true] },
      { name: "Short-Form Videos", values: [true, true, true, true] },
      { name: "Captions & Copywriting", values: [true, true, true, true] },
      { name: "Professional Product Shoot", values: [false, false, "01 per month", "Monthly"] },
    ],
  },
  {
    name: "Tech & Infrastructure",
    features: [
      { name: "Meta Pixel Integration", values: [true, true, true, true] },
      { name: "Conversions API – CAPI", values: [false, true, true, true] },
      { name: "Google Tag Manager – GTM", values: [false, false, true, true] },
      { name: "Google Analytics 4 – GA4", values: [false, false, true, true] },
      { name: "Website CRO / Lead Generation", values: [false, false, false, true] },
    ],
  },
  {
    name: "Support & Reporting",
    features: [
      { name: "Direct WhatsApp Support", values: [true, true, true, true] },
      { name: "Community Management", values: [false, "Basic", "Priority", "VIP"] },
      { name: "Monthly Strategy Call", values: [false, false, true, true] },
      {
        name: "Performance Reporting",
        values: [false, "PDF Report", "Live Dashboard", "Live Dashboard"],
      },
    ],
  },
];
