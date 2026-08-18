import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Image as ImageIcon, Play } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { projects as fallbackProjects } from "@/data/siteData";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id?: string;
  title: string;
  description: string | null;
  media_url?: string;
  media_type?: string;
  image?: string;
  category?: string;
}

const PortfolioSection = () => {
  const [remoteItems, setRemoteItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    let active = true;
    supabase
      .from("portfolio_items")
      .select("id,title,description,media_url,media_type")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (active && data?.length) setRemoteItems(data as PortfolioItem[]);
      });
    return () => { active = false; };
  }, []);

  const items = useMemo<PortfolioItem[]>(() => remoteItems.length ? remoteItems : fallbackProjects, [remoteItems]);

  return (
    <section id="portfolio" className="section-space bg-[#030713] text-white">
      <div className="site-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Selected work" title="Creative work designed to make an immediate impression." description="A selection of social media and campaign design work included in the current project." light />
          <a href="/graphic-design" className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-white/10">View design gallery <ArrowUpRight size={17} /></a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {items.map((item, index) => {
            const image = item.media_url || item.image || "";
            const isVideo = item.media_type === "video";
            const wide = index === 0 || index === 5;
            return (
              <motion.article key={item.id || item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: (index % 3) * 0.07 }} className={`group overflow-hidden rounded-[24px] border border-white/10 bg-[#07101f] ${wide ? "lg:col-span-7" : "lg:col-span-5"}`}>
                <div className={`relative overflow-hidden bg-slate-900 ${wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  {isVideo ? (
                    <video src={image} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" muted playsInline />
                  ) : image ? (
                    <img src={image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="grid h-full w-full place-items-center"><ImageIcon className="h-10 w-10 text-slate-600" /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                  {isVideo && <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur"><Play size={16} fill="currentColor" /></span>}
                  <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-white text-slate-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={17} /></span>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">{item.category || item.media_type || "Creative project"}</p>
                  <h3 className="mt-3 font-heading text-xl font-bold tracking-[-0.025em]">{item.title}</h3>
                  {item.description && <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
