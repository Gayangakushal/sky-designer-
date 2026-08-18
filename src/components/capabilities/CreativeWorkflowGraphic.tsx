import { motion, useReducedMotion } from "framer-motion";

const path = "M38 194 C112 194 112 62 194 75 C278 88 267 184 356 154 C431 129 435 52 566 68";
const nodes = [
  { x: 38, y: 194, label: "Brief", gold: false },
  { x: 194, y: 75, label: "Direction", gold: true },
  { x: 356, y: 154, label: "Create", gold: false },
  { x: 566, y: 68, label: "Deliver", gold: false },
];

const CreativeWorkflowGraphic = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-[#CED9E5] bg-white/70 p-3 sm:p-5" role="img" aria-label="Creative workflow from brief through direction and creation to delivery">
      <svg viewBox="0 0 610 245" className="h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="creative-line" x1="0" x2="1"><stop stopColor="#1769E0" /><stop offset="1" stopColor="#2D8CFF" /></linearGradient>
        </defs>
        {[55, 115, 175].map((y) => <motion.line key={y} x1="18" x2="592" y1={y} y2={y} stroke="#D9E3ED" strokeWidth="1" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 0.75 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55 }} />)}
        <motion.path d={path} fill="none" stroke="url(#creative-line)" strokeWidth="4" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }} />
        {nodes.map((node, index) => <g key={node.label}><motion.circle cx={node.x} cy={node.y} r="9" fill={node.gold ? "#D4A72C" : "#1769E0"} stroke="white" strokeWidth="5" initial={reduceMotion ? false : { opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 0.24 + index * 0.18, duration: 0.45 }} /><motion.text x={node.x} y={node.y + (node.y < 100 ? -22 : 30)} textAnchor="middle" fill="#33465A" fontSize="12" fontWeight="700" initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: reduceMotion ? 0 : 0.35 + index * 0.18 }}>{node.label}</motion.text></g>)}
        <motion.circle r="5" fill="#F2C94C" stroke="#071A2F" strokeWidth="2" initial={{ cx: 38, cy: 194, opacity: reduceMotion ? 1 : 0 }} whileInView={reduceMotion ? { opacity: 1 } : { cx: [38, 108, 194, 275, 356, 454, 566], cy: [194, 135, 75, 126, 154, 88, 68], opacity: [0, 1, 1, 1, 1, 1, 1] }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.12, duration: 1.35, ease: "easeInOut" }} />
      </svg>
    </div>
  );
};

export default CreativeWorkflowGraphic;
