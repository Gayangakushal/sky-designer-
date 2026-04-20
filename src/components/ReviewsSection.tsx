import { motion } from "framer-motion";
import { useEffect } from "react";

const ReviewsSection = () => {
  useEffect(() => {
    const scriptId = "elfsight-platform-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="reviews" className="relative bg-[#020520] py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sky-400">Testimonials</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">What Clients Say</h2>
        </motion.div>

        <div className="mb-8">
          <div className="elfsight-app-3bd68d52-54ac-44cc-a497-acd3ab5cb73f" />
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
