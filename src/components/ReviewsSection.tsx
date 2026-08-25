import { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/common/SectionHeading";
import { useNearViewport } from "@/hooks/useNearViewport";

const ReviewsSection = () => {
  const { ref, isNear } = useNearViewport<HTMLElement>("400px");
  useEffect(() => {
    if (!isNear) return;
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isNear]);

  return (
    <section ref={ref} id="reviews" className="section-space bg-slate-50">
      <div className="site-container">
        <SectionHeading eyebrow="Client feedback" title="The experience matters as much as the final result." description="Live reviews are loaded from the review widget already connected to this project." align="center" />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,.07)] sm:p-8">
          <div className="elfsight-app-3bd68d52-54ac-44cc-a497-acd3ab5cb73f" />
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
