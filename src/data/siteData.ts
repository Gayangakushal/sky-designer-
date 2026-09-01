import {
  BarChart3,
  Braces,
  Clapperboard,
  LayoutTemplate,
  Megaphone,
  Palette,
  Search,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";

import design1 from "@/assets/gallery/design-1.jpg";
import design2 from "@/assets/gallery/design-2.jpg";
import design3 from "@/assets/gallery/design-3.jpg";
import design4 from "@/assets/gallery/design-4.jpg";
import design5 from "@/assets/gallery/design-5.jpg";
import design6 from "@/assets/gallery/design-6.jpg";

import client1 from "@/assets/logos/ayuceylon.jpg";
import client2 from "@/assets/logos/justshop.jpg";
import client3 from "@/assets/logos/lifewellness.jpg";
import client4 from "@/assets/logos/rockhouse.jpg";
import client5 from "@/assets/logos/slphonehub.jpg";

import assistant from "@/assets/gallery/team-assistant-cutout.png";
import chathura from "@/assets/gallery/team-chathura-cutout.png";
import dila from "@/assets/gallery/dila.png";
import dulara from "@/assets/gallery/dila-paid-media-specialist-cutout.png";
import gayanga from "@/assets/gallery/gayanga-social-media-manager-cutout.png";
import indrajith from "@/assets/gallery/team-indrajith-cutout.png";
import ishara from "@/assets/gallery/gayanga-social-media-manager-2-cutout.png";
import jeewantha from "@/assets/gallery/team-jeewantha-cutout.png";
import joshuwa from "@/assets/gallery/joshuwa-transparent.png";
import yasara from "@/assets/gallery/yasara.png";

export const company = {
  name: "Sky Designers",
  slogan: "Design Excellence Marketing Brilliance",
  phoneDisplay: "+94 77 950 7298",
  phone: "+94779507298",
  email: "info@skydesigners.lk",
  whatsapp: "https://wa.me/94779507298",
  registration: "WP/GAM/WT/2024/00244",
  location: "Sri Lanka",
  facebook: "https://web.facebook.com/profile.php?id=100089002696067",
  instagram: "https://www.instagram.com/js_sky_designers/",
  linkedin: "https://lk.linkedin.com/company/sky-designers",
  threads: "https://www.threads.com/@js_sky_designers",
  tiktok: "https://www.tiktok.com/@sky_designers",
  youtube: "https://youtube.com/@skydesigners",
};

export const services = [
  {
    slug: "performance-advertising",
    icon: Target,
    title: "Performance Advertising",
    shortTitle: "Meta Ads",
    description:
      "Data-led Facebook and Instagram campaigns built to generate qualified leads and measurable growth.",
    features: [
      "Campaign strategy",
      "Creative testing",
      "Audience targeting",
      "Performance reporting",
    ],
  },
  {
    slug: "social-media-management",
    icon: Share2,
    title: "Social Media Management",
    shortTitle: "Social Media",
    description:
      "A complete content system that keeps your brand active, relevant, and consistent across channels.",
    features: ["Content calendars", "Page management", "Community support", "Monthly reporting"],
  },
  {
    slug: "branding-creative-design",
    icon: Palette,
    title: "Branding & Creative Design",
    shortTitle: "Creative Design",
    description:
      "Distinctive visual identities and campaign creatives designed to make your business easy to remember.",
    features: ["Brand identity", "Campaign design", "Social creatives", "Visual guidelines"],
  },
  {
    slug: "video-content-production",
    icon: Clapperboard,
    title: "Video & Content Production",
    shortTitle: "Video Production",
    description:
      "Scroll-stopping short-form content, commercial visuals, and brand stories made for digital audiences.",
    features: ["Concept development", "Production planning", "Editing", "Motion graphics"],
  },
  {
    slug: "website-design-development",
    icon: Braces,
    title: "Website Design & Development",
    shortTitle: "Web Development",
    description:
      "Fast, responsive websites that present your brand professionally and turn visitors into enquiries.",
    features: [
      "UI/UX design",
      "Responsive development",
      "SEO-ready structure",
      "Deployment support",
    ],
  },
  {
    slug: "digital-strategy-growth",
    icon: BarChart3,
    title: "Digital Strategy & Growth",
    shortTitle: "Strategy",
    description:
      "Practical digital roadmaps connecting your content, advertising, website, and business objectives.",
    features: ["Digital audits", "Growth planning", "Funnel strategy", "Consultation"],
  },
];

export const clientLogos = [
  { name: "Ayu Ceylon", image: client1 },
  { name: "Just Shop", image: client2 },
  { name: "Life Wellness", image: client3 },
  { name: "Rock House", image: client4 },
  { name: "SL Phone Hub", image: client5 },
];

export const projects = [
  {
    title: "Automotive Campaign",
    category: "Creative Design",
    image: design1,
    description: "High-impact promotional creative for an automotive service brand.",
  },
  {
    title: "International Education",
    category: "Lead Generation",
    image: design2,
    description: "A conversion-focused education campaign designed for social media advertising.",
  },
  {
    title: "Travel Promotion",
    category: "Social Media",
    image: design3,
    description: "Destination-led visual communication with a clear offer hierarchy.",
  },
  {
    title: "Beauty Brand Campaign",
    category: "Brand Creative",
    image: design4,
    description: "Premium beauty campaign artwork with a bold editorial direction.",
  },
  {
    title: "Restaurant Launch",
    category: "Launch Campaign",
    image: design5,
    description: "A launch creative designed to build urgency and local awareness.",
  },
  {
    title: "Property Marketing",
    category: "Real Estate",
    image: design6,
    description: "Structured property advertising designed to communicate value quickly.",
  },
];

export const founder = {
  name: "Joshuwa",
  role: "CEO & FOUNDER",
  description:
    "Leading Sky Designers with a focus on creative strategy, digital innovation, and measurable business growth.",
  image: joshuwa,
  sortOrder: 0,
};

export const team = [
  {
    name: "Jeewantha",
    role: "SALES EXECUTIVE | OPERATIONS MANAGER",
    image: jeewantha,
    sortOrder: 1,
  },
  { name: "Ishara", role: "ADMINISTRATION & ACCOUNT MANAGER", image: ishara, sortOrder: 2 },
  { name: "Chathura", role: "DIGITAL MARKETING STRATEGIST", image: dila, sortOrder: 3 },
  { name: "Gayanga", role: "DIGITAL MARKETING & WEB EXECUTIVE", image: gayanga, sortOrder: 4 },
  { name: "Dilshan", role: "ART DIRECTOR", image: dulara, sortOrder: 5 },
  { name: "Dulara", role: "PERFORMANCE MARKETER", image: chathura, sortOrder: 6 },
  { name: "Gimhani", role: "SOCIAL MEDIA ACCOUNT EXECUTIVE", image: assistant, sortOrder: 7 },
  { name: "Indrajith", role: "GRAPHIC DESIGNER", image: indrajith, sortOrder: 8 },
  { name: "Yasara", role: "ASSISTANT", image: yasara, sortOrder: 9 },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn your goals, audience, offer, and current digital position.",
  },
  {
    number: "02",
    title: "Plan",
    description: "We turn the brief into a focused creative and growth roadmap.",
  },
  {
    number: "03",
    title: "Create",
    description: "Our team builds the content, campaigns, and digital experiences.",
  },
  {
    number: "04",
    title: "Launch",
    description: "We publish, deploy, and test every touchpoint with care.",
  },
  {
    number: "05",
    title: "Grow",
    description: "We review performance and improve what matters most.",
  },
];

export type Job = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: "open" | "closed";
};

export const capabilities = [
  { icon: Megaphone, label: "Campaigns" },
  { icon: LayoutTemplate, label: "Web Experiences" },
  { icon: Sparkles, label: "Creative Systems" },
  { icon: Search, label: "Growth Insights" },
];
