import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Compass,
  PenTool,
  Rocket,
  Route,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { processSteps } from "@/data/siteData";
import { MOTION } from "@/lib/motion";

const stepIcons: LucideIcon[] = [Compass, Route, PenTool, Rocket, TrendingUp];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleStep = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleStep) {
          setActiveStep(Number((visibleStep.target as HTMLElement).dataset.step));
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-30% 0px -30% 0px",
      },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="process-heading"
      className="relative overflow-clip bg-[linear-gradient(135deg,#f7faff_0%,#ffffff_48%,#f3f7ff_100%)] py-24 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="site-container relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(520px,1.22fr)] lg:gap-20 xl:gap-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={MOTION.viewport}
              transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Our process
                </p>
              </div>
              <h2
                id="process-heading"
                className="max-w-xl text-balance font-heading text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
              >
                How we turn ideas into <span className="text-primary">measurable growth.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                You always know what we are working on, why it matters, and what comes next.
              </p>

              <div className="mt-10 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 lg:flex">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-primary shadow-sm">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                Follow the journey
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div
              className="absolute bottom-10 left-7 top-10 w-px bg-slate-200 sm:left-9"
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-px origin-top bg-gradient-to-b from-blue-400 via-primary to-blue-700"
                animate={{
                  scaleY: processSteps.length > 1 ? activeStep / (processSteps.length - 1) : 1,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: MOTION.normal, ease: MOTION.ease }
                }
              />
            </div>

            <div className="space-y-5 sm:space-y-7">
              {processSteps.map((step, index) => {
                const Icon = stepIcons[index];
                const isActive = index === activeStep;
                const isComplete = index < activeStep;

                return (
                  <motion.div
                    key={step.number}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    data-step={index}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: MOTION.reveal,
                      delay: prefersReducedMotion ? 0 : index * 0.06,
                      ease: MOTION.ease,
                    }}
                    className="relative pl-16 sm:pl-20"
                  >
                    <motion.div
                      animate={{
                        scale: isActive && !prefersReducedMotion ? 1.025 : 1,
                        y: 0,
                      }}
                      transition={{ duration: MOTION.normal, ease: MOTION.ease }}
                      className={`group relative min-h-40 overflow-hidden rounded-[1.75rem] border p-6 transition-[background-color,border-color,box-shadow,color] duration-500 sm:min-h-44 sm:p-8 ${
                        isActive
                          ? "border-blue-600/30 bg-[#071a3d] text-white shadow-[0_24px_70px_rgba(7,26,61,0.22)]"
                          : isComplete
                            ? "border-blue-200 bg-blue-50/90 text-slate-950 shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
                            : "border-slate-200/90 bg-white/80 text-slate-950 shadow-[0_12px_34px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                      }`}
                    >
                      <div
                        className={`pointer-events-none absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/3 rounded-full transition-colors duration-500 ${
                          isActive ? "bg-blue-500/20" : "bg-blue-50"
                        }`}
                      />

                      <div className="relative flex items-start justify-between gap-5">
                        <div>
                          <p
                            className={`text-[0.68rem] font-bold uppercase tracking-[0.24em] transition-colors duration-500 ${
                              isActive ? "text-blue-300" : "text-primary"
                            }`}
                          >
                            Step {step.number}
                          </p>
                          <h3 className="mt-3 font-heading text-2xl font-bold tracking-[-0.025em] sm:text-[1.7rem]">
                            {step.title}
                          </h3>
                          <motion.p
                            animate={{ opacity: isActive ? 1 : 0.72, y: isActive ? 0 : 3 }}
                            transition={{ duration: prefersReducedMotion ? 0 : MOTION.normal }}
                            className={`mt-3 max-w-md text-sm leading-6 sm:text-base ${
                              isActive ? "text-blue-50/85" : "text-slate-600"
                            }`}
                          >
                            {step.description}
                          </motion.p>
                        </div>

                        <motion.div
                          animate={{ rotate: isActive && !prefersReducedMotion ? -5 : 0 }}
                          transition={{ duration: MOTION.normal, ease: MOTION.ease }}
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-colors duration-500 sm:h-14 sm:w-14 ${
                            isActive
                              ? "border-blue-400/40 bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                              : isComplete
                                ? "border-blue-200 bg-white text-primary"
                                : "border-slate-200 bg-slate-50 text-slate-400"
                          }`}
                        >
                          <Icon
                            className="h-5 w-5 sm:h-6 sm:w-6"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      aria-hidden="true"
                      animate={{
                        scale: isActive && !prefersReducedMotion ? 1.12 : 1,
                        backgroundColor: isActive ? "#0a5bde" : isComplete ? "#dbeafe" : "#071a3d",
                        color: isActive ? "#ffffff" : isComplete ? "#0a5bde" : "#bfdbfe",
                      }}
                      transition={{ duration: MOTION.normal, ease: MOTION.ease }}
                      className={`absolute left-0 top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-4 border-white font-heading text-xs font-extrabold shadow-lg sm:h-[4.5rem] sm:w-[4.5rem] sm:text-sm ${
                        isActive ? "shadow-[0_0_32px_rgba(10,91,222,0.45)]" : ""
                      }`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isComplete ? (
                          <motion.span
                            key="complete"
                            initial={prefersReducedMotion ? false : { scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            <Check className="h-5 w-5" strokeWidth={2.5} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="number"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {step.number}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
