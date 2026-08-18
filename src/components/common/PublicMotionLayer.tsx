import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const PublicMotionLayer = ({ disabled = false }: { disabled?: boolean }) => {
  const reduceMotion = useReducedMotion();
  const cursor = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 170, damping: 30, mass: 0.25 });

  useEffect(() => {
    if (
      disabled ||
      reduceMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const move = (event: PointerEvent) => {
      if (!cursor.current) return;
      cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      setVisible(true);
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        "a,button,video,[data-cursor]",
      );
      setActive(Boolean(target));
      setLabel(target?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
    };
  }, [disabled, reduceMotion]);

  if (disabled) return null;
  return (
    <>
      <motion.div className="public-scroll-progress" style={{ scaleX }} />
      {!reduceMotion && (
        <div
          ref={cursor}
          aria-hidden="true"
          className={`agency-cursor ${visible ? "is-visible" : ""} ${active ? "is-active" : ""} ${label ? "has-label" : ""}`}
        >
          {label}
        </div>
      )}
    </>
  );
};

export default PublicMotionLayer;
