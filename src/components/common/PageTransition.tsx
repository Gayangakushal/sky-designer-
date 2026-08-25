import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION } from "@/lib/motion";

const PageTransition = ({
  children,
  animateEntrance = true,
}: {
  children: ReactNode;
  animateEntrance?: boolean;
}) => {
  const reduceMotion = useReducedMotion();
  if (!animateEntrance) return <div>{children}</div>;
  return (
    <>
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[200] origin-top bg-[#020817]"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.48, ease: MOTION.ease }}
        />
      )}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : MOTION.route,
          delay: reduceMotion ? 0 : 0.08,
          ease: MOTION.ease,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
