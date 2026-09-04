import { useState, type ReactNode } from "react";
import {
  BookOpen,
  Building2,
  CreditCard,
  FileCheck2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  ReceiptText,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "@/lib/router-compat";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const billingNav = [
  ["/admin/billing", "Dashboard", LayoutDashboard],
  ["/admin/billing/quotations", "Quotations", FileText],
  ["/admin/billing/invoices", "Invoices", ReceiptText],
  ["/admin/billing/clients", "Clients", Users],
  ["/admin/billing/payments", "Payments", CreditCard],
  ["/admin/billing/settings", "Billing Settings", Settings],
] as const;

export default function BillingShell({ children }: { children: ReactNode }) {
  const { loading, isAdmin, signOut } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  if (loading)
    return (
      <div className="admin-shell grid min-h-screen place-items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
      </div>
    );
  if (!isAdmin) return null;
  return (
    <div className="admin-shell billing-shell min-h-screen">
      <button
        type="button"
        className="admin-mobile-menu"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>
      {open && (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`} aria-label="Billing navigation">
        <div className="admin-brand-row">
          <Link to="/" className="admin-brand">
            <span className="admin-brand-mark">S</span>
            <span>
              Sky Designers<span className="admin-brand-dot">.</span>
            </span>
          </Link>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <p className="admin-nav-label">Workspace</p>
        <nav className="admin-nav billing-nav">
          <Link to="/admin" className="admin-nav-item">
            <span className="admin-nav-icon">
              <Building2 size={18} />
            </span>
            Admin Home
          </Link>
          <Link to="/admin/blog" className="admin-nav-item">
            <span className="admin-nav-icon">
              <BookOpen size={18} />
            </span>
            Blog
          </Link>
          <p className="admin-nav-label billing-nav-heading">Billing</p>
          {billingNav.map(([to, label, Icon]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`admin-nav-item ${pathname === to || (to !== "/admin/billing" && pathname.startsWith(to)) ? "is-active" : ""}`}
            >
              <span className="admin-nav-icon">
                <Icon size={18} />
              </span>
              {label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-profile">
            <span className="admin-profile-avatar">
              <FileCheck2 size={15} />
            </span>
            <span>
              <strong>Billing Admin</strong>
              <small>Sky Designers</small>
            </span>
          </div>
          <button type="button" onClick={signOut} className="admin-signout">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <div>{children}</div>
      </main>
    </div>
  );
}
