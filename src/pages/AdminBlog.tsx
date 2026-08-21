import { useMemo, useState } from "react";
import { BookOpen, Edit3, ImageOff, Plus, Search, Star, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import BlogAdminShell from "@/components/admin/BlogAdminShell";
import { useAdminBlogPosts, useBlogCategories } from "@/hooks/useBlog";
import { deleteBlogPost, formatBlogDate, getPostCategoryName } from "@/lib/blog-api";
import { Link } from "@/lib/router-compat";
import { useToast } from "@/hooks/use-toast";
import { useBlogImageUrl } from "@/hooks/useBlogImageUrl";

const AdminBlogThumbnail = ({ value }: { value: string | null }) => {
  const { url } = useBlogImageUrl(value);
  return url ? (
    <img className="blog-admin-thumb" src={url} alt="" />
  ) : (
    <span className="blog-admin-thumb blog-admin-no-image">
      <ImageOff size={16} />
    </span>
  );
};

const AdminBlog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [deleting, setDeleting] = useState<number | null>(null);
  const { data: posts = [], isLoading, isError, refetch } = useAdminBlogPosts();
  const { data: categories = [] } = useBlogCategories();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const query = search.trim().toLowerCase();
        return (
          (!query ||
            post.title.toLowerCase().includes(query) ||
            (post.excerpt || "").toLowerCase().includes(query)) &&
          (category === "all" || post.category_id === Number(category)) &&
          (status === "all" || post.status === status)
        );
      }),
    [posts, search, category, status],
  );
  const remove = async (id: number, title: string) => {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteBlogPost(id);
      await queryClient.invalidateQueries({ queryKey: ["blog"] });
      toast({ title: "Post deleted" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };
  const stats = [
    { label: "Total Posts", value: posts.length },
    { label: "Published", value: posts.filter((p) => p.status === "published").length },
    { label: "Drafts", value: posts.filter((p) => p.status === "draft").length },
    { label: "Featured", value: posts.filter((p) => p.is_featured).length },
  ];
  return (
    <BlogAdminShell>
      <div className="admin-overview">
        <header className="admin-page-header">
          <div>
            <p className="admin-eyebrow">Content workspace</p>
            <h1>Blog Management</h1>
            <p>Create, publish, and manage Sky Designers insights.</p>
          </div>
          <Link to="/admin/blog/new" className="blog-admin-primary">
            <Plus size={17} /> Add New Post
          </Link>
        </header>
        <section className="admin-stat-grid">
          {stats.map((item, index) => (
            <article className="admin-stat-card" key={item.label}>
              <div
                className={`admin-stat-icon ${index === 3 ? "admin-stat-icon-amber" : "admin-stat-icon-blue"}`}
              >
                {index === 3 ? <Star size={19} /> : <BookOpen size={19} />}
              </div>
              <p className="admin-stat-label">{item.label}</p>
              <p className="admin-stat-value">{item.value}</p>
              <p className="admin-stat-detail">Across the production blog</p>
            </article>
          ))}
        </section>
        <section className="admin-data-card">
          <div className="blog-admin-filters">
            <label className="blog-admin-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts…"
              />
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          {isLoading ? (
            <div className="space-y-3 border-t p-6">
              {[1, 2, 3, 4].map((i) => (
                <div className="h-16 animate-pulse rounded-lg bg-slate-100" key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="admin-empty-state">
              <span>
                <BookOpen size={22} />
              </span>
              <h3>Could not load blog posts</h3>
              <p>Check the admin API connection and try again.</p>
              <button className="admin-row-action mt-3" onClick={() => refetch()}>
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <span>
                <BookOpen size={22} />
              </span>
              <h3>{posts.length ? "No posts match these filters" : "No blog posts yet"}</h3>
              <p>
                {posts.length
                  ? "Adjust the search or filters."
                  : "Create your first insight to get started."}
              </p>
            </div>
          ) : (
            <>
              <div className="admin-table-scroll blog-admin-desktop">
                <table className="admin-table blog-admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Featured</th>
                      <th>Published</th>
                      <th>Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((post) => (
                      <tr key={post.id}>
                        <td>
                          <AdminBlogThumbnail value={post.featured_image} />
                        </td>
                        <td className="admin-table-primary">
                          <span className="blog-admin-title">{post.title}</span>
                          <small>/{post.slug}</small>
                        </td>
                        <td>{getPostCategoryName(post)}</td>
                        <td>
                          <span
                            className={`admin-badge ${post.status === "published" ? "admin-badge-green" : "admin-badge-gray"}`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td>
                          {post.is_featured ? (
                            <Star size={17} fill="currentColor" className="text-amber-500" />
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>{formatBlogDate(post.published_at)}</td>
                        <td>{formatBlogDate(post.updated_at)}</td>
                        <td>
                          <div className="flex gap-1">
                            <Link
                              className="admin-row-action"
                              to={`/admin/blog/${post.id}/edit`}
                              aria-label={`Edit ${post.title}`}
                            >
                              <Edit3 size={16} />
                            </Link>
                            <button
                              disabled={deleting === post.id}
                              className="admin-row-action blog-admin-delete"
                              onClick={() => remove(post.id, post.title)}
                              aria-label={`Delete ${post.title}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="blog-admin-mobile-list">
                {filtered.map((post) => (
                  <article className="blog-admin-mobile-card" key={post.id}>
                    <div>
                      <span
                        className={`admin-badge ${post.status === "published" ? "admin-badge-green" : "admin-badge-gray"}`}
                      >
                        {post.status}
                      </span>
                      {post.is_featured && (
                        <Star size={15} fill="currentColor" className="text-amber-500" />
                      )}
                    </div>
                    <h3>{post.title}</h3>
                    <p>
                      {getPostCategoryName(post)} · {formatBlogDate(post.published_at)}
                    </p>
                    <div>
                      <Link to={`/admin/blog/${post.id}/edit`}>
                        <Edit3 size={15} /> Edit
                      </Link>
                      <button
                        disabled={deleting === post.id}
                        onClick={() => remove(post.id, post.title)}
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </BlogAdminShell>
  );
};

export default AdminBlog;
