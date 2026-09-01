import { motion } from "framer-motion";
import { company, founder, services, team } from "@/data/siteData";

const entityFacts = [
  { value: String(services.length), label: "Core services" },
  { value: String([founder, ...team].length), label: "Published team profiles" },
  { value: company.location, label: "Operating context" },
  { value: company.registration, label: "Business registration", compact: true },
];

const StatsSection = () => (
  <section className="relative overflow-hidden bg-[#030713] py-16 text-white sm:py-20">
    <div className="blue-grid absolute inset-0 opacity-25" />
    <div className="absolute left-1/2 top-0 h-56 w-1/2 -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
    <div className="site-container relative grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 lg:grid-cols-4">
      {entityFacts.map((fact, index) => (
        <motion.div
          key={fact.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="bg-[#050b18]/90 p-7 sm:p-9"
        >
          <p
            className={`break-words font-heading font-extrabold tracking-[-0.04em] text-white ${fact.compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"}`}
          >
            {fact.value}
          </p>
          <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[0.14em] text-slate-400">
            {fact.label}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
