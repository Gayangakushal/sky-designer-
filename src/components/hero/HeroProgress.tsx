import { motion, useReducedMotion } from "framer-motion";

const HeroProgress = ({ total, current, duration, paused, onSelect }: { total: number; current: number; duration: number; paused: boolean; onSelect: (index: number) => void }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-center gap-3" aria-label={`Hero scene ${current + 1} of ${total}`}>
      <span className="text-[9px] font-bold tabular-nums tracking-[.18em] text-white/50">0{current + 1} / 0{total}</span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, index) => <button key={index} type="button" onClick={() => onSelect(index)} className="group relative h-6 w-7" aria-label={`Show hero scene ${index + 1}`} aria-current={current === index ? "true" : undefined}><span className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-colors ${current === index ? "bg-white/25" : "bg-white/15 group-hover:bg-white/45"}`} />{current === index && <motion.span key={`${current}-${paused}`} initial={{ scaleX: 0 }} animate={{ scaleX: paused || reduceMotion ? 1 : 1 }} transition={{ duration: paused || reduceMotion ? 0 : duration, ease: "linear" }} className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 origin-left bg-[#F2C94C]" />}</button>)}
      </div>
    </div>
  );
};

export default HeroProgress;
