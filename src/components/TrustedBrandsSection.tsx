import { motion, useReducedMotion } from "framer-motion";
import { trustedBrands } from "@/data/trustedBrands";
import { MOTION } from "@/lib/motion";

const LogoGroup = ({ duplicate = false }: { duplicate?: boolean }) => (
  <div className="brand-marquee-group" aria-hidden={duplicate || undefined}>
    {trustedBrands.map((brand) => (
      <div
        key={`${duplicate ? "duplicate-" : ""}${brand.name}`}
        className="brand-marquee-item"
        tabIndex={duplicate ? -1 : 0}
        aria-label={duplicate ? undefined : brand.alt}
      >
        <img
          src={brand.logo}
          alt={duplicate ? "" : brand.alt}
          loading="lazy"
          decoding="async"
          className="brand-logo-image w-full object-contain"
        />
      </div>
    ))}
  </div>
);

const TrustedBrandsSection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="trusted-brands-heading"
      className="trusted-brands-section relative overflow-hidden border-y border-white/8 py-[72px] text-white sm:py-20"
    >
      <div
        className="trusted-brands-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="site-container relative mb-10 sm:mb-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : MOTION.reveal, ease: MOTION.ease }}
        >
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
            <span className="h-px w-8 bg-blue-400" aria-hidden="true" />
            Selected clients
          </p>
          <h2
            id="trusted-brands-heading"
            className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] sm:text-3xl"
          >
            Brands that trusted our team.
          </h2>
        </motion.div>
      </div>

      <div className="brand-marquee relative" aria-label="Trusted client brands">
        <div className="brand-marquee-track">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </section>
  );
};

export default TrustedBrandsSection;
