import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MOTION } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const HeroSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { settings } = useSiteSettings();
  const heroSettings = settings["hero"] ?? {};
  const headingWords = (heroSettings["heading"] || "Full-Service Digital Growth Partner")
    .trim()
    .split(/\s+/);
  const headingSplit = Math.ceil(headingWords.length / 2);
  const headingLineOne = headingWords.slice(0, headingSplit).join(" ");
  const headingLineTwo = headingWords.slice(headingSplit).join(" ");
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const firstLineX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", reduceMotion || isMobile ? "0vw" : "-35vw"],
  );
  const secondLineX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", reduceMotion || isMobile ? "0vw" : "35vw"],
  );

  useEffect(() => {
    if (reduceMotion) return;
    let timerId: ReturnType<typeof globalThis.setTimeout> | undefined;
    const activationEvents = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    const startVideo = () => {
      const video = videoRef.current;
      if (!video || video.src) return;
      video.src = window.matchMedia("(max-width: 767px)").matches
        ? "/videos/hero-background-mobile.mp4"
        : "/videos/hero-background-optimized.mp4";
      video.load();
      void video.play().catch(() => undefined);
    };
    const scheduleVideo = () => {
      for (const eventName of activationEvents) {
        window.addEventListener(eventName, startVideo, { once: true, passive: true });
      }
      timerId = globalThis.setTimeout(startVideo, 6_000);
    };
    if (document.readyState === "complete") scheduleVideo();
    else window.addEventListener("load", scheduleVideo, { once: true });
    return () => {
      window.removeEventListener("load", scheduleVideo);
      for (const eventName of activationEvents) {
        window.removeEventListener(eventName, startVideo);
      }
      if (timerId !== undefined) globalThis.clearTimeout(timerId);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[92svh] overflow-hidden bg-[#020713] text-white lg:min-h-[100svh]"
    >
      <div className="absolute inset-0 z-[0]" aria-hidden="true">
        <img
          src="/images/hero-video-poster.webp"
          alt=""
          width={1280}
          height={720}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="absolute inset-0 z-[0] h-full w-full object-cover object-center"
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 z-[0] h-full w-full object-cover object-center transition-opacity duration-500 ${videoPlaying ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/hero-video-poster.webp"
          tabIndex={-1}
          onPlaying={() => setVideoPlaying(true)}
          onCanPlay={(event) => void event.currentTarget.play().catch(() => undefined)}
          onEnded={(event) => void event.currentTarget.play()}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,12,31,.68)_0%,rgba(5,22,52,.72)_55%,rgba(4,15,36,.82)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_45%,rgba(22,119,255,.12),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#020713] to-transparent" />
      </div>

      <div className="site-container relative z-[2] flex flex-1 items-center justify-center pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.12,
                staggerChildren: reduceMotion ? 0 : 0.12,
              },
            },
          }}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : MOTION.reveal, ease: MOTION.ease }}
            className="inline-flex items-center gap-3 text-[0.65rem] font-extrabold uppercase tracking-[0.3em] text-blue-300 sm:text-xs"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400" />
            {heroSettings["badge"] || "Welcome to Sky Designers"}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400" />
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={{
              hidden: { opacity: 1, y: 0 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : MOTION.cinematic, ease: MOTION.ease }}
            className="mt-7 max-w-5xl text-balance font-heading text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,.35)] min-[430px]:text-[2.65rem] sm:text-6xl lg:text-[clamp(4.5rem,6.5vw,6.5rem)]"
          >
            <motion.span className="block" style={{ x: firstLineX }}>
              {headingLineOne}
            </motion.span>
            <motion.span
              className="mt-1 block bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(79,157,255,.12)]"
              style={{
                x: secondLineX,
                backgroundImage:
                  "linear-gradient(90deg, #ffffff 0%, #dcecff 25%, #9dcbff 50%, #4f9dff 70%, #dcecff 90%, #ffffff 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
              }}
              animate={
                reduceMotion
                  ? { backgroundPosition: "0% 50%" }
                  : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 7, ease: "easeInOut", repeat: Infinity }
              }
            >
              {headingLineTwo}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : MOTION.reveal, ease: MOTION.ease }}
            className="mt-7 max-w-2xl text-balance text-sm leading-7 text-slate-200/85 sm:text-lg sm:leading-8"
          >
            {heroSettings["description"] ||
              "We craft data-driven strategies that transform brands and deliver measurable growth across every digital channel."}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduceMotion ? 0 : MOTION.reveal, ease: MOTION.ease }}
            className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={onBookCall}
              className="button-shine group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#0a6cff] px-8 text-sm font-extrabold text-white shadow-[0_16px_45px_rgba(10,108,255,.38)] transition duration-300 hover:-translate-y-1 hover:bg-[#1980ff] hover:shadow-[0_20px_55px_rgba(10,108,255,.52)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020713]"
            >
              Book a Call
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <a
              href="#services"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/30 bg-[#031023]/55 px-8 text-sm font-extrabold text-white shadow-[0_14px_40px_rgba(0,0,0,.2)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/65 hover:bg-white/[0.1] hover:text-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020713]"
            >
              View Services
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.1, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-blue-300 sm:flex"
      >
        Explore
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            animate={reduceMotion ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-blue-300"
          />
        </span>
      </motion.a>
    </section>
  );
};

export default HeroSection;
