import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION, revealTransition } from "@/lib/motion";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  amount?: number;
}

const MotionReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = MOTION.viewport.amount,
}: MotionRevealProps) => {
  const reduceMotion = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -24, y: 0, scale: 1 }
      : direction === "right"
        ? { x: 24, y: 0, scale: 1 }
        : direction === "scale"
          ? { x: 0, y: 0, scale: 0.98 }
          : { x: 0, y: 18, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={reduceMotion ? { duration: 0 } : revealTransition(delay)}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;
