import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import design1 from "@/assets/gallery/design-1.jpg";
import design2 from "@/assets/gallery/design-2.jpg";
import design3 from "@/assets/gallery/design-3.jpg";
import design4 from "@/assets/gallery/design-4.jpg";
import design5 from "@/assets/gallery/design-5.jpg";
import design6 from "@/assets/gallery/design-6.jpg";

const galleryItems = [
  { src: design1, title: "Auto Recovery Service", category: "Social Media Post" },
  { src: design2, title: "Study in Singapore", category: "Education Campaign" },
  { src: design3, title: "Travel Package – Shimla/Manali", category: "Travel Flyer" },
  { src: design4, title: "Beauty Salon & Spa", category: "Branding Design" },
  { src: design5, title: "Restaurant Grand Opening", category: "Event Promotion" },
  { src: design6, title: "Real Estate Listing", category: "Property Ad" },
];

const GraphicDesignGallery = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl font-bold text-gradient-primary">
            Sky Designers<span className="text-accent">.</span>
          </Link>
          <Button asChild variant="outline" size="sm" className="border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
              Our Gallery
            </h1>
            <p className="text-accent text-lg md:text-xl italic">
              "Where Creativity Takes Shape, Designs Come to Life."
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-xs text-accent font-medium uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicDesignGallery;
