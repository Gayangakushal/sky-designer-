import { motion, useReducedMotion } from "framer-motion";
import { trustedBrands } from "@/data/trustedBrands";

const TrustedBrandsStrip = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="border-b border-[#D7E0EA] bg-[#F5F7FA]" aria-label="Trusted client brands">
      <div className="section-shell">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[auto_repeat(5,1fr)]">
          <div className="col-span-2 flex items-center border-b border-[#D7E0EA] py-3 pr-5 sm:col-span-3 lg:col-span-1 lg:border-b-0 lg:border-r"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#526477]">Trusted by selected brands</p></div>
          {trustedBrands.map((brand, index) => <motion.div key={brand.name} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.45 + index * 0.08 }} className={`flex min-h-20 items-center justify-center border-r border-[#D7E0EA] p-3 last:border-r-0 sm:min-h-24 ${index === trustedBrands.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}><img src={brand.logo} alt={brand.alt ?? `${brand.name} logo`} className="h-12 w-full object-contain mix-blend-multiply grayscale transition duration-300 hover:grayscale-0 sm:h-14" loading="lazy" /></motion.div>)}
        </div>
      </div>
    </div>
  );
};

export default TrustedBrandsStrip;
