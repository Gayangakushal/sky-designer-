import { ArrowUpRight, Copy, Image as ImageIcon, Play } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { postPreviewImage, type ContentPost } from "@/lib/content";

interface WorkCardProps {
  post: ContentPost;
  /** Renders a taller, editorial-sized card. */
  large?: boolean;
}

const WorkCard = ({ post, large = false }: WorkCardProps) => {
  const image = postPreviewImage(post);
  const isPlayable = post.post_type === "video" || post.post_type === "youtube";
  const carouselCount = post.post_type === "carousel" ? (post.media ?? []).length : 0;
  const action = post.post_type === "project" ? "View project" : "View post";

  return (
    <Link
      to={`/work/${post.slug}`}
      data-cursor="VIEW"
      className="premium-card group block h-full overflow-hidden rounded-[24px] border border-white/10 bg-[#07101f] hover:border-blue-400/40 hover:shadow-[0_22px_60px_rgba(0,0,0,.22)]"
    >
      <div
        className={`relative overflow-hidden bg-slate-900 ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}
      >
        {image ? (
          <img
            src={image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
          />
        ) : post.post_type === "video" && post.video_url ? (
          <video src={post.video_url} preload="none" className="h-full w-full object-cover" muted playsInline />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <ImageIcon className="h-10 w-10 text-slate-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {post.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            {post.category.name}
          </span>
        )}

        {isPlayable && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition duration-300 group-hover:scale-110">
              <Play size={22} fill="currentColor" />
            </span>
          </span>
        )}

        {carouselCount > 1 && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
            <Copy size={12} /> {carouselCount}
          </span>
        )}

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={`truncate font-heading font-bold tracking-[-0.025em] text-white ${large ? "text-2xl" : "text-lg"}`}
            >
              {post.title}
            </h3>
            {post.client_name && (
              <p className="mt-1 truncate text-xs text-slate-300">{post.client_name}</p>
            )}
          </div>
          <span className="grid h-10 w-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-slate-950 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      <div className="p-5">
        {post.excerpt && (
          <p className="line-clamp-2 text-sm leading-6 text-slate-400">{post.excerpt}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-300">
          {action} <ArrowUpRight className="arrow-nudge" size={14} />
        </span>
      </div>
    </Link>
  );
};

export default WorkCard;
