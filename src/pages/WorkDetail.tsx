import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import WorkCard from "@/components/work/WorkCard";
import { Link, useParams } from "@/lib/router-compat";
import { usePublishedPost, usePublishedPosts } from "@/hooks/useContent";
import { postDate, postPreviewImage, type ContentPost } from "@/lib/content";
import ImageReveal from "@/components/motion/ImageReveal";
import MotionReveal from "@/components/MotionReveal";
import { MOTION } from "@/lib/motion";
import { relatedServicePagesForWork, servicePageForLabel } from "@/lib/service-links";
import VideoPlayer from "@/components/work/VideoPlayer";
import {
  genericWorkEvidenceSummary,
  getWorkEvidenceProfile,
} from "@/data/workEvidence";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });

const PostMedia = ({
  post,
  onOpenGallery,
}: {
  post: ContentPost;
  onOpenGallery: (index: number) => void;
}) => {
  const cover = postPreviewImage(post);

  if (post.post_type === "youtube" && (post.youtube_url || post.youtube_video_id)) {
    return <VideoPlayer url={post.youtube_url} legacyYouTubeId={post.youtube_video_id} poster={cover} title={post.title} />;
  }

  if (post.post_type === "video" && post.video_url) {
    return <VideoPlayer url={post.video_url} poster={cover} title={post.title} />;
  }

  if (!cover) return null;

  return (
    <button
      type="button"
      onClick={() => onOpenGallery(0)}
      className="block w-full overflow-hidden rounded-[24px] border border-white/10"
    >
      <img src={cover} alt={post.title} decoding="async" className="w-full object-cover" />
    </button>
  );
};

const WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { data: post, isLoading } = usePublishedPost(slug);
  const { data: allPosts = [] } = usePublishedPosts();

  const gallery = useMemo(() => {
    if (!post) return [] as string[];
    const urls = [
      ...(post.post_type !== "project" && post.cover_image_url ? [post.cover_image_url] : []),
      ...(post.media ?? []).filter((m) => m.media_type === "image").map((m) => m.media_url),
    ];
    return Array.from(new Set(urls));
  }, [post]);

  const related = useMemo(
    () =>
      allPosts
        .filter((item) => item.id !== post?.id)
        .filter((item) => !post?.category_id || item.category_id === post.category_id)
        .slice(0, 3),
    [allPosts, post],
  );

  const extraVideos = (post?.media ?? []).filter((m) => m.media_type === "video");
  const relatedServices = post ? relatedServicePagesForWork(post) : [];
  const evidenceProfile = post ? getWorkEvidenceProfile(post.slug) : undefined;

  return (
    <div className="min-h-screen bg-[#030713]">
      <Navbar onBookCall={() => setBookingOpen(true)} />
      <main className="pt-28 pb-24 text-white">
        <div className="site-container">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate-300 hover:text-white"
          >
            <ArrowLeft size={15} /> All work
          </Link>

          {isLoading && (
            <div className="mt-10 h-96 animate-pulse rounded-[24px] border border-white/10 bg-white/5" />
          )}

          {!isLoading && !post && (
            <div className="mt-20 text-center">
              <h1 className="font-heading text-3xl font-bold">This post is not available</h1>
              <p className="mt-3 text-slate-400">It may have been unpublished or removed.</p>
            </div>
          )}

          {post && (
            <>
              <motion.header
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION.reveal, ease: MOTION.ease }}
                className="mt-8 max-w-3xl"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                  {post.category && <span>{post.category.name}</span>}
                  <span className="text-slate-500">{formatDate(postDate(post))}</span>
                </div>
                <h1 className="mt-4 font-heading text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-4 text-lg leading-8 text-slate-300">{post.excerpt}</p>
                )}
              </motion.header>

              <section
                className="mt-8 max-w-4xl rounded-[20px] border border-blue-300/20 bg-blue-400/10 p-6"
                aria-labelledby="evidence-summary-heading"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-300">
                  Evidence summary
                </p>
                <h2 id="evidence-summary-heading" className="sr-only">
                  Citation-ready project summary
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-200">
                  {evidenceProfile?.citationSummary || genericWorkEvidenceSummary(post)}
                </p>
              </section>

              <div className="mt-10 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <ImageReveal className="rounded-[24px]" delay={0.08}>
                    <PostMedia post={post} onOpenGallery={setLightbox} />
                  </ImageReveal>

                  {evidenceProfile && (
                    <section className="mt-10" aria-labelledby="project-scope-heading">
                      <h2 id="project-scope-heading" className="font-heading text-2xl font-bold">
                        Project scope
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-300">
                        {evidenceProfile.projectScope}
                      </p>

                      <h2 className="mt-10 font-heading text-2xl font-bold">
                        Creative and technical direction
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-300">
                        {evidenceProfile.direction}
                      </p>

                      <h2 className="mt-10 font-heading text-2xl font-bold">
                        What Sky Designers delivered
                      </h2>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {evidenceProfile.deliverables.map((deliverable) => (
                          <li
                            key={deliverable}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-200"
                          >
                            {deliverable}
                          </li>
                        ))}
                      </ul>

                      <h2 className="mt-10 font-heading text-2xl font-bold">
                        Evidence and measurement context
                      </h2>
                      <p className="mt-4 text-base leading-8 text-slate-300">
                        {evidenceProfile.measurementContext}
                      </p>
                    </section>
                  )}

                  {post.content && (
                    <section className="mt-10" aria-labelledby="published-description-heading">
                      <h2 id="published-description-heading" className="font-heading text-2xl font-bold">
                        Published project description
                      </h2>
                      <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
                        {post.content.split(/\n{2,}/).map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  )}

                  {!evidenceProfile && (
                    <section className="mt-10 rounded-[20px] border border-white/10 bg-white/5 p-6">
                      <h2 className="font-heading text-xl font-bold">Evidence available</h2>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        This portfolio record contains the published creative format, category,
                        description, and media available above. It does not currently document a
                        verified objective, delivery scope, campaign period, attribution source,
                        or performance outcome, so no Results section is shown.
                      </p>
                    </section>
                  )}

                  {gallery.length > 1 && (
                    <div className="mt-10">
                      <h2 className="font-heading text-xl font-bold">Gallery</h2>
                      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                        {gallery.map((url, index) => (
                          <MotionReveal key={url} delay={index * MOTION.stagger} direction="scale">
                            <button
                              type="button"
                              onClick={() => setLightbox(index)}
                              className="overflow-hidden rounded-2xl border border-white/10"
                            >
                              <img
                                src={url}
                                alt={`${post.title} image ${index + 1}`}
                                loading="lazy"
                                className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                              />
                            </button>
                          </MotionReveal>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.post_type === "project" && post.video_url && (
                    <VideoPlayer
                      url={post.video_url}
                      poster={postPreviewImage(post)}
                      title={post.title}
                      className="mt-8"
                    />
                  )}

                  {extraVideos.map((media) => (
                    <VideoPlayer
                      key={media.id}
                      url={media.media_url}
                      title={`${post.title} additional video`}
                      className="mt-6"
                    />
                  ))}
                </div>

                <aside className="lg:col-span-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
                    <h2 className="font-heading text-lg font-bold">Details</h2>
                    <dl className="mt-4 space-y-4 text-sm">
                      {(post.client_name || evidenceProfile?.clientOrBrand) && (
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            Client
                          </dt>
                          <dd className="mt-1 text-slate-200">
                            {post.client_name || evidenceProfile?.clientOrBrand}
                          </dd>
                        </div>
                      )}
                      {post.category && (
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            Category
                          </dt>
                          <dd className="mt-1 text-slate-200">{post.category.name}</dd>
                        </div>
                      )}
                      {post.services.length > 0 && (
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            Services
                          </dt>
                          <dd className="mt-2 flex flex-wrap gap-2">
                            {post.services.map((service) => {
                              const servicePage = servicePageForLabel(service);
                              const className = "rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:border-blue-300/40 hover:text-white";
                              return servicePage ? (
                                <Link key={service} to={`/services/${servicePage.slug}`} className={className}>
                                  {service}
                                </Link>
                              ) : (
                                <span key={service} className={className}>{service}</span>
                              );
                            })}
                          </dd>
                        </div>
                      )}
                      {relatedServices.length > 0 && (
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            Related services
                          </dt>
                          <dd className="mt-2 flex flex-wrap gap-2">
                            {relatedServices.map((service) => (
                              <Link
                                key={service.slug}
                                to={`/services/${service.slug}`}
                                className="rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1 text-xs text-blue-200 transition hover:border-blue-300/50 hover:text-white"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                    {post.external_url && (
                      <a
                        href={post.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5"
                      >
                        Visit project <ExternalLink size={15} />
                      </a>
                    )}
                    <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-slate-400">
                      Published by <Link to="/about" className="font-bold text-blue-300">Sky Designers</Link>. Browse the agency’s <Link to="/services" className="font-bold text-blue-300">digital marketing and creative services</Link>.
                    </p>
                  </div>
                </aside>
              </div>

              {related.length > 0 && (
                <section className="mt-20">
                  <h2 className="font-heading text-2xl font-bold">Related work</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((item, index) => (
                      <MotionReveal key={item.id} delay={index * MOTION.stagger}>
                        <WorkCard post={item} />
                      </MotionReveal>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} selectedPackage="" />

      <AnimatePresence>
        {lightbox !== null && gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Project image gallery"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close gallery"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              src={gallery[Math.max(0, Math.min(lightbox, gallery.length - 1))]}
              alt={`${post?.title || "Sky Designers project"} gallery image`}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain"
            />
            {gallery.length > 1 && (
              <div className="mt-6 flex items-center gap-4 text-white">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setLightbox((i) => ((i ?? 0) - 1 + gallery.length) % gallery.length)
                  }
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm text-slate-300">
                  {(lightbox % gallery.length) + 1} / {gallery.length}
                </span>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => setLightbox((i) => ((i ?? 0) + 1) % gallery.length)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkDetail;
