import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, Star, LogOut, LayoutDashboard, Clock, CheckCircle, XCircle, Trash2, Plus, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Tab = "overview" | "bookings" | "team" | "reviews";

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


const AdminDashboard = () => {
  const { loading, isAdmin, signOut } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

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
    const { data } = await supabase.from("team_members").insert({
      name: newMember.name,
      position: newMember.position,
      image_url: newMember.image_url || null,
    }).select().single();
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

  if (!isAdmin) return null;

  const todayBookings = bookings.filter(
    (b) => new Date(b.created_at).toDateString() === new Date().toDateString()
  ).length;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { key: "bookings", label: "Bookings", icon: <CalendarDays size={18} /> },
    { key: "team", label: "Team", icon: <Users size={18} /> },
    { key: "reviews", label: "Reviews", icon: <Star size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 glass-card border-r border-border p-6 flex flex-col z-40">
        <a href="/" className="font-heading text-xl font-bold text-gradient-primary mb-8">
          Sky Designers<span className="text-accent">.</span>
        </a>
        <nav className="flex-1 space-y-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </nav>
        <Button variant="ghost" onClick={signOut} className="text-muted-foreground hover:text-destructive gap-2 justify-start">
          <LogOut size={18} /> Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Overview */}
          {tab === "overview" && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Total Bookings", value: bookings.length, icon: <CalendarDays className="text-primary" /> },
                  { label: "Today", value: todayBookings, icon: <Clock className="text-accent" /> },
                  { label: "Team Members", value: team.length, icon: <Users className="text-primary" /> },
                  { label: "Reviews", value: reviews.filter((r) => r.approved).length, icon: <Star className="text-accent" /> },
                ].map((card) => (
                  <div key={card.label} className="glass-card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground text-sm">{card.label}</span>
                      {card.icon}
                    </div>
                    <p className="font-heading text-3xl font-bold text-foreground">{card.value}</p>
                  </div>
                ))}
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">Recent Bookings</h2>
              <div className="glass-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-muted-foreground font-medium">Name</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Service</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="border-b border-border/50">
                        <td className="p-4 text-foreground">{b.name}</td>
                        <td className="p-4 text-foreground">{b.service}</td>
                        <td className="p-4 text-muted-foreground">{b.preferred_date || "N/A"}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            b.status === "approved" ? "bg-green-500/20 text-green-400" :
                            b.status === "completed" ? "bg-primary/20 text-primary" :
                            b.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                            "bg-accent/20 text-accent"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings */}
          {tab === "bookings" && (
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Booking Management</h1>
              <div className="glass-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {["Name", "Phone", "Email", "Service", "Date", "Time", "Status", "Actions"].map((h) => (
                        <th key={h} className="text-left p-4 text-muted-foreground font-medium">{h}</th>
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            b.status === "approved" ? "bg-green-500/20 text-green-400" :
                            b.status === "completed" ? "bg-primary/20 text-primary" :
                            b.status === "cancelled" ? "bg-destructive/20 text-destructive" :
                            "bg-accent/20 text-accent"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => updateBookingStatus(b.id, "approved")} className="text-green-400 hover:text-green-300 h-8 w-8 p-0">
                              <CheckCircle size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => updateBookingStatus(b.id, "completed")} className="text-primary hover:text-primary/80 h-8 w-8 p-0">
                              <Clock size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => updateBookingStatus(b.id, "cancelled")} className="text-accent hover:text-accent/80 h-8 w-8 p-0">
                              <XCircle size={16} />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => deleteBooking(b.id)} className="text-destructive hover:text-destructive/80 h-8 w-8 p-0">
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
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Team Management</h1>
              <div className="glass-card p-6 mb-6">
                <h3 className="text-foreground font-medium mb-4 flex items-center gap-2"><Plus size={18} /> Add Team Member</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="bg-secondary border-border text-foreground" />
                  <Input placeholder="Position" value={newMember.position} onChange={(e) => setNewMember({ ...newMember, position: e.target.value })} className="bg-secondary border-border text-foreground" />
                  <Input placeholder="Image URL (optional)" value={newMember.image_url} onChange={(e) => setNewMember({ ...newMember, image_url: e.target.value })} className="bg-secondary border-border text-foreground" />
                </div>
                <Button onClick={addTeamMember} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">Add Member</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((m) => (
                  <div key={m.id} className="glass-card p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {m.name.charAt(0)}
                    </div>
                    <h3 className="text-foreground font-bold">{m.name}</h3>
                    <p className="text-muted-foreground text-sm">{m.position}</p>
                    <Button size="sm" variant="ghost" onClick={() => deleteTeamMember(m.id)} className="mt-4 text-destructive hover:text-destructive/80">
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
              <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Reviews Management</h1>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="glass-card p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-foreground font-bold">{r.reviewer_name}</span>
                        <span className="text-accent">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${r.approved ? "bg-green-500/20 text-green-400" : "bg-accent/20 text-accent"}`}>
                          {r.approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{r.comment}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => toggleReviewApproval(r.id, r.approved)} className={r.approved ? "text-accent" : "text-green-400"}>
                        {r.approved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteReview(r.id)} className="text-destructive">
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

        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
