import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const stats = [
  { value: 117, suffix: "", label: "Projects completed" },
  { value: 17, suffix: "+", label: "Client brands represented" },
  { value: 7, suffix: "", label: "Team specialists" },
  { value: 2020, suffix: "", label: "Registered since" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setCount(value);
      return;
    }
    if (value === 2020) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        setCount(0);
        const start = performance.now();
        const duration = 1200;
        const update = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          setCount(Math.floor(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, value]);

  return (
    <div
      ref={ref}
      className="font-heading text-4xl font-extrabold tracking-[-0.05em] text-white sm:text-5xl"
    >
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true">{count}{suffix}</span>
    </div>
  );
};

const StatsSection = () => (
  <section className="relative overflow-hidden bg-[#030713] py-16 text-white sm:py-20">
    <div className="blue-grid absolute inset-0 opacity-25" />
    <div className="absolute left-1/2 top-0 h-56 w-1/2 -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
    <div className="site-container relative grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="bg-[#050b18]/90 p-7 sm:p-9"
        >
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[0.14em] text-slate-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
