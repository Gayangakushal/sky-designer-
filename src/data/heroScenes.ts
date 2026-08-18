import abstractBlue from "@/assets/hero-bg.jpg";
import officeLight from "@/assets/hero/office-e.jpg";
import officeDark from "@/assets/hero/office-d.jpg";
import officeBrand from "@/assets/hero/office-v.jpg";
import campaignCreative from "@/assets/gallery/design-2.jpg";
import brandCreative from "@/assets/gallery/design-4.jpg";

export type HeroTransition = "fade" | "diagonal" | "vertical" | "slide" | "glitch" | "zoom";

export interface HeroSceneData {
  id: number;
  src: string;
  alt: string;
  label: string;
  transition: HeroTransition;
  position?: string;
  contain?: boolean;
}

// Add future Sky Designers hero images or videos to this reusable scene list.
export const heroScenes: HeroSceneData[] = [
  { id: 1, src: abstractBlue, alt: "Abstract blue and gold Sky Designers brand visual", label: "Brand systems", transition: "fade" },
  { id: 2, src: officeLight, alt: "Sky Designers team working inside the light creative studio", label: "Agency studio", transition: "diagonal", position: "center center" },
  { id: 3, src: campaignCreative, alt: "Sky Designers digital campaign creative", label: "Campaign creative", transition: "vertical", contain: true },
  { id: 4, src: officeDark, alt: "Sky Designers team collaborating in the dark agency workspace", label: "Digital delivery", transition: "slide", position: "center 42%" },
  { id: 5, src: brandCreative, alt: "Sky Designers branding and social media artwork", label: "Creative direction", transition: "glitch", contain: true },
  { id: 6, src: officeBrand, alt: "Sky Designers team members collaborating at computers", label: "Connected team", transition: "zoom", position: "center 45%" },
];
