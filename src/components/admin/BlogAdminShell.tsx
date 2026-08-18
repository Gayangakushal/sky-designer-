import { useState, type ReactNode } from "react";
import { BookOpen, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation } from "@/lib/router-compat";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const BlogAdminShell = ({ children }: { children: ReactNode }) => {
  const { loading, isAdmin, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  if (loading) return <div className="admin-shell grid min-h-screen place-items-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" /></div>;
  if (!isAdmin) return null;
  return <div className="admin-shell min-h-screen">
    <button type="button" className="admin-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
    {sidebarOpen && <button type="button" className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
    <aside className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`} aria-label="Admin navigation">
      <div className="admin-brand-row"><Link to="/" className="admin-brand"><span className="admin-brand-mark">S</span><span>Sky Designers<span className="admin-brand-dot">.</span></span></Link><button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)}><X size={20} /></button></div>
      <p className="admin-nav-label">Workspace</p>
      <nav className="admin-nav">
        <Link to="/admin" className="admin-nav-item"><span className="admin-nav-icon"><LayoutDashboard size={18} /></span><span>Dashboard</span></Link>
        <Link to="/admin/blog" className={`admin-nav-item ${pathname.startsWith("/admin/blog") ? "is-active" : ""}`}><span className="admin-nav-icon"><BookOpen size={18} /></span><span>Blog</span></Link>
      </nav>
      <div className="admin-sidebar-footer"><div className="admin-sidebar-profile"><span className="admin-profile-avatar">SD</span><span><strong>Administrator</strong><small>Sky Designers</small></span></div><button type="button" onClick={signOut} className="admin-signout"><LogOut size={18} /> <span>Sign Out</span></button></div>
    </aside>
    <main className="admin-main">{children}</main>
  </div>;
};

export default BlogAdminShell;
