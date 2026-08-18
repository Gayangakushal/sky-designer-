import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Code2, Gauge, LayoutTemplate } from "lucide-react";

const TechnologyVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const ready = active || reduceMotion;

  return (
    <div ref={ref} className="relative mx-auto mt-8 min-h-[340px] w-full max-w-[760px] overflow-hidden rounded-xl border border-white/10 bg-[#061627] sm:min-h-[440px]" role="img" aria-label="Animated connected web technology system">
      <div className="agency-grid absolute inset-0 opacity-20" />
      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2D8CFF]/25 sm:h-[350px] sm:w-[350px]">
        <motion.div animate={ready && !reduceMotion ? { rotate: 8 } : { rotate: 0 }} transition={{ delay: 0.35, duration: 1.2 }} className="absolute inset-8 rounded-full border border-dashed border-[#2D8CFF]/30" />
        {[0, 90, 180, 270].map((rotation, index) => <motion.span key={rotation} initial={reduceMotion ? false : { opacity: 0, scale: 0 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.42 + index * 0.12 }} className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-[#2D8CFF] shadow-[0_0_0_5px_rgba(45,140,255,.12)]" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-134px)` }} />)}
      </motion.div>

      <svg viewBox="0 0 760 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[[380,220,120,80],[380,220,650,94],[380,220,120,352],[380,220,650,342]].map((line, index) => <motion.line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke={index === 1 ? "#D4A72C" : "#2D8CFF"} strokeOpacity=".45" strokeWidth="1.5" strokeDasharray="5 7" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={ready ? { pathLength: 1, opacity: 1 } : {}} transition={{ delay: 0.35 + index * 0.1, duration: 0.8 }} />)}
      </svg>

      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }} animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: reduceMotion ? 0 : 0.55, duration: 0.7 }} className="absolute left-1/2 top-1/2 w-[210px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-[#11151C] shadow-2xl sm:w-[300px]">
        <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2"><span className="h-1.5 w-1.5 rounded-full bg-white/25" /><span className="h-1.5 w-1.5 rounded-full bg-white/25" /><span className="h-1.5 w-1.5 rounded-full bg-[#F2C94C]" /></div>
        <div className="p-4 sm:p-5"><div className="h-2 w-14 rounded-full bg-[#2D8CFF]" /><div className="mt-3 h-5 w-4/5 rounded bg-white/80" /><div className="mt-2 h-2 w-full rounded bg-white/15" /><div className="mt-1.5 h-2 w-3/4 rounded bg-white/10" /><div className="mt-5 grid grid-cols-3 gap-2"><span className="h-12 rounded bg-[#1769E0]/25" /><span className="h-12 rounded bg-white/[.06]" /><span className="h-12 rounded bg-white/[.06]" /></div></div>
      </motion.div>

      {[
        { icon: Code2, label: "Development", pos: "left-3 top-5 sm:left-8 sm:top-9" },
        { icon: Gauge, label: "Performance", pos: "right-3 top-7 sm:right-8 sm:top-12" },
        { icon: LayoutTemplate, label: "Responsive UI", pos: "bottom-5 left-3 sm:bottom-10 sm:left-8" },
        { icon: BarChart3, label: "Analytics", pos: "bottom-7 right-3 sm:bottom-12 sm:right-8" },
      ].map((card, index) => <motion.div key={card.label} initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={ready ? { opacity: 1, y: reduceMotion ? 0 : [0, index % 2 ? -3 : 3, 0] } : {}} transition={reduceMotion ? { duration: 0 } : { opacity: { delay: 0.68 + index * 0.1, duration: 0.45 }, y: { delay: 1.3 + index * 0.08, duration: 4.2, repeat: Infinity, ease: "easeInOut" } }} className={`absolute flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B2A4A]/90 px-3 py-2 text-[9px] font-semibold text-white/70 shadow-lg backdrop-blur sm:text-xs ${card.pos}`}><card.icon size={14} className={index === 1 ? "text-[#F2C94C]" : "text-[#69AEFF]"} />{card.label}</motion.div>)}
    </div>
  );
};

export default TechnologyVisual;
