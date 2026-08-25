import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setDisplay(value); return; }
    setDisplay(0);
    const start = performance.now();
    let frame = 0;
    const update = (time: number) => {
      const progress = Math.min((time - start) / 1000, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);

  return <span ref={ref}><span className="sr-only">{value}{suffix}</span><span aria-hidden="true">{display}{suffix}</span></span>;
};

export default AnimatedCounter;
