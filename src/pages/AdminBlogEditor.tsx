import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import BlogAdminShell from "@/components/admin/BlogAdminShell";
import { useAdminBlogPosts, useBlogCategories } from "@/hooks/useBlog";
import { createBlogPost, updateBlogPost } from "@/lib/blog-api";
import type { BlogPostInput, BlogStatus } from "@/types/blog";
import { Link, useNavigate, useParams } from "@/lib/router-compat";
import { useToast } from "@/hooks/use-toast";

const emptyForm: BlogPostInput = { title: "", slug: "", category_id: 0, excerpt: "", featured_image: "", author_name: "Sky Designers", content: "", status: "draft", is_featured: false, seo_title: "", seo_description: "", published_at: null };
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const toLocalDateTime = (value: string | null) => {
  if (!value) return "";
  const parsed = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? "" : parsed.toISOString().slice(0, 16);
};

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const editingId = id ? Number(id) : null;
  const isEditing = Number.isFinite(editingId);
  const [form, setForm] = useState<BlogPostInput>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { data: posts = [], isLoading: postsLoading } = useAdminBlogPosts(isEditing);
  const { data: categories = [], isLoading: categoriesLoading } = useBlogCategories();
  const post = useMemo(() => isEditing ? posts.find((item) => item.id === editingId) : undefined, [posts, editingId, isEditing]);
  const navigate = useNavigate(); const queryClient = useQueryClient(); const { toast } = useToast();
  useEffect(() => { if (!isEditing && categories.length && !form.category_id) setForm((current) => ({ ...current, category_id: categories[0].id })); }, [categories, form.category_id, isEditing]);
  useEffect(() => { if (post && !hydrated) { setForm({ title: post.title, slug: post.slug, category_id: post.category_id, excerpt: post.excerpt || "", featured_image: post.featured_image || "", author_name: post.author_name || "", content: post.content, status: post.status, is_featured: post.is_featured, seo_title: post.seo_title || "", seo_description: post.seo_description || "", published_at: post.published_at }); setSlugTouched(true); setHydrated(true); } }, [post, hydrated]);
  const update = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const onTitleChange = (title: string) => setForm((current) => ({ ...current, title, slug: slugTouched ? current.slug : slugify(title) }));
  const submit = async (forcedStatus?: BlogStatus) => {
    const payload = { ...form, status: forcedStatus || form.status, published_at: (forcedStatus || form.status) === "published" ? (form.published_at || new Date().toISOString()) : form.published_at };
    if (!payload.title.trim() || !payload.slug.trim() || !payload.category_id || !payload.content.trim()) { toast({ title: "Complete required fields", description: "Title, slug, category, and content are required.", variant: "destructive" }); return; }
    setSaving(true);
    try { if (isEditing && editingId !== null) await updateBlogPost(editingId, payload); else await createBlogPost(payload); await queryClient.invalidateQueries({ queryKey: ["blog"] }); toast({ title: isEditing ? "Post updated" : payload.status === "published" ? "Post published" : "Draft saved" }); navigate("/admin/blog"); }
    catch (error) { toast({ title: "Could not save post", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" }); }
    finally { setSaving(false); }
  };
  const loading = categoriesLoading || (isEditing && postsLoading);
  return <BlogAdminShell><div className="blog-editor-wrap"><header className="admin-page-header"><div><Link to="/admin/blog" className="blog-editor-back"><ArrowLeft size={16} /> Blog Management</Link><h1>{isEditing ? "Edit Post" : "Add New Post"}</h1><p>{isEditing ? "Update this production blog article." : "Create a new article for the Sky Designers blog."}</p></div></header>
    {loading ? <div className="admin-data-card p-8"><div className="h-96 animate-pulse rounded-xl bg-slate-100" /></div> : isEditing && !post ? <div className="admin-data-card admin-empty-state"><h3>Post not found</h3><p>The requested post may have been deleted.</p></div> : <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="blog-editor-grid">
      <div className="admin-data-card blog-editor-panel"><h2>Article</h2><label>Title *<input value={form.title} onChange={(e) => onTitleChange(e.target.value)} required /></label><label>Slug *<input value={form.slug} onChange={(e) => { setSlugTouched(true); update("slug", slugify(e.target.value)); }} required /></label><label>Excerpt<textarea rows={4} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} /></label><label>Content *<textarea className="blog-content-editor" rows={18} value={form.content} onChange={(e) => update("content", e.target.value)} placeholder="Write article content. Basic HTML is supported." required /><small>Basic HTML formatting is supported and safely filtered on the public article page.</small></label></div>
      <aside className="space-y-5"><div className="admin-data-card blog-editor-panel"><h2>Publishing</h2><label>Status<select value={form.status} onChange={(e) => update("status", e.target.value as BlogStatus)}><option value="draft">Draft</option><option value="published">Published</option></select></label><label>Category *<select value={form.category_id} onChange={(e) => update("category_id", Number(e.target.value))} required><option value={0}>Select category</option>{categories.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label><label>Published At<input type="datetime-local" value={toLocalDateTime(form.published_at)} onChange={(e) => update("published_at", e.target.value ? new Date(e.target.value).toISOString() : null)} /></label><label className="blog-featured-toggle"><input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} /><span><strong>Featured post</strong><small>Highlight this article on the blog page.</small></span></label></div>
      <div className="admin-data-card blog-editor-panel"><h2>Media & author</h2><label>Featured Image<input type="url" value={form.featured_image} onChange={(e) => update("featured_image", e.target.value)} placeholder="https://…" /></label><label>Author Name<input value={form.author_name} onChange={(e) => update("author_name", e.target.value)} /></label></div>
      <div className="admin-data-card blog-editor-panel"><h2>Search metadata</h2><label>SEO Title<input value={form.seo_title} maxLength={255} onChange={(e) => update("seo_title", e.target.value)} /></label><label>SEO Description<textarea rows={4} maxLength={500} value={form.seo_description} onChange={(e) => update("seo_description", e.target.value)} /></label></div></aside>
      <div className="blog-editor-actions"><Link to="/admin/blog" className="blog-admin-secondary">Cancel</Link><button type="button" disabled={saving} onClick={() => submit("draft")} className="blog-admin-secondary"><Save size={16} /> Save Draft</button><button type="submit" disabled={saving} className="blog-admin-primary">{saving ? "Saving…" : isEditing ? "Update Post" : form.status === "published" ? "Publish Post" : "Save Post"}</button></div>
    </form>}
  </div></BlogAdminShell>;
};

export default AdminBlogEditor;
