import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import WorkCard from "@/components/work/WorkCard";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_VIDEO_TYPES,
  POST_STATUSES,
  POST_TYPES,
  POST_TYPE_LABELS,
  createPost,
  parseYouTubeId,
  replacePostMedia,
  slugify,
  updatePost,
  uploadContentFile,
  youtubeThumbnail,
  type ContentCategory,
  type ContentPost,
  type MediaInput,
  type PostStatus,
  type PostType,
} from "@/lib/content";

interface GalleryItem {
  url: string;
  media_type: "image" | "video";
}

interface ContentPostFormProps {
  post: ContentPost | null;
  categories: ContentCategory[];
  onClose: () => void;
  onSaved: () => void;
}

const inputClass = "bg-secondary border-border text-foreground";
const labelClass = "text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground";

const ContentPostForm = ({ post, categories, onClose, onSaved }: ContentPostFormProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [postType, setPostType] = useState<PostType>(post?.post_type ?? "image");
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [categoryId, setCategoryId] = useState(post?.category_id ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [isFeatured, setIsFeatured] = useState(post?.is_featured ?? false);
  const [status, setStatus] = useState<PostStatus>(post?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState(post?.published_at ? post.published_at.slice(0, 10) : "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [videoUrl, setVideoUrl] = useState(post?.video_url ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(post?.youtube_url ?? "");
  const [clientName, setClientName] = useState(post?.client_name ?? "");
  const [externalUrl, setExternalUrl] = useState(post?.external_url ?? "");
  const [services, setServices] = useState((post?.services ?? []).join(", "));
  const [gallery, setGallery] = useState<GalleryItem[]>(
    (post?.media ?? []).map((m) => ({ url: m.media_url, media_type: m.media_type === "video" ? "video" : "image" })),
  );

  const youtubeId = useMemo(() => parseYouTubeId(youtubeUrl), [youtubeUrl]);

  const handleTitle = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const uploadFiles = async (files: FileList | null, kind: "cover" | "gallery" | "video") => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map((file) => uploadContentFile(file)));
      if (kind === "cover") setCoverImageUrl(uploaded[0]?.url ?? "");
      else if (kind === "video") setVideoUrl(uploaded[0]?.url ?? "");
      else
        setGallery((prev) => [
          ...prev,
          ...uploaded.map((item, index) => ({
            url: item.url,
            media_type: (Array.from(files)[index]?.type.startsWith("video") ? "video" : "image") as "image" | "video",
          })),
        ]);
    } catch (error) {
      toast({ title: "Upload failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const moveGalleryItem = (index: number, direction: -1 | 1) => {
    setGallery((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      const [item] = next.splice(index, 1);
      if (item) next.splice(target, 0, item);
      return next;
    });
  };

  const previewPost = useMemo<ContentPost>(() => {
    const category = categories.find((c) => c.id === categoryId);
    return {
      id: post?.id ?? "preview",
      title: title || "Untitled post",
      slug: slug || "preview",
      post_type: postType,
      excerpt: excerpt || null,
      content: content || null,
      category_id: categoryId || null,
      cover_image_url: coverImageUrl || (youtubeId ? youtubeThumbnail(youtubeId) : null),
      video_url: videoUrl || null,
      youtube_url: youtubeUrl || null,
      youtube_video_id: youtubeId,
      client_name: clientName || null,
      services: services.split(",").map((s) => s.trim()).filter(Boolean),
      external_url: externalUrl || null,
      status,
      is_featured: isFeatured,
      sort_order: post?.sort_order ?? 0,
      published_at: publishedAt || null,
      created_at: post?.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
      media: gallery.map((item, index) => ({
        id: `preview-${index}`,
        post_id: "preview",
        media_type: item.media_type,
        media_url: item.url,
        thumbnail_url: null,
        alt_text: null,
        sort_order: index,
      })),
    };
  }, [categories, categoryId, clientName, content, coverImageUrl, excerpt, externalUrl, gallery, isFeatured, post, postType, publishedAt, services, slug, status, title, videoUrl, youtubeId, youtubeUrl]);

  const validate = (): string | null => {
    if (!title.trim()) return "Title is required.";
    if (!slug.trim()) return "Slug is required.";
    if (!categoryId) return "Choose a category.";
    if (postType === "youtube" && !youtubeId) return "Enter a valid YouTube URL.";
    if (postType === "image" && !coverImageUrl) return "Upload the main image.";
    if (postType === "video" && !videoUrl) return "Upload a video or paste a video URL.";
    if (postType === "carousel" && gallery.filter((g) => g.media_type === "image").length < 2)
      return "Carousel posts need at least two images.";
    if (postType === "project" && !coverImageUrl) return "Project posts need a cover image.";
    return null;
  };

  const save = async () => {
    const problem = validate();
    if (problem) {
      toast({ title: problem, variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        slug: slugify(slug),
        post_type: postType,
        excerpt: excerpt.trim() || null,
        content: content.trim() || null,
        category_id: categoryId || null,
        cover_image_url: coverImageUrl || (postType === "youtube" && youtubeId ? youtubeThumbnail(youtubeId) : null),
        video_url: videoUrl || null,
        youtube_url: postType === "youtube" ? youtubeUrl.trim() || null : null,
        youtube_video_id: postType === "youtube" ? youtubeId : null,
        client_name: clientName.trim() || null,
        services: services.split(",").map((s) => s.trim()).filter(Boolean),
        external_url: externalUrl.trim() || null,
        status,
        is_featured: isFeatured,
        published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
      };

      const mediaItems: MediaInput[] = gallery.map((item, index) => ({
        media_type: item.media_type,
        media_url: item.url,
        alt_text: title.trim() || null,
        sort_order: index,
      }));

      if (post) {
        await updatePost(post.id, payload);
        await replacePostMedia(post.id, mediaItems);
      } else {
        const created = await createPost(payload);
        await replacePostMedia(created.id, mediaItems);
      }
      toast({ title: post ? "Post updated" : "Post created" });
      onSaved();
      onClose();
    } catch (error) {
      toast({ title: "Could not save post", description: (error as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-background p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">{post ? "Edit post" : "Create post"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close form"><X size={18} /></Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className={labelClass}>Post type *</span>
            <select value={postType} onChange={(e) => setPostType(e.target.value as PostType)} className="h-10 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
              {POST_TYPES.map((type) => (
                <option key={type} value={type}>{POST_TYPE_LABELS[type]}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Category *</span>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="h-10 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Title *</span>
            <Input value={title} onChange={(e) => handleTitle(e.target.value)} className={inputClass} placeholder="Campaign name" />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Slug *</span>
            <Input value={slug} onChange={(e) => { setSlugTouched(true); setSlug(e.target.value); }} className={inputClass} placeholder="campaign-name" />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className={labelClass}>Short caption / excerpt</span>
            <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={inputClass} placeholder="One-line summary shown on cards" />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className={labelClass}>Description</span>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className={inputClass} placeholder="Full description shown on the post page" />
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as PostStatus)} className="h-10 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
              {POST_STATUSES.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className={labelClass}>Publish date</span>
            <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={inputClass} />
          </label>
          <label className="flex items-center gap-3 md:col-span-2">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4" />
            <span className="text-sm text-foreground">Featured (shows first on the homepage)</span>
          </label>
        </div>

        {/* Type-specific fields */}
        <div className="mt-6 space-y-4 rounded-xl border border-border p-4">
          <h3 className="font-heading text-lg font-bold text-foreground">{POST_TYPE_LABELS[postType]} media</h3>

          {postType === "youtube" && (
            <div className="space-y-3">
              <label className="space-y-2 block">
                <span className={labelClass}>YouTube URL *</span>
                <Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
              </label>
              {youtubeUrl && !youtubeId && <p className="text-sm text-destructive">That does not look like a valid YouTube link.</p>}
              {youtubeId && (
                <div className="flex items-center gap-3">
                  <img src={youtubeThumbnail(youtubeId)} alt="YouTube thumbnail" className="h-20 w-36 rounded-lg object-cover" />
                  <p className="text-sm text-muted-foreground">Video ID: {youtubeId}</p>
                </div>
              )}
            </div>
          )}

          {(postType === "image" || postType === "project" || postType === "video" || postType === "carousel") && (
            <label className="space-y-2 block">
              <span className={labelClass}>{postType === "project" ? "Cover image *" : postType === "image" ? "Main image *" : "Cover image (optional)"}</span>
              <input type="file" accept={ACCEPTED_IMAGE_TYPES} onChange={(e) => void uploadFiles(e.target.files, "cover")} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground" />
              {coverImageUrl && (
                <div className="flex items-center gap-3">
                  <img src={coverImageUrl} alt="Cover" className="h-20 w-32 rounded-lg object-cover" />
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setCoverImageUrl("")}>Remove</Button>
                </div>
              )}
            </label>
          )}

          {(postType === "video" || postType === "project") && (
            <div className="space-y-2">
              <span className={labelClass}>{postType === "video" ? "Video file or URL *" : "Optional video"}</span>
              <input type="file" accept={ACCEPTED_VIDEO_TYPES} onChange={(e) => void uploadFiles(e.target.files, "video")} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground" />
              <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass} placeholder="Or paste a direct video URL (.mp4)" />
              <p className="text-xs text-muted-foreground">For long videos, use a YouTube post instead of uploading large files.</p>
            </div>
          )}

          {(postType === "carousel" || postType === "project") && (
            <div className="space-y-3">
              <span className={labelClass}>{postType === "carousel" ? "Carousel images *" : "Project gallery"}</span>
              <input type="file" multiple accept={`${ACCEPTED_IMAGE_TYPES},${ACCEPTED_VIDEO_TYPES}`} onChange={(e) => void uploadFiles(e.target.files, "gallery")} className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground" />
              <div className="space-y-2">
                {gallery.map((item, index) => (
                  <div key={`${item.url}-${index}`} className="flex items-center gap-3 rounded-lg border border-border p-2">
                    {item.media_type === "video" ? (
                      <video src={item.url} className="h-14 w-20 rounded object-cover" muted />
                    ) : (
                      <img src={item.url} alt="" className="h-14 w-20 rounded object-cover" />
                    )}
                    <span className="flex-1 text-xs text-muted-foreground">#{index + 1} · {item.media_type}</span>
                    <Button variant="ghost" size="sm" aria-label="Move up" onClick={() => moveGalleryItem(index, -1)}><ArrowUp size={15} /></Button>
                    <Button variant="ghost" size="sm" aria-label="Move down" onClick={() => moveGalleryItem(index, 1)}><ArrowDown size={15} /></Button>
                    <Button variant="ghost" size="sm" className="text-destructive" aria-label="Remove image" onClick={() => setGallery((prev) => prev.filter((_, i) => i !== index))}><Trash2 size={15} /></Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {postType === "project" && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className={labelClass}>Client name</span>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className={inputClass} />
              </label>
              <label className="space-y-2">
                <span className={labelClass}>External project URL</span>
                <Input value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} className={inputClass} placeholder="https://" />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className={labelClass}>Services (comma separated)</span>
                <Input value={services} onChange={(e) => setServices(e.target.value)} className={inputClass} placeholder="Branding, Web Development, Photography" />
              </label>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={save} disabled={saving || uploading} className="gap-2">
            {saving && <Loader2 size={16} className="animate-spin" />} {post ? "Save changes" : "Create post"}
          </Button>
          <Button variant="outline" onClick={() => setShowPreview(true)} className="gap-2"><Eye size={16} /> Preview</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          {uploading && <span className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 size={14} className="animate-spin" /> Uploading…</span>}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#030713]/95 p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">Public preview</p>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)} className="text-white" aria-label="Close preview"><X size={18} /></Button>
            </div>
            <div className="max-w-md"><WorkCard post={previewPost} /></div>
            <div className="mt-8 text-white">
              <h3 className="font-heading text-3xl font-bold">{previewPost.title}</h3>
              {previewPost.excerpt && <p className="mt-3 text-slate-300">{previewPost.excerpt}</p>}
              {previewPost.content && <p className="mt-4 whitespace-pre-line text-slate-400">{previewPost.content}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPostForm;