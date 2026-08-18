import { motion, useReducedMotion } from "framer-motion";

const ServiceTag = ({ label, index, dark = false }: { label: string; index: number; dark?: boolean }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: reduceMotion ? 0 : 0.16 + index * 0.06, duration: 0.45 }}
      className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors sm:text-xs ${dark ? "border-white/15 bg-white/[.06] text-white/68 group-hover:border-[#2D8CFF]/45 group-hover:text-white" : "border-[#C8D5E2] bg-white/75 text-[#33465A] group-hover:border-primary/45 group-hover:text-[#071A2F]"}`}
    >
      {label}
    </motion.span>
  );
};

export default ServiceTag;
