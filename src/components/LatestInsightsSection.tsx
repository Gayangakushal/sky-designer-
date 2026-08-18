import { ArrowRight, BookOpen } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import MotionReveal from "@/components/MotionReveal";
import { usePublishedPosts } from "@/hooks/useBlog";
import { Link } from "@/lib/router-compat";

const LatestInsightsSection = () => {
  const { data: posts = [], isLoading, isError } = usePublishedPosts();
  const latest = posts.slice(0, 3);
  return <section className="section-space bg-slate-50"><div className="site-container">
    <MotionReveal><div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.22em] text-primary">Latest Insights</p><h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold tracking-[-.045em] text-slate-950 sm:text-5xl">Ideas to move your brand forward.</h2></div><Link to="/blog" className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">View All Insights <ArrowRight size={17} /></Link></div></MotionReveal>
    {isLoading ? <div className="grid gap-6 md:grid-cols-3">{[1,2,3].map((i) => <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="aspect-[16/10] animate-pulse bg-slate-200" /><div className="space-y-3 p-6"><div className="h-3 w-1/3 animate-pulse rounded bg-slate-200"/><div className="h-7 animate-pulse rounded bg-slate-200"/><div className="h-14 animate-pulse rounded bg-slate-100"/></div></div>)}</div> : isError ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-600">Latest insights are temporarily unavailable. <Link to="/blog" className="font-bold text-primary">Visit the blog</Link></div> : latest.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{latest.map((post, index) => <MotionReveal key={post.id} delay={index * .06}><BlogCard post={post} compact /></MotionReveal>)}</div> : <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center"><BookOpen className="mx-auto text-primary" /><h3 className="mt-4 text-lg font-extrabold text-slate-950">New insights are coming soon</h3><p className="mt-2 text-sm text-slate-600">We’re preparing practical ideas for brands ready to grow.</p></div>}
  </div></section>;
};
export default LatestInsightsSection;
