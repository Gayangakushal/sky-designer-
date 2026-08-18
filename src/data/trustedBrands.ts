import sitcCampusLogo from "@/assets/logos/brand (1).jpg";
import amsLogo from "@/assets/logos/brand (1).png";
import luluBridalLogo from "@/assets/logos/brand (2).jpg";
import aquaEngineeringLogo from "@/assets/logos/brand (3).jpg";
import liyanaHomesLogo from "@/assets/logos/brand (4).jpg";
import lbcLankaLogo from "@/assets/logos/brand (5).jpg";
import leezaLogo from "@/assets/logos/leeza-lk.jpg";
import maayaCosmeticsLogo from "@/assets/logos/maaya-cosmetics.jpg";
import clickCartLogo from "@/assets/logos/click-cart-lk.jpg";
import fastDealLogo from "@/assets/logos/fast-deal.jpg";
import londonMastersCampusLogo from "@/assets/logos/london-masters-campus.jpg";
import lbcLankaNewLogo from "@/assets/logos/lbc-lanka-new.jpg";

export interface TrustedBrand {
  name: string;
  logo: string;
  alt: string;
}

/** The newly uploaded brand assets used by the public logo marquee. */
export const trustedBrands: TrustedBrand[] = [
  { name: "SITC Campus", logo: sitcCampusLogo, alt: "SITC Campus logo" },
  { name: "AMS", logo: amsLogo, alt: "AMS Connect with Confidence logo" },
  { name: "Lulu Bridal Studio", logo: luluBridalLogo, alt: "Lulu Bridal Studio logo" },
  { name: "Aqua Engineering", logo: aquaEngineeringLogo, alt: "Aqua Engineering logo" },
  { name: "Liyana Homes", logo: liyanaHomesLogo, alt: "Liyana Homes Private Limited logo" },
  { name: "LBC Lanka", logo: lbcLankaLogo, alt: "LBC Lanka Business Corporation logo" },
  { name: "Leeza.lk", logo: leezaLogo, alt: "Leeza.lk logo" },
  { name: "Maaya Cosmetics", logo: maayaCosmeticsLogo, alt: "Maaya Cosmetics logo" },
  { name: "Click Cart", logo: clickCartLogo, alt: "Click Cart.lk logo" },
  { name: "Fast Deal", logo: fastDealLogo, alt: "Fast Deal logo" },
  {
    name: "London Masters Campus",
    logo: londonMastersCampusLogo,
    alt: "London Masters Campus logo",
  },
  {
    name: "LBC Lanka New",
    logo: lbcLankaNewLogo,
    alt: "LBC Lanka Business Corporation gold logo",
  },
];
