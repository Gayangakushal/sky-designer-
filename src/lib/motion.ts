import type { Transition, Variants } from "framer-motion";

/** Shared motion language for every Sky Designers surface. */
export const MOTION = {
  fast: 0.18,
  normal: 0.4,
  reveal: 0.65,
  cinematic: 0.9,
  route: 0.52,
  stagger: 0.08,
  ease: [0.22, 1, 0.36, 1] as const,
  viewport: { once: true, amount: 0.18 } as const,
};

export const revealTransition = (delay = 0): Transition => ({
  duration: MOTION.reveal,
  delay,
  ease: MOTION.ease,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06, staggerChildren: MOTION.stagger },
  },
};
