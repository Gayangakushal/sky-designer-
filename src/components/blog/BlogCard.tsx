import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "@/lib/router-compat";
import type { BlogPost } from "@/types/blog";
import { formatBlogDate, getBlogImageUrl, getPostCategoryName } from "@/lib/blog-api";

const BlogCard = ({ post, compact = false }: { post: BlogPost; compact?: boolean }) => {
  const image = getBlogImageUrl(post.featured_image);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,.07)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(23,107,255,.12)]">
      <Link to={`/blog/${post.slug}`} className={`relative block overflow-hidden bg-slate-100 ${compact ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        {image ? (
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
        ) : (
          <div className="blue-grid grid h-full place-items-center bg-[#071a38] text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Sky Insights</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
          <span>{getPostCategoryName(post)}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="inline-flex items-center gap-1.5 text-slate-500"><CalendarDays size={13} /> {formatBlogDate(post.published_at)}</span>
        </div>
        <h3 className={`${compact ? "mt-4 text-xl" : "mt-5 text-2xl"} font-heading font-extrabold leading-tight tracking-[-0.035em] text-slate-950`}>
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-primary">{post.title}</Link>
        </h3>
        {post.excerpt && <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="text-xs font-semibold text-slate-500">By {post.author_name || "Sky Designers"}</span>
          <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">Read Article <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
