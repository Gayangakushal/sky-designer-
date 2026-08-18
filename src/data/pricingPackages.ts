export interface PricingPackage {
  slug: string;
  category: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  optionLabel: string;
  featured?: boolean;
  smallLabel?: string;
  isCustom?: boolean;
}

export const pricingPackages: PricingPackage[] = [
  {
    slug: "standard",
    category: "Standard",
    name: "Startup Foundation",
    price: "35,000",
    description: "Perfect for new businesses looking to establish a strong digital footprint.",
    features: ["Up to 08 monthly creatives", "Kick-off strategy call", "Meta Pixel integration", "Meta Ads management"],
    buttonLabel: "Select Standard",
    optionLabel: "Standard – LKR 35,000 / month",
  },
  {
    slug: "premium",
    category: "Premium",
    name: "Brand Growth Package",
    price: "65,000",
    description: "Designed for growing brands that need active market testing and consistent mid-tier content.",
    features: [
      "Up to 13 monthly creatives",
      "Meta and TikTok Ads",
      "Competitor and audience analysis",
      "Conversions API integration",
      "PDF performance report",
    ],
    buttonLabel: "Select Premium",
    optionLabel: "Premium – LKR 65,000 / month",
  },
  {
    slug: "platinum",
    category: "Platinum",
    name: "Market Leader Package",
    price: "100,000",
    description: "Our most popular package for dominant market positioning and high-volume content output.",
    features: [
      "15+ premium creative assets",
      "Meta, TikTok and Google Ads",
      "Monthly professional product shoot",
      "Advanced tracking and analytics",
      "Live performance dashboard",
      "Monthly strategy call",
    ],
    buttonLabel: "Select Platinum",
    optionLabel: "Platinum – LKR 100,000 / month",
    featured: true,
  },
  {
    slug: "corporate",
    category: "Corporate",
    name: "Omnichannel Dominance",
    price: "200,000",
    description: "A complete omnichannel growth solution designed for established businesses and corporate brands.",
    features: [
      "Daily creative output",
      "Unlimited active campaigns",
      "Full omnichannel ads management",
      "Website CRO and lead generation",
      "Live performance dashboard",
      "VIP community management",
    ],
    buttonLabel: "Select Corporate",
    optionLabel: "Corporate – LKR 200,000 / month",
  },
  {
    slug: "custom",
    category: "Custom",
    name: "Custom Growth Package",
    price: "Custom Quote",
    description:
      "A flexible digital solution tailored around your business goals, required services, campaign needs, and available budget.",
    features: [
      "Custom digital strategy",
      "Flexible content & creative plan",
      "Social media management as required",
      "Advertising based on your budget",
      "Website / landing page support if required",
      "Custom reporting & consultation",
      "Dedicated support",
    ],
    buttonLabel: "Get a Custom Quote",
    optionLabel: "Custom Quote",
    isCustom: true,
  },
];
