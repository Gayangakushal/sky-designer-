import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import officeBg from "@/assets/d.png";

const phrases = [
  "Full-Service Digital Marketing Agency",
  "We Grow Your Brand Online",
  "Results-Driven Strategies",
];

const HeroSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(phrase.slice(0, displayText.length + 1));
          if (displayText.length === phrase.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(phrase.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={officeBg} alt="" className="w-full h-full object-cover scale-[1.02] blur-[3px]" />
        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-blue-950/35 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_42%),linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.58)_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sky-400 font-medium text-sm tracking-widest uppercase mb-6"
        >
          Welcome to Sky Designers
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 min-h-[1.2em]"
        >
          <span className="text-white">{displayText}</span>
          <span className="animate-pulse text-white">|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          We craft data-driven strategies that transform brands and deliver measurable growth across every digital channel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={onBookCall} size="lg" className="bg-primary hover:bg-primary/90 text-white glow-primary text-base px-8">
            Book a Call
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary text-base px-8"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Services
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

<<<<<<< HEAD
export default HeroSection;
=======
export default HeroSection;
>>>>>>> 8fb200d5854998cc504ce09f702283fa8feb1f4e
