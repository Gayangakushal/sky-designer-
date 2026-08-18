import { motion, useReducedMotion } from "framer-motion";
import { Activity, MousePointerClick } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const points = [
  { x: 32, y: 178 }, { x: 116, y: 158 }, { x: 202, y: 171 },
  { x: 290, y: 112 }, { x: 378, y: 126 }, { x: 464, y: 68 }, { x: 548, y: 48 },
];
const linePath = "M32 178 C72 178 80 158 116 158 C153 158 166 171 202 171 C244 171 250 112 290 112 C328 112 344 126 378 126 C414 126 425 68 464 68 C500 68 515 48 548 48";
const areaPath = `${linePath} L548 208 L32 208 Z`;

const MarketingGrowthChart = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mt-8 rounded-xl border border-white/12 bg-[#091E34] p-3 sm:p-5" aria-label="Illustrative campaign growth preview, not actual client performance">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/42">Illustrative campaign growth preview</p><span className="rounded-full border border-[#F2C94C]/25 bg-[#F2C94C]/10 px-2.5 py-1 text-[9px] font-bold text-[#F2C94C]">Demo interface data</span></div>
      <div className="relative overflow-hidden rounded-lg border border-white/[.07] bg-[#071A2F]">
        <svg viewBox="0 0 580 235" className="h-auto min-h-[210px] w-full" role="img" aria-label="Animated illustrative line chart trending upward">
          <defs><linearGradient id="marketing-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2D8CFF" stopOpacity=".34" /><stop offset="1" stopColor="#2D8CFF" stopOpacity="0" /></linearGradient><linearGradient id="marketing-line" x1="0" x2="1"><stop stopColor="#1769E0" /><stop offset="1" stopColor="#69AEFF" /></linearGradient></defs>
          {[35, 78, 121, 164, 207].map((y) => <motion.line key={`h${y}`} x1="26" x2="556" y1={y} y2={y} stroke="white" strokeOpacity=".08" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.08, duration: 0.55 }} />)}
          {[32, 116, 202, 290, 378, 464, 548].map((x) => <motion.line key={`v${x}`} x1={x} x2={x} y1="25" y2="208" stroke="white" strokeOpacity=".055" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.08, duration: 0.55 }} />)}
          <motion.line x1="26" x2="556" y1="208" y2="208" stroke="white" strokeOpacity=".22" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} />
          <motion.path d={areaPath} fill="url(#marketing-area)" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 0.7, duration: 0.65 }} />
          <motion.path d={linePath} fill="none" stroke="url(#marketing-line)" strokeWidth="4" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 0.25, duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }} />
          {points.map((point, index) => <motion.circle key={point.x} cx={point.x} cy={point.y} r={index === 5 ? 6 : 4.5} fill={index === 5 ? "#F2C94C" : "#2D8CFF"} stroke="#071A2F" strokeWidth="3" initial={reduceMotion ? false : { opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 0.46 + index * 0.1, duration: 0.35 }} />)}
        </svg>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 0.9, duration: 0.5 }} className="absolute right-3 top-3 rounded-lg border border-white/10 bg-[#11151C]/90 px-3 py-2 shadow-xl backdrop-blur"><p className="text-[8px] font-bold uppercase tracking-[.16em] text-white/40">Illustrative index</p><p className="mt-1 font-heading text-xl font-bold text-white"><AnimatedCounter value={74} /><span className="text-xs font-medium text-white/35"> / 100</span></p></motion.div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 1.0 }} className="flex items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.04] p-3"><Activity size={15} className="text-[#69AEFF]" /><div><p className="text-[8px] uppercase tracking-[.14em] text-white/35">Audience signals</p><p className="mt-0.5 text-[11px] font-semibold text-white/75">Monitoring active</p></div></motion.div>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 1.1 }} className="flex items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.04] p-3"><MousePointerClick size={15} className="text-[#F2C94C]" /><div><p className="text-[8px] uppercase tracking-[.14em] text-white/35">Creative testing</p><p className="mt-0.5 text-[11px] font-semibold text-white/75">Review cycle</p></div></motion.div>
      </div>
    </div>
  );
};

export default MarketingGrowthChart;
