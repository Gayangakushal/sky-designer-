import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Image, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  created_at: string;
}

const PortfolioSection = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data as PortfolioItem[]);
      });
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-primary">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Check out some of our recent projects and results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group cursor-pointer"
            >
              <div className="relative aspect-video bg-secondary overflow-hidden">
                {item.media_type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <video src={item.media_url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                      <Play className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-foreground font-bold mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
