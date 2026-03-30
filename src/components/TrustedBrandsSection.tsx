import { motion } from "framer-motion";


import logoWhatsapp1 from "@/assets/logos/whatsapp1.jpg";
import logoWhatsapp2 from "@/assets/logos/whatsapp2.jpg";
import logoWhatsapp3 from "@/assets/logos/whatsapp3.jpg";
import logoFb1 from "@/assets/logos/fb1.jpg";
import logoFb2 from "@/assets/logos/fb2.jpg";
import logoFb3 from "@/assets/logos/fb3.jpg";
import logoFb4 from "@/assets/logos/fb4.jpg";
import logoFb5 from "@/assets/logos/fb5.jpg";
import logoFb6 from "@/assets/logos/fb6.jpg";
import logoFb7 from "@/assets/logos/fb7.jpg";
import logoFb8 from "@/assets/logos/fb8.jpg";
import logoFb9 from "@/assets/logos/fb9.jpg";
import logoFb10 from "@/assets/logos/fb10.jpg";
import logoFb11 from "@/assets/logos/fb11.jpg";
import logoFb12 from "@/assets/logos/fb12.jpg";
import logoFb13 from "@/assets/logos/fb13.jpg";
import logoFb14 from "@/assets/logos/fb14.jpg";

const logos = [
  { src: logoWhatsapp1, alt: "Trusted Brand 1" },
  { src: logoWhatsapp2, alt: "Trusted Brand 2" },
  { src: logoWhatsapp3, alt: "Trusted Brand 3" },
  { src: logoFb1, alt: "Trusted Brand 4" },
  { src: logoFb2, alt: "Trusted Brand 5" },
  { src: logoFb3, alt: "Trusted Brand 6" },
  { src: logoFb4, alt: "Trusted Brand 7" },
  { src: logoFb5, alt: "Trusted Brand 8" },
  { src: logoFb6, alt: "Trusted Brand 9" },
  { src: logoFb7, alt: "Trusted Brand 10" },
  { src: logoFb8, alt: "Trusted Brand 11" },
  { src: logoFb9, alt: "Trusted Brand 12" },
  { src: logoFb10, alt: "Trusted Brand 13" },
  { src: logoFb11, alt: "Trusted Brand 14" },
  { src: logoFb12, alt: "Trusted Brand 15" },
  { src: logoFb13, alt: "Trusted Brand 16" },
  { src: logoFb14, alt: "Trusted Brand 17" },
];

const TrustedBrandsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-muted-foreground text-sm font-medium tracking-wide">
          Trusted by <span className="text-foreground font-bold">500+</span> Global Brands{" "}
          <span className="text-muted-foreground">(and counting)</span>
        </p>
      </motion.div>

      {/* Scrolling marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee gap-16 items-center">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex-shrink-0 w-28 h-28 rounded-full overflow-hidden bg-card border border-border flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrandsSection;
