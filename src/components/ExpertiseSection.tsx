import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import automotive from "@/assets/gallery/design-1.jpg";
import education from "@/assets/gallery/design-2.jpg";
import travel from "@/assets/gallery/design-3.jpg";
import wellness from "@/assets/gallery/design-4.jpg";
import property from "@/assets/gallery/design-6.jpg";
import MotionReveal from "./MotionReveal";

const sectors = [
  { title: "Automotive Services", image: automotive },
  { title: "Education", image: education },
  { title: "Travel & Tourism", image: travel },
  { title: "Beauty & Wellness", image: wellness },
  { title: "Property", image: property },
];

const ExpertiseSection = () => (
  <section id="expertise" className="bg-[#071A2F] py-20 text-white sm:py-24 lg:py-32">
    <div className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[.65fr_.35fr] lg:items-end">
        <MotionReveal><p className="section-kicker text-[#69AEFF]">Portfolio expertise</p><h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.25rem,4.5vw,4.4rem)] font-bold leading-[1.04]">Creative thinking adapted to different business contexts.</h2></MotionReveal>
        <MotionReveal delay={0.08}><p className="text-base leading-7 text-white/60">These business areas are represented by work already available in the Sky Designers project portfolio.</p><Link to="/graphic-design" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#69AEFF] transition hover:gap-3">View the complete gallery <ArrowUpRight size={17} /></Link></MotionReveal>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-10">
        {sectors.map((sector, index) => <motion.article key={sector.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className={`group relative min-h-[300px] overflow-hidden rounded-xl border border-white/10 ${index < 2 ? "lg:col-span-5" : "lg:col-span-3 first-of-type:lg:col-span-4"} ${index === 2 ? "lg:col-span-4" : ""}`}><img src={sector.image} alt={`Sky Designers work for ${sector.title}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-black/10 to-transparent" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#69AEFF]">Area 0{index + 1}</p><h3 className="mt-2 font-heading text-xl font-semibold sm:text-2xl">{sector.title}</h3></div><span className="grid h-10 w-10 place-items-center rounded-lg border border-white/25 bg-black/25 backdrop-blur"><ArrowUpRight size={17} /></span></div></motion.article>)}
      </div>
    </div>
  </section>
);

export default ExpertiseSection;
