import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { MOTION } from "@/lib/motion";

interface TextRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "line" | "soft";
}

const TextReveal = ({
  children,
  as = "div",
  className,
  delay = 0,
  variant = "line",
}: TextRevealProps) => {
  const reduceMotion = useReducedMotion();
  const Component = motion.create(as);

  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <Component
        initial={
          reduceMotion
            ? false
            : { opacity: variant === "soft" ? 0 : 1, y: variant === "line" ? "108%" : 20 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: reduceMotion ? 0 : MOTION.reveal, delay, ease: MOTION.ease }}
      >
        {children}
      </Component>
    </span>
  );
};

export default TextReveal;
