import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Star,
  LogOut,
  LayoutDashboard,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  Plus,
  Tag,
  Image as ImageIcon,
  Settings,
  BriefcaseBusiness,
  FileText,
  Menu,
  X,
  Inbox,
  ArrowRight,
  BookOpen,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useNavigate } from "@/lib/router-compat";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PricingManager from "@/components/admin/PricingManager";
import PortfolioManager from "@/components/admin/PortfolioManager";
import ContentManager from "@/components/admin/ContentManager";
import SettingsManager from "@/components/admin/SettingsManager";
import VacanciesManager from "@/components/admin/VacanciesManager";
import ApplicationsManager from "@/components/admin/ApplicationsManager";
import { useAdminApplications, useAdminVacancies } from "@/hooks/useVacancies";
import { isVacancyOpen } from "@/lib/recruitment";

type Tab =
  | "overview"
  | "bookings"
  | "team"
  | "reviews"
  | "vacancies"
  | "applications"
  | "pricing"
  | "content"
  | "portfolio"
  | "settings";

interface Booking {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  service: string;
  preferred_date: string | null;
  preferred_time: string | null;
  status: string;
  created_at: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
}

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  approved: boolean;
  created_at: string;
}

const bookingStatusClass = (status: string) => {
  const styles: Record<string, string> = {
    new: "admin-badge-blue",
    pending: "admin-badge-amber",
    approved: "admin-badge-green",
    confirmed: "admin-badge-green",
    completed: "admin-badge-teal",
    cancelled: "admin-badge-red",
  };
  return styles[status.toLowerCase()] ?? "admin-badge-gray";
};

const applicationStatusClass = (status: string) => {
  const styles: Record<string, string> = {
    new: "admin-badge-blue",
    reviewing: "admin-badge-purple",
    shortlisted: "admin-badge-amber",
    interview: "admin-badge-indigo",
    hired: "admin-badge-green",
    rejected: "admin-badge-red",
  };
  return styles[status.toLowerCase()] ?? "admin-badge-gray";
};

const AdminDashboard = () => {
  const { loading, isAdmin, isAccounting, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const { data: vacancies = [] } = useAdminVacancies(isAdmin);
  const { data: applications = [] } = useAdminApplications(isAdmin);

  // New team member form
  const [newMember, setNewMember] = useState({ name: "", position: "", image_url: "" });
  const [editingMember, setEditingMember] = useState<string | null>(null);

  const fetchData = async () => {
    const [b, t, r] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("team_members").select("*").order("created_at", { ascending: false }),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
    ]);
    if (b.data) setBookings(b.data as Booking[]);
    if (t.data) setTeam(t.data as TeamMember[]);
    if (r.data) setReviews(r.data as Review[]);
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  useEffect(() => {
    if (isAccounting) navigate("/admin/billing");
  }, [isAccounting, navigate]);

  const updateBookingStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    toast({ title: `Booking ${status}` });
  };

  const deleteBooking = async (id: string) => {
    await supabase.from("bookings").delete().eq("id", id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast({ title: "Booking deleted" });
  };

  const addTeamMember = async () => {
    if (!newMember.name || !newMember.position) return;
    const { data } = await supabase
      .from("team_members")
      .insert({
        name: newMember.name,
        position: newMember.position,
        image_url: newMember.image_url || null,
      })
      .select()
      .single();
    if (data) {
      setTeam((prev) => [data as TeamMember, ...prev]);
      setNewMember({ name: "", position: "", image_url: "" });
      toast({ title: "Team member added" });
    }
  };

  const deleteTeamMember = async (id: string) => {
    await supabase.from("team_members").delete().eq("id", id);
    setTeam((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Team member removed" });
  };

  const toggleReviewApproval = async (id: string, approved: boolean) => {
    await supabase.from("reviews").update({ approved: !approved }).eq("id", id);
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: !approved } : r)));
    toast({ title: approved ? "Review hidden" : "Review approved" });
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Review deleted" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (isAccounting) {
    return null;
  }
  if (!isAdmin) return null;

  const todayBookings = bookings.filter(
    (b) => new Date(b.created_at).toDateString() === new Date().toDateString(),
  ).length;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { key: "bookings", label: "Bookings", icon: <CalendarDays size={18} /> },
    { key: "team", label: "Team", icon: <Users size={18} /> },
    { key: "reviews", label: "Reviews", icon: <Star size={18} /> },
    { key: "vacancies", label: "Vacancies", icon: <BriefcaseBusiness size={18} /> },
    { key: "applications", label: "Job Applications", icon: <FileText size={18} /> },
    { key: "content", label: "Content / Our Work", icon: <ImageIcon size={18} /> },
    { key: "pricing", label: "Pricing", icon: <Tag size={18} /> },
    { key: "portfolio", label: "Portfolio", icon: <ImageIcon size={18} /> },
    { key: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const selectTab = (nextTab: Tab) => {
    setTab(nextTab);
    setSidebarOpen(false);
  };

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarDays,
      accent: "blue",
      detail: "All customer requests",
    },
    {
      label: "Today",
      value: todayBookings,
      icon: Clock,
      accent: "purple",
      detail: "Bookings received today",
    },
    {
      label: "Team Members",
      value: team.length,
      icon: Users,
      accent: "teal",
      detail: "Active team profiles",
    },
    {
      label: "Reviews",
      value: reviews.filter((r) => r.approved).length,
      icon: Star,
      accent: "amber",
      detail: "Published client reviews",
    },
    {
      label: "Active Vacancies",
      value: vacancies.filter(isVacancyOpen).length,
      icon: BriefcaseBusiness,
      accent: "indigo",
      detail: "Open career opportunities",
    },
    {
      label: "Total Applications",
      value: applications.length,
      icon: FileText,
      accent: "blue",
      detail: "Candidates received",
    },
    {
      label: "New Applications",
      value: applications.filter((a) => a.status === "new").length,
      icon: FileText,
      accent: "green",
      detail: "Awaiting review",
    },
  ];

  return (
    <div className="admin-shell min-h-screen">
      <button
        type="button"
        className="admin-mobile-menu"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`}
        aria-label="Admin navigation"
      >
        <div className="admin-brand-row">
          <a href="/" className="admin-brand" aria-label="Sky Designers home">
            <span className="admin-brand-mark">S</span>
            <span>
              Sky Designers<span className="admin-brand-dot">.</span>
            </span>
          </a>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <p className="admin-nav-label">Workspace</p>
        <nav className="admin-nav">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => selectTab(t.key)}
              className={`admin-nav-item ${tab === t.key ? "is-active" : ""}`}
              aria-current={tab === t.key ? "page" : undefined}
            >
              <span className="admin-nav-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
          <a href="/admin/blog" className="admin-nav-item">
            <span className="admin-nav-icon"><BookOpen size={18} /></span>
            <span>Blog</span>
          </a>
          <a href="/admin/billing" className="admin-nav-item">
            <span className="admin-nav-icon"><ReceiptText size={18} /></span>
            <span>Billing</span>
          </a>
          <a href="/admin/staff-access" className="admin-nav-item">
            <span className="admin-nav-icon"><ShieldCheck size={18} /></span>
            <span>Staff Access</span>
          </a>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-profile">
            <span className="admin-profile-avatar">SD</span>
            <span>
              <strong>Administrator</strong>
              <small>Sky Designers</small>
            </span>
          </div>
          <button type="button" onClick={signOut} className="admin-signout">
            <LogOut size={18} /> <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Overview */}
          {tab === "overview" && (
            <div className="admin-overview">
              <header className="admin-page-header">
                <div>
                  <p className="admin-eyebrow">Business overview</p>
                  <h1>Dashboard</h1>
                  <p>
                    Monitor bookings, team activity, vacancies, applications and business
                    performance.
                  </p>
                </div>
                <time dateTime={new Date().toISOString()}>
                  {new Date().toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </header>

              <section className="admin-stat-grid" aria-label="Dashboard statistics">
                {stats.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article key={card.label} className="admin-stat-card">
                      <div className={`admin-stat-icon admin-stat-icon-${card.accent}`}>
                        <Icon size={21} />
                      </div>
                      <p className="admin-stat-label">{card.label}</p>
                      <p className="admin-stat-value">{card.value}</p>
                      <p className="admin-stat-detail">{card.detail}</p>
                    </article>
                  );
                })}
              </section>

              <section className="admin-data-card">
                <div className="admin-card-header">
                  <div>
                    <h2>Recent Job Applications</h2>
                    <p>Latest candidates who applied to your active vacancies.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectTab("applications")}
                    className="admin-link-button"
                  >
                    View all <ArrowRight size={16} />
                  </button>
                </div>
                {applications.length > 0 ? (
                  <div className="admin-table-scroll">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          {["Applicant", "Vacancy", "Applied", "Status", "Action"].map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {applications.slice(0, 5).map((a) => (
                          <tr key={a.id}>
                            <td className="admin-table-primary">{a.full_name}</td>
                            <td>{a.position}</td>
                            <td>{new Date(a.created_at).toLocaleDateString()}</td>
                            <td>
                              <span className={`admin-badge ${applicationStatusClass(a.status)}`}>
                                {a.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="admin-row-action"
                                onClick={() => selectTab("applications")}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <span>
                      <FileText size={24} />
                    </span>
                    <h3>No job applications yet</h3>
                    <p>Applications submitted through the Careers page will appear here.</p>
                  </div>
                )}
              </section>

              <section className="admin-data-card">
                <div className="admin-card-header">
                  <div>
                    <h2>Recent Bookings</h2>
                    <p>Latest customer inquiries and service requests.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectTab("bookings")}
                    className="admin-link-button"
                  >
                    View all <ArrowRight size={16} />
                  </button>
                </div>
                {bookings.length > 0 ? (
                  <div className="admin-table-scroll">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          {["Name", "Service", "Date", "Status", "Action"].map((h) => (
                            <th key={h}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map((b) => (
                          <tr key={b.id}>
                            <td className="admin-table-primary">{b.name}</td>
                            <td>{b.service}</td>
                            <td>{b.preferred_date || "N/A"}</td>
                            <td>
                              <span className={`admin-badge ${bookingStatusClass(b.status)}`}>
                                {b.status}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="admin-row-action"
                                onClick={() => selectTab("bookings")}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="admin-empty-state">
                    <span>
                      <Inbox size={24} />
                    </span>
                    <h3>No bookings yet</h3>
                    <p>New customer inquiries will appear here.</p>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* Bookings */}
          {tab === "bookings" && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
                Booking Management
              </h1>
              <div className="glass-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {[
                        "Name",
                        "Phone",
                        "Email",
                        "Service",
                        "Date",
                        "Time",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th key={h} className="text-left p-4 text-muted-foreground font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-border/50">
                        <td className="p-4 text-foreground">{b.name}</td>
                        <td className="p-4 text-muted-foreground">{b.phone || "—"}</td>
                        <td className="p-4 text-muted-foreground">{b.email}</td>
                        <td className="p-4 text-foreground">{b.service}</td>
                        <td className="p-4 text-muted-foreground">{b.preferred_date || "—"}</td>
                        <td className="p-4 text-muted-foreground">{b.preferred_time || "—"}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : b.status === "completed"
                                  ? "bg-primary/20 text-primary"
                                  : b.status === "cancelled"
                                    ? "bg-destructive/20 text-destructive"
                                    : "bg-accent/20 text-accent"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateBookingStatus(b.id, "approved")}
                              className="text-green-400 hover:text-green-300 h-8 w-8 p-0"
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateBookingStatus(b.id, "completed")}
                              className="text-primary hover:text-primary/80 h-8 w-8 p-0"
                            >
                              <Clock size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateBookingStatus(b.id, "cancelled")}
                              className="text-accent hover:text-accent/80 h-8 w-8 p-0"
                            >
                              <XCircle size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteBooking(b.id)}
                              className="text-destructive hover:text-destructive/80 h-8 w-8 p-0"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bookings.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No bookings yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Team */}
          {tab === "team" && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
                Team Management
              </h1>
              <div className="glass-card p-6 mb-6">
                <h3 className="text-foreground font-medium mb-4 flex items-center gap-2">
                  <Plus size={18} /> Add Team Member
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="bg-secondary border-border text-foreground"
                  />
                  <Input
                    placeholder="Position"
                    value={newMember.position}
                    onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                    className="bg-secondary border-border text-foreground"
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={newMember.image_url}
                    onChange={(e) => setNewMember({ ...newMember, image_url: e.target.value })}
                    className="bg-secondary border-border text-foreground"
                  />
                </div>
                <Button
                  onClick={addTeamMember}
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Add Member
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((m) => (
                  <div key={m.id} className="glass-card p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {m.name.charAt(0)}
                    </div>
                    <h3 className="text-foreground font-bold">{m.name}</h3>
                    <p className="text-muted-foreground text-sm">{m.position}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteTeamMember(m.id)}
                      className="mt-4 text-destructive hover:text-destructive/80"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </Button>
                  </div>
                ))}
              </div>
              {team.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No team members added yet.</p>
              )}
            </div>
          )}

          {/* Reviews */}
          {tab === "reviews" && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
                Reviews Management
              </h1>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="glass-card p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-foreground font-bold">{r.reviewer_name}</span>
                        <span className="text-accent">
                          {"★".repeat(r.rating)}
                          {"☆".repeat(5 - r.rating)}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${r.approved ? "bg-green-500/20 text-green-400" : "bg-accent/20 text-accent"}`}
                        >
                          {r.approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{r.comment}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleReviewApproval(r.id, r.approved)}
                        className={r.approved ? "text-accent" : "text-green-400"}
                      >
                        {r.approved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteReview(r.id)}
                        className="text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No reviews yet.</p>
                )}
              </div>
            </div>
          )}

          {tab === "vacancies" && <VacanciesManager />}
          {tab === "applications" && <ApplicationsManager />}
          {tab === "content" && <ContentManager />}
          {tab === "pricing" && <PricingManager />}
          {tab === "portfolio" && <PortfolioManager />}
          {tab === "settings" && <SettingsManager />}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
