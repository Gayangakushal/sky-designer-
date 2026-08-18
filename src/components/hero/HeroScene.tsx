import { motion, useReducedMotion } from "framer-motion";
import type { HeroSceneData } from "@/data/heroScenes";

const sceneInitial = {
  fade: { opacity: 0 },
  diagonal: { opacity: 0, clipPath: "polygon(100% 0,100% 0,72% 100%,72% 100%)" },
  vertical: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  slide: { opacity: 0, x: "8%" },
  glitch: { opacity: 0, x: -12, filter: "saturate(1.7) hue-rotate(16deg) contrast(1.15)" },
  zoom: { opacity: 0, scale: 1.1 },
};

const sceneAnimate = {
  fade: { opacity: 1 },
  diagonal: { opacity: 1, clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" },
  vertical: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
  slide: { opacity: 1, x: "0%" },
  glitch: { opacity: 1, x: 0, filter: "saturate(1) hue-rotate(0deg) contrast(1)" },
  zoom: { opacity: 1, scale: 1 },
};

const HeroScene = ({ scene, first }: { scene: HeroSceneData; first: boolean }) => {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 1 } : sceneInitial[scene.transition];
  const animate = reduceMotion ? { opacity: 1 } : sceneAnimate[scene.transition];

  return (
    <motion.div initial={initial} animate={animate} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : scene.transition === "glitch" ? 0.68 : 0.95, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
      {scene.contain && <img src={scene.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl" loading="lazy" />}
      <motion.img
        src={scene.src}
        alt={scene.alt}
        fetchPriority={first ? "high" : "auto"}
        loading={first ? "eager" : "lazy"}
        className={`absolute inset-0 h-full w-full ${scene.contain ? "object-contain p-6 sm:p-12 lg:p-16" : "object-cover"}`}
        style={{ objectPosition: scene.position ?? "center" }}
        initial={reduceMotion ? false : { scale: scene.contain ? 0.98 : 1.035 }}
        animate={reduceMotion ? undefined : { scale: scene.contain ? 1.025 : 1.105 }}
        transition={{ duration: 4.2, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,13,.88)_0%,rgba(7,26,47,.64)_46%,rgba(7,9,13,.18)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090D]/90 via-transparent to-[#071A2F]/45" />
    </motion.div>
  );
};

export default HeroScene;
