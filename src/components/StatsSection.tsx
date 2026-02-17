import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, PenSquare, BadgeCheck, Award } from "lucide-react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Happy Customers" },
  { icon: PenSquare, value: 100, suffix: "+", label: "Project Complete" },
  { icon: BadgeCheck, value: 350, suffix: "+", label: "Registered Member" },
  { icon: Award, value: 20, suffix: "+", label: "Awards Winning" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading text-3xl md:text-4xl font-bold text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <stat.icon className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto mb-4" strokeWidth={1.5} />
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
