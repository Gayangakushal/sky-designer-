import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION } from "@/lib/motion";

const ImageReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduceMotion ? false : { clipPath: "inset(12% 0 0 0 round 28px)", opacity: 0.6 }}
      whileInView={{ clipPath: "inset(0% 0 0 0 round 28px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : MOTION.cinematic, delay, ease: MOTION.ease }}
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 1.055 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : MOTION.cinematic, delay, ease: MOTION.ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ImageReveal;
