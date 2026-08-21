import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Image as ImageIcon, LoaderCircle, Save, Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import BlogAdminShell from "@/components/admin/BlogAdminShell";
import { useAdminBlogPosts, useBlogCategories } from "@/hooks/useBlog";
import { createBlogPost, updateBlogPost } from "@/lib/blog-api";
import { BLOG_IMAGE_ACCEPT, uploadBlogImage, validateBlogImage } from "@/lib/blog-images";
import { useBlogImageUrl } from "@/hooks/useBlogImageUrl";
import type { BlogPostInput, BlogStatus } from "@/types/blog";
import { Link, useNavigate, useParams } from "@/lib/router-compat";
import { useToast } from "@/hooks/use-toast";

const emptyForm: BlogPostInput = {
  title: "",
  slug: "",
  category_id: 0,
  excerpt: "",
  featured_image: "",
  author_name: "Sky Designers",
  content: "",
  status: "draft",
  is_featured: false,
  seo_title: "",
  seo_description: "",
  published_at: null,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// MySQL DATETIME has no timezone. Keep the wall-clock value selected by the admin unchanged.
const toLocalDateTime = (value: string | null) => {
  if (!value) return "";
  const match = value.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
  return match ? `${match[1]}T${match[2]}` : "";
};
const fromLocalDateTime = (value: string) => (value ? `${value.replace("T", " ")}:00` : null);
const currentLocalDateTime = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return `${local.toISOString().slice(0, 16).replace("T", " ")}:00`;
};

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const editingId = id ? Number(id) : null;
  const isEditing = Number.isFinite(editingId);
  const [form, setForm] = useState<BlogPostInput>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [localImagePreview, setLocalImagePreview] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const { data: posts = [], isLoading: postsLoading } = useAdminBlogPosts(isEditing);
  const { data: categories = [], isLoading: categoriesLoading } = useBlogCategories();
  const post = useMemo(
    () => (isEditing ? posts.find((item) => item.id === editingId) : undefined),
    [posts, editingId, isEditing],
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    if (!isEditing && categories.length && !form.category_id)
      setForm((current) => ({ ...current, category_id: categories[0].id }));
  }, [categories, form.category_id, isEditing]);

  useEffect(() => {
    if (post && !hydrated) {
      setForm({
        title: post.title,
        slug: post.slug,
        category_id: post.category_id,
        excerpt: post.excerpt || "",
        featured_image: post.featured_image || "",
        author_name: post.author_name || "",
        content: post.content,
        status: post.status,
        is_featured: post.is_featured,
        seo_title: post.seo_title || "",
        seo_description: post.seo_description || "",
        published_at: post.published_at,
      });
      setSlugTouched(true);
      setHydrated(true);
    }
  }, [post, hydrated]);

  useEffect(
    () => () => {
      if (localImagePreview) URL.revokeObjectURL(localImagePreview);
    },
    [localImagePreview],
  );

  const update = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) =>
    setForm((current) => ({ ...current, [key]: value }));
  const onTitleChange = (title: string) =>
    setForm((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));

  const selectFeaturedImage = async (file?: File) => {
    if (!file) return;
    const validationError = validateBlogImage(file);
    if (validationError) {
      setImageUploadError(validationError);
      toast({ title: "Image not accepted", description: validationError, variant: "destructive" });
      return;
    }
    setLocalImagePreview(URL.createObjectURL(file));
    setImageUploadError("");
    setUploadingImage(true);
    try {
      const storagePath = await uploadBlogImage(file);
      update("featured_image", storagePath);
      toast({ title: "Featured image uploaded" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try another image.";
      setImageUploadError(message);
      setLocalImagePreview("");
      toast({ title: "Image upload failed", description: message, variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  const submit = async (forcedStatus?: BlogStatus) => {
    if (uploadingImage) {
      toast({ title: "Please wait for the image upload to finish" });
      return;
    }
    const status = forcedStatus || form.status;
    const payload = {
      ...form,
      status,
      published_at:
        status === "published" ? form.published_at || currentLocalDateTime() : form.published_at,
    };
    if (
      !payload.title.trim() ||
      !payload.slug.trim() ||
      !payload.category_id ||
      !payload.content.trim()
    ) {
      toast({
        title: "Complete required fields",
        description: "Title, slug, category, and content are required.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      if (isEditing && editingId !== null) await updateBlogPost(editingId, payload);
      else await createBlogPost(payload);
      await queryClient.invalidateQueries({ queryKey: ["blog"] });
      toast({
        title: isEditing
          ? "Post updated"
          : payload.status === "published"
            ? "Post published"
            : "Draft saved",
      });
      navigate("/admin/blog");
    } catch (error) {
      toast({
        title: "Could not save post",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const loading = categoriesLoading || (isEditing && postsLoading);
  const { url: resolvedImagePreview } = useBlogImageUrl(form.featured_image);
  const imagePreview = localImagePreview || resolvedImagePreview;

  return (
    <BlogAdminShell>
      <div className="blog-editor-wrap">
        <header className="admin-page-header">
          <div>
            <Link to="/admin/blog" className="blog-editor-back">
              <ArrowLeft size={16} /> Blog Management
            </Link>
            <h1>{isEditing ? "Edit Post" : "Add New Post"}</h1>
            <p>
              {isEditing
                ? "Update this production blog article."
                : "Create a new article for the Sky Designers blog."}
            </p>
          </div>
        </header>
        {loading ? (
          <div className="admin-data-card p-8">
            <div className="h-96 animate-pulse rounded-xl bg-slate-100" />
          </div>
        ) : isEditing && !post ? (
          <div className="admin-data-card admin-empty-state">
            <h3>Post not found</h3>
            <p>The requested post may have been deleted.</p>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
            className="blog-editor-grid"
          >
            <div className="admin-data-card blog-editor-panel">
              <h2>Article</h2>
              <label>
                Title *
                <input
                  value={form.title}
                  onChange={(event) => onTitleChange(event.target.value)}
                  required
                />
              </label>
              <label>
                Slug *
                <input
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    update("slug", slugify(event.target.value));
                  }}
                  required
                />
              </label>
              <label>
                Excerpt
                <textarea
                  rows={4}
                  value={form.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                />
              </label>
              <label>
                Content *
                <textarea
                  className="blog-content-editor"
                  rows={18}
                  value={form.content}
                  onChange={(event) => update("content", event.target.value)}
                  placeholder="Write article content. Basic HTML is supported."
                  required
                />
                <small>
                  Basic HTML formatting is supported and safely filtered on the public article page.
                </small>
              </label>
            </div>
            <aside className="space-y-5">
              <div className="admin-data-card blog-editor-panel">
                <h2>Publishing</h2>
                <label>
                  Status
                  <select
                    value={form.status}
                    onChange={(event) => update("status", event.target.value as BlogStatus)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
                <label>
                  Category *
                  <select
                    value={form.category_id}
                    onChange={(event) => update("category_id", Number(event.target.value))}
                    required
                  >
                    <option value={0}>Select category</option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Published At
                  <input
                    type="datetime-local"
                    value={toLocalDateTime(form.published_at)}
                    onChange={(event) =>
                      update("published_at", fromLocalDateTime(event.target.value))
                    }
                  />
                  <small>Select both the publishing date and local time.</small>
                </label>
                <label className="blog-featured-toggle">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(event) => update("is_featured", event.target.checked)}
                  />
                  <span>
                    <strong>Featured post</strong>
                    <small>Highlight this article on the blog page.</small>
                  </span>
                </label>
              </div>
              <div className="admin-data-card blog-editor-panel">
                <h2>Media & author</h2>
                <div className="blog-image-upload">
                  <span className="blog-image-label">Upload Featured Image</span>
                  <label className={`blog-image-picker ${uploadingImage ? "is-uploading" : ""}`}>
                    {uploadingImage ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Upload size={18} />
                    )}
                    <span>{uploadingImage ? "Uploading image…" : "Choose image from device"}</span>
                    <input
                      type="file"
                      accept={BLOG_IMAGE_ACCEPT}
                      disabled={uploadingImage}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        void selectFeaturedImage(file);
                      }}
                    />
                  </label>
                  <small>JPG, PNG, or WebP. Maximum 5 MB.</small>
                  {imageUploadError && (
                    <p className="blog-image-error" role="alert">
                      {imageUploadError}
                    </p>
                  )}
                  {imagePreview && (
                    <div className="blog-image-preview">
                      <img src={imagePreview} alt="Featured image preview" />
                      <span>
                        <ImageIcon size={14} /> Featured image preview
                      </span>
                    </div>
                  )}
                </div>
                <div className="blog-image-divider">
                  <span>or use an external URL</span>
                </div>
                <label>
                  Featured Image URL
                  <input
                    type="text"
                    inputMode="url"
                    value={form.featured_image}
                    onChange={(event) => {
                      setLocalImagePreview("");
                      setImageUploadError("");
                      update("featured_image", event.target.value);
                    }}
                    placeholder="https://…"
                  />
                  <small>
                    Uploaded images automatically fill this field. Existing remote image URLs remain
                    supported.
                  </small>
                </label>
                <label>
                  Author Name
                  <input
                    value={form.author_name}
                    onChange={(event) => update("author_name", event.target.value)}
                  />
                </label>
              </div>
              <div className="admin-data-card blog-editor-panel">
                <h2>Search metadata</h2>
                <label>
                  SEO Title
                  <input
                    value={form.seo_title}
                    maxLength={255}
                    onChange={(event) => update("seo_title", event.target.value)}
                  />
                </label>
                <label>
                  SEO Description
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={form.seo_description}
                    onChange={(event) => update("seo_description", event.target.value)}
                  />
                </label>
              </div>
            </aside>
            <div className="blog-editor-actions">
              <Link to="/admin/blog" className="blog-admin-secondary">
                Cancel
              </Link>
              <button
                type="button"
                disabled={saving || uploadingImage}
                onClick={() => void submit("draft")}
                className="blog-admin-secondary"
              >
                <Save size={16} /> Save Draft
              </button>
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="blog-admin-primary"
              >
                {saving
                  ? "Saving…"
                  : uploadingImage
                    ? "Uploading image…"
                    : isEditing
                      ? "Update Post"
                      : form.status === "published"
                        ? "Publish Post"
                        : "Save Post"}
              </button>
            </div>
          </form>
        )}
      </div>
    </BlogAdminShell>
  );
};

export default AdminBlogEditor;
