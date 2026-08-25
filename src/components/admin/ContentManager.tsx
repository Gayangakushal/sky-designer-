import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ContentPostForm from "@/components/admin/ContentPostForm";
import { formatColomboDateTime } from "@/lib/scheduling";
import { useAdminCategories, useAdminPosts } from "@/hooks/useContent";
import {
  POST_TYPES,
  POST_TYPE_LABELS,
  deletePost,
  postDate,
  updatePost,
  type ContentPost,
  type PostStatus,
} from "@/lib/content";

type View = "all" | "published" | "scheduled" | "draft";

const statusStyles: Record<string, string> = {
  published: "bg-green-500/20 text-green-400",
  scheduled: "bg-blue-500/20 text-blue-400",
  draft: "bg-accent/20 text-accent",
  archived: "bg-muted text-muted-foreground",
};

const ContentManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: posts = [], isLoading } = useAdminPosts();
  const { data: categories = [] } = useAdminCategories();

  const [view, setView] = useState<View>("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ContentPost | null>(null);

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["content_posts"] });
  };

  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        if (view === "published" && post.status !== "published") return false;
        if (view === "draft" && post.status !== "draft") return false;
        if (view === "scheduled" && post.status !== "scheduled") return false;
        if (typeFilter !== "all" && post.post_type !== typeFilter) return false;
        if (categoryFilter !== "all" && post.category_id !== categoryFilter) return false;
        if (statusFilter !== "all" && post.status !== statusFilter) return false;
        if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [posts, view, typeFilter, categoryFilter, statusFilter, search],
  );

  const remove = async (post: ContentPost) => {
    if (!window.confirm(`Delete “${post.title}”? This also removes its uploaded media.`)) return;
    try {
      await deletePost(post);
      refresh();
      toast({ title: "Post deleted" });
    } catch (error) {
      toast({ title: "Could not delete post", description: (error as Error).message, variant: "destructive" });
    }
  };

  const setStatus = async (post: ContentPost, status: PostStatus) => {
    try {
      await updatePost(post.id, {
        status,
        scheduled_at: null,
        ...(status === "published" ? { published_at: new Date().toISOString() } : {}),
      });
      refresh();
      toast({ title: `Post ${status}` });
    } catch (error) {
      toast({ title: "Could not update status", description: (error as Error).message, variant: "destructive" });
    }
  };

  const toggleFeatured = async (post: ContentPost) => {
    try {
      await updatePost(post.id, { is_featured: !post.is_featured });
      refresh();
    } catch (error) {
      toast({ title: "Could not update post", description: (error as Error).message, variant: "destructive" });
    }
  };

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-bold text-foreground">Content / Our Work</h1>
        <Button onClick={() => { setEditing(null); setFormOpen(true); }} className="gap-2"><Plus size={16} /> Create Post</Button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "published", "scheduled", "draft"] as View[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
              view === key ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {key === "all" ? "All posts" : key === "draft" ? "Drafts" : key} ({counts[key]})
          </button>
        ))}
      </div>

      <div className="glass-card mb-6 grid gap-3 p-4 md:grid-cols-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title" className="bg-secondary border-border pl-9 text-foreground" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-10 rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
          <option value="all">All types</option>
          {POST_TYPES.map((type) => <option key={type} value={type}>{POST_TYPE_LABELS[type]}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-10 rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Title", "Type", "Category", "Status", "Date", "Featured", "Actions"].map((h) => (
                <th key={h} className="p-4 text-left font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-border/50">
                <td className="p-4 font-medium text-foreground">{post.title}</td>
                <td className="p-4 text-muted-foreground">{POST_TYPE_LABELS[post.post_type]}</td>
                <td className="p-4 text-muted-foreground">{post.category?.name ?? "—"}</td>
                <td className="p-4">
                  <select
                    value={post.status}
                    onChange={(e) => void setStatus(post, e.target.value as PostStatus)}
                    className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[post.status] ?? ""}`}
                  >
                    <option value="draft">draft</option>
                    {post.status === "scheduled" && <option value="scheduled">scheduled</option>}
                    <option value="published">published</option>
                    <option value="archived">archived</option>
                  </select>
                </td>
                <td className="p-4 text-muted-foreground">
                  {post.status === "scheduled"
                    ? formatColomboDateTime(post.scheduled_at)
                    : new Date(postDate(post)).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <Button size="sm" variant="ghost" aria-label="Toggle featured" onClick={() => void toggleFeatured(post)} className={post.is_featured ? "text-accent" : "text-muted-foreground"}>
                    <Star size={16} fill={post.is_featured ? "currentColor" : "none"} />
                  </Button>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" aria-label="Edit post" onClick={() => { setEditing(post); setFormOpen(true); }}><Pencil size={16} /></Button>
                    <a href={`/work/${post.slug}`} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:text-foreground" aria-label="View post">
                      <ExternalLink size={16} />
                    </a>
                    <Button size="sm" variant="ghost" aria-label="Delete post" onClick={() => void remove(post)} className="text-destructive"><Trash2 size={16} /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && <p className="py-8 text-center text-muted-foreground">No posts match these filters.</p>}
        {isLoading && <p className="py-8 text-center text-muted-foreground">Loading content…</p>}
      </div>

      {formOpen && (
        <ContentPostForm
          post={editing}
          categories={categories}
          onClose={() => { setFormOpen(false); setEditing(null); }}
          onSaved={refresh}
        />
      )}
    </div>
  );
};

export default ContentManager;
