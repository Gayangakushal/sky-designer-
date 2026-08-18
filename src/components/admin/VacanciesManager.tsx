import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdminApplications, useAdminVacancies } from "@/hooks/useVacancies";
import { slugify, VACANCY_STATUSES, type Vacancy } from "@/lib/recruitment";

const emptyForm = {
  title: "", slug: "", department: "", location: "", employment_type: "Full-time", work_mode: "On-site",
  experience_required: "", short_description: "", description: "", responsibilities: "", requirements: "",
  benefits: "", application_deadline: "", status: "draft", is_active: true, sort_order: 0,
};
type FormState = typeof emptyForm;

const toLines = (value: string[]) => value.join("\n");
const fromLines = (value: string) => value.split("\n").map((line) => line.trim()).filter(Boolean);

const VacanciesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: vacancies = [], isLoading } = useAdminVacancies();
  const { data: applications = [] } = useAdminApplications();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const counts = useMemo(() => {
    const map = new Map<string, { total: number; new: number; shortlisted: number; hired: number }>();
    applications.forEach((application) => {
      if (!application.vacancy_id) return;
      const entry = map.get(application.vacancy_id) ?? { total: 0, new: 0, shortlisted: 0, hired: 0 };
      entry.total += 1;
      if (application.status === "new") entry.new += 1;
      if (application.status === "shortlisted") entry.shortlisted += 1;
      if (application.status === "hired") entry.hired += 1;
      map.set(application.vacancy_id, entry);
    });
    return map;
  }, [applications]);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["vacancies"] });
  const set = (patch: Partial<FormState>) => setForm((current) => ({ ...current, ...patch }));

  const startEdit = (vacancy: Vacancy) => {
    setEditingId(vacancy.id);
    setForm({
      title: vacancy.title, slug: vacancy.slug, department: vacancy.department ?? "", location: vacancy.location ?? "",
      employment_type: vacancy.employment_type ?? "", work_mode: vacancy.work_mode ?? "",
      experience_required: vacancy.experience_required ?? "", short_description: vacancy.short_description ?? "",
      description: vacancy.description ?? "", responsibilities: toLines(vacancy.responsibilities),
      requirements: toLines(vacancy.requirements), benefits: toLines(vacancy.benefits),
      application_deadline: vacancy.application_deadline ?? "", status: vacancy.status,
      is_active: vacancy.is_active, sort_order: vacancy.sort_order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (statusOverride?: string) => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      slug: (form.slug.trim() || slugify(form.title)),
      department: form.department || null,
      location: form.location || null,
      employment_type: form.employment_type || null,
      work_mode: form.work_mode || null,
      experience_required: form.experience_required || null,
      short_description: form.short_description || null,
      description: form.description || null,
      responsibilities: fromLines(form.responsibilities),
      requirements: fromLines(form.requirements),
      benefits: fromLines(form.benefits),
      application_deadline: form.application_deadline || null,
      status: statusOverride ?? form.status,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 0,
    };
    const { error } = editingId
      ? await supabase.from("vacancies").update(payload).eq("id", editingId)
      : await supabase.from("vacancies").insert(payload);
    setSaving(false);
    if (error) { toast({ title: "Could not save vacancy", description: error.message, variant: "destructive" }); return; }
    toast({ title: editingId ? "Vacancy updated" : "Vacancy created" });
    setForm(emptyForm); setEditingId(null); refresh();
  };

  const patch = async (id: string, values: Partial<Vacancy>) => {
    const { error } = await supabase.from("vacancies").update(values).eq("id", id);
    if (error) { toast({ title: "Update failed", description: error.message, variant: "destructive" }); return; }
    refresh();
  };

  const remove = async (vacancy: Vacancy) => {
    if (!window.confirm(`Delete "${vacancy.title}"? Applications will be kept with their saved position title.`)) return;
    const { error } = await supabase.from("vacancies").delete().eq("id", vacancy.id);
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Vacancy deleted" });
    queryClient.invalidateQueries({ queryKey: ["vacancies"] });
    queryClient.invalidateQueries({ queryKey: ["job_applications"] });
  };

  const move = (vacancy: Vacancy, direction: -1 | 1) => patch(vacancy.id, { sort_order: Math.max(0, vacancy.sort_order + direction) });
  const inputClass = "bg-secondary border-border text-foreground";

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Vacancies</h1>

      <div className="glass-card p-6 mb-8">
        <h3 className="text-foreground font-medium mb-4 flex items-center gap-2"><Plus size={18} /> {editingId ? "Edit vacancy" : "Create vacancy"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Title *" value={form.title} onChange={(e) => set({ title: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })} className={inputClass} />
          <Input placeholder="Slug" value={form.slug} onChange={(e) => set({ slug: e.target.value })} className={inputClass} />
          <Input placeholder="Department" value={form.department} onChange={(e) => set({ department: e.target.value })} className={inputClass} />
          <Input placeholder="Location" value={form.location} onChange={(e) => set({ location: e.target.value })} className={inputClass} />
          <Input placeholder="Employment type" value={form.employment_type} onChange={(e) => set({ employment_type: e.target.value })} className={inputClass} />
          <Input placeholder="Work mode" value={form.work_mode} onChange={(e) => set({ work_mode: e.target.value })} className={inputClass} />
          <Input placeholder="Experience required" value={form.experience_required} onChange={(e) => set({ experience_required: e.target.value })} className={inputClass} />
          <Input type="date" value={form.application_deadline} onChange={(e) => set({ application_deadline: e.target.value })} className={inputClass} />
          <Input type="number" placeholder="Sort order" value={form.sort_order} onChange={(e) => set({ sort_order: Number(e.target.value) })} className={inputClass} />
          <select value={form.status} onChange={(e) => set({ status: e.target.value })} className="h-10 rounded-md border border-border bg-secondary px-3 text-sm text-foreground">
            {VACANCY_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={form.is_active} onChange={(e) => set({ is_active: e.target.checked })} /> Active
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Textarea placeholder="Short description" rows={3} value={form.short_description} onChange={(e) => set({ short_description: e.target.value })} className={inputClass} />
          <Textarea placeholder="Full description" rows={3} value={form.description} onChange={(e) => set({ description: e.target.value })} className={inputClass} />
          <Textarea placeholder="Responsibilities (one per line)" rows={4} value={form.responsibilities} onChange={(e) => set({ responsibilities: e.target.value })} className={inputClass} />
          <Textarea placeholder="Requirements (one per line)" rows={4} value={form.requirements} onChange={(e) => set({ requirements: e.target.value })} className={inputClass} />
          <Textarea placeholder="Benefits (one per line)" rows={3} value={form.benefits} onChange={(e) => set({ benefits: e.target.value })} className={inputClass} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button disabled={saving} onClick={() => save()} className="bg-primary hover:bg-primary/90 text-primary-foreground">{editingId ? "Save changes" : "Create vacancy"}</Button>
          <Button disabled={saving} variant="outline" onClick={() => save("active")}>Publish</Button>
          <Button disabled={saving} variant="outline" onClick={() => save("draft")}>Save as draft</Button>
          {editingId && <Button variant="ghost" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</Button>}
        </div>
      </div>

      {isLoading && <p className="text-muted-foreground">Loading vacancies...</p>}
      <div className="space-y-4">
        {vacancies.map((vacancy) => {
          const stats = counts.get(vacancy.id) ?? { total: 0, new: 0, shortlisted: 0, hired: 0 };
          return (
            <div key={vacancy.id} className="glass-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-foreground font-bold">{vacancy.title}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">{vacancy.status}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${vacancy.is_active ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"}`}>{vacancy.is_active ? "active" : "inactive"}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {[vacancy.department, vacancy.location, vacancy.employment_type, vacancy.work_mode].filter(Boolean).join(" · ")}
                    {vacancy.application_deadline ? ` · deadline ${vacancy.application_deadline}` : ""}
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">
                    {stats.total} applications · {stats.new} new · {stats.shortlisted} shortlisted · {stats.hired} hired
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Button size="sm" variant="ghost" onClick={() => move(vacancy, -1)}><ArrowUp size={16} /></Button>
                  <Button size="sm" variant="ghost" onClick={() => move(vacancy, 1)}><ArrowDown size={16} /></Button>
                  <Button size="sm" variant="ghost" onClick={() => startEdit(vacancy)}>Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => patch(vacancy.id, { status: "active", is_active: true })}>Publish</Button>
                  <Button size="sm" variant="ghost" onClick={() => patch(vacancy.id, { status: "closed" })}>Close</Button>
                  <Button size="sm" variant="ghost" onClick={() => patch(vacancy.id, { status: "archived", is_active: false })}>Archive</Button>
                  <Button size="sm" variant="ghost" onClick={() => patch(vacancy.id, { is_active: !vacancy.is_active })}>{vacancy.is_active ? "Deactivate" : "Activate"}</Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(vacancy)} className="text-destructive"><Trash2 size={16} /></Button>
                </div>
              </div>
            </div>
          );
        })}
        {!isLoading && vacancies.length === 0 && <p className="text-center text-muted-foreground py-8">No vacancies yet.</p>}
      </div>
    </div>
  );
};

export default VacanciesManager;
