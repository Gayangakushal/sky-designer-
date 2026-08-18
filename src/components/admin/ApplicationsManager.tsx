import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminApplications, useAdminVacancies } from "@/hooks/useVacancies";
import { APPLICATION_STATUSES, createCvSignedUrl, deleteCvFile, type JobApplication } from "@/lib/recruitment";

const ApplicationsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: applications = [], isLoading } = useAdminApplications();
  const { data: vacancies = [] } = useAdminVacancies();
  const [search, setSearch] = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const [notes, setNotes] = useState("");

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["job_applications"] });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return applications.filter((application) => {
      if (term && !`${application.full_name} ${application.email}`.toLowerCase().includes(term)) return false;
      if (vacancyFilter !== "all" && application.vacancy_id !== vacancyFilter) return false;
      if (statusFilter !== "all" && application.status !== statusFilter) return false;
      if (dateFrom && application.created_at.slice(0, 10) < dateFrom) return false;
      return true;
    });
  }, [applications, search, vacancyFilter, statusFilter, dateFrom]);

  const vacancyTitle = (application: JobApplication) =>
    vacancies.find((vacancy) => vacancy.id === application.vacancy_id)?.title ?? application.position;

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) { toast({ title: "Update failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: `Marked as ${status}` });
    refresh();
  };

  const saveNotes = async (id: string) => {
    const { error } = await supabase.from("job_applications").update({ admin_notes: notes }).eq("id", id);
    if (error) { toast({ title: "Update failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Notes saved" });
    refresh();
  };

  const openCv = async (application: JobApplication) => {
    try {
      window.open(await createCvSignedUrl(application.cv_file_path), "_blank", "noopener");
    } catch (error) {
      toast({ title: "Could not open CV", description: error instanceof Error ? error.message : "", variant: "destructive" });
    }
  };

  const remove = async (application: JobApplication) => {
    if (!window.confirm(`Delete the application from ${application.full_name}?`)) return;
    try { await deleteCvFile(application.cv_file_path); } catch { /* file may already be gone */ }
    const { error } = await supabase.from("job_applications").delete().eq("id", application.id);
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Application deleted" });
    setSelected(null);
    refresh();
  };

  const inputClass = "bg-secondary border-border text-foreground";
  const selectClass = "h-10 rounded-md border border-border bg-secondary px-3 text-sm text-foreground";

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Job Applications</h1>

      <div className="glass-card p-6 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input placeholder="Search name or email" value={search} onChange={(e) => setSearch(e.target.value)} className={inputClass} />
        <select value={vacancyFilter} onChange={(e) => setVacancyFilter(e.target.value)} className={selectClass}>
          <option value="all">All vacancies</option>
          {vacancies.map((vacancy) => <option key={vacancy.id} value={vacancy.id}>{vacancy.title}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
          <option value="all">All statuses</option>
          {APPLICATION_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className={inputClass} />
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Applicant", "Vacancy", "Email", "Phone", "Experience", "Applied Date", "Status", "Actions"].map((header) => (
                <th key={header} className="text-left p-4 text-muted-foreground font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((application) => (
              <tr key={application.id} className="border-b border-border/50">
                <td className="p-4 text-foreground">{application.full_name}</td>
                <td className="p-4 text-foreground">{vacancyTitle(application)}</td>
                <td className="p-4 text-muted-foreground">{application.email}</td>
                <td className="p-4 text-muted-foreground">{application.phone}</td>
                <td className="p-4 text-muted-foreground">{application.years_of_experience || "—"}</td>
                <td className="p-4 text-muted-foreground">{new Date(application.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <select value={application.status} onChange={(e) => updateStatus(application.id, e.target.value)} className={selectClass}>
                    {APPLICATION_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => { setSelected(application); setNotes(application.admin_notes ?? ""); }}>View</Button>
                    <Button size="sm" variant="ghost" onClick={() => openCv(application)}><Download size={16} /></Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(application)} className="text-destructive"><Trash2 size={16} /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="text-center text-muted-foreground py-8">Loading applications...</p>}
        {!isLoading && rows.length === 0 && <p className="text-center text-muted-foreground py-8">No applications found.</p>}
      </div>

      {selected && (
        <div className="glass-card p-6 mt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-foreground font-bold text-lg">{selected.full_name}</h3>
              <p className="text-muted-foreground text-sm">{vacancyTitle(selected)} · applied {new Date(selected.created_at).toLocaleString()}</p>
            </div>
            <Button variant="ghost" onClick={() => setSelected(null)}>Close</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-muted-foreground">
            <p>Email: <span className="text-foreground">{selected.email}</span></p>
            <p>Phone: <span className="text-foreground">{selected.phone}</span></p>
            <p>Location: <span className="text-foreground">{selected.current_location || "—"}</span></p>
            <p>Experience: <span className="text-foreground">{selected.years_of_experience || "—"}</span></p>
            <p>LinkedIn: {selected.linkedin_profile ? <a href={selected.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-primary">{selected.linkedin_profile}</a> : "—"}</p>
            <p>Portfolio: {selected.portfolio_website ? <a href={selected.portfolio_website} target="_blank" rel="noopener noreferrer" className="text-primary">{selected.portfolio_website}</a> : "—"}</p>
            <p>Status: <span className="text-foreground">{selected.status}</span></p>
            <p>CV: <button type="button" onClick={() => openCv(selected)} className="text-primary">{selected.cv_file_name}</button></p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Cover message</p>
          <p className="mt-1 whitespace-pre-line text-sm text-foreground">{selected.cover_message}</p>
          <p className="mt-4 text-sm text-muted-foreground">Admin notes</p>
          <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputClass} mt-1`} />
          <Button className="mt-3 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => saveNotes(selected.id)}>Save notes</Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManager;
