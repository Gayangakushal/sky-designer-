import { services } from "@/data/siteData";

const details = {
  "performance-advertising": {
    seoTitle: "Performance Advertising & Meta Ads Agency Sri Lanka | Sky Designers",
    seoDescription: "Performance advertising in Sri Lanka with campaign strategy, Meta Ads creative testing, audience targeting and clear reporting from Sky Designers.",
    introduction: "Sky Designers plans and manages performance campaigns for Sri Lankan businesses that need more than impressions. We connect the offer, audience, creative and landing experience around a measurable commercial goal.",
    outcomes: ["A campaign structure aligned with your objective", "Creative and audience tests based on real performance", "Reporting that explains results and practical next steps"],
    approach: "We begin with your offer, customer journey and conversion target. From there, our team develops the campaign structure, advertising creative and testing plan, then reviews results to improve lead quality and efficiency over time.",
  },
  "social-media-management": {
    seoTitle: "Social Media Marketing & Management Sri Lanka | Sky Designers",
    seoDescription: "Social media management in Sri Lanka with content planning, page management, community support and reporting for consistent brand growth.",
    introduction: "Our social media management service gives brands a clear, consistent presence across the channels their customers use. Strategy, content, publishing and review are handled as one connected system.",
    outcomes: ["A practical content calendar built around your audience", "Consistent brand voice and visual direction", "Regular reporting with clear content insights"],
    approach: "We learn how your customers make decisions, define useful content themes and turn them into a manageable publishing plan. Page activity and results are reviewed regularly so the plan can respond to what audiences actually engage with.",
  },
  "branding-creative-design": {
    seoTitle: "Branding & Creative Design Agency Sri Lanka | Sky Designers",
    seoDescription: "Brand identity and creative design in Sri Lanka for businesses that need distinctive, consistent visuals across campaigns and digital channels.",
    introduction: "Sky Designers creates brand identities and campaign visuals that help businesses communicate clearly and remain recognisable. Every creative direction is grounded in the audience, offer and context where it will appear.",
    outcomes: ["A distinctive visual direction for your business", "Campaign and social creative with a consistent identity", "Practical visual guidance your team can continue to use"],
    approach: "We translate your positioning and personality into a focused creative system. Depending on the brief, that can include identity development, campaign concepts, social media assets and guidelines for consistent day-to-day use.",
  },
  "video-content-production": {
    seoTitle: "Video & Content Production Sri Lanka | Sky Designers",
    seoDescription: "Digital video and content production in Sri Lanka, from concepts and production planning to editing, motion graphics and social-first delivery.",
    introduction: "We produce video and visual content designed for how people consume media online. The process connects the message, format and channel so every asset has a clear role in the wider campaign.",
    outcomes: ["Content concepts designed for the intended platform", "A coordinated production and editing workflow", "Reusable assets for campaigns and organic social media"],
    approach: "Our team develops the concept and production plan before moving into capture, editing and delivery. We consider aspect ratios, pacing, captions and variations early so the finished content is ready for real digital use.",
  },
  "website-design-development": {
    seoTitle: "Website Design & Development Sri Lanka | Sky Designers",
    seoDescription: "Responsive website design and development in Sri Lanka with clear UX, SEO-ready structure, strong performance and deployment support.",
    introduction: "Sky Designers builds responsive websites that explain what a business offers and make the next action easy. Design and development are treated as one process, with clarity, mobile usability and search-friendly foundations considered from the start.",
    outcomes: ["A responsive experience for mobile and desktop visitors", "Clear page structure and conversion paths", "SEO-ready technical and content foundations"],
    approach: "We map the content and user journey, establish the interface direction, then build and test the responsive experience. The final site is prepared for deployment with practical attention to accessibility, performance and maintainability.",
  },
  "digital-strategy-growth": {
    seoTitle: "Digital Marketing Strategy & Growth Sri Lanka | Sky Designers",
    seoDescription: "Digital strategy in Sri Lanka connecting content, advertising, websites and business goals through practical audits and focused growth roadmaps.",
    introduction: "Our digital strategy service helps businesses decide what to prioritise and how their channels should work together. It turns disconnected activity into a focused roadmap connected to customer needs and commercial objectives.",
    outcomes: ["A clear view of current gaps and opportunities", "Priorities based on business goals and available resources", "A practical roadmap across content, advertising and web"],
    approach: "We review the current digital presence, customer journey and available performance evidence. The resulting plan defines priorities, channel roles and realistic next actions that your team can execute and measure.",
  },
} as const;

export const servicePages = services.map((service) => ({ ...service, ...details[service.slug as keyof typeof details] }));
export type ServicePageData = (typeof servicePages)[number];
export const getServicePage = (slug: string) => servicePages.find((service) => service.slug === slug);
