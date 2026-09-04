import { useEffect, useState } from "react";
import { Plus, ShieldCheck, Trash2, UserCheck, UserX, X } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useToast } from "@/hooks/use-toast";
import { staffApi, staffRoleLabel, staffStatusLabel, type StaffMember } from "@/lib/staff-api";
import { ApiError, Empty, PageHeader } from "@/components/billing/BillingCommon";
import BlogAdminShell from "@/components/admin/BlogAdminShell";

const roleClass = (role: StaffMember["role"]) =>
  role === "admin" ? "admin-badge-purple" : role === "accounting" ? "admin-badge-blue" : "admin-badge-gray";
const statusClass = (status: StaffMember["status"]) =>
  status === "active" ? "admin-badge-green" : status === "disabled" ? "admin-badge-red" : "admin-badge-amber";

export default function AdminStaffAccess() {
  const { loading, isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadStaff = async () => {
    setLoadingStaff(true);
    setError(null);
    try {
      setStaff((await staffApi.list()).staff || []);
    } catch (nextError) {
      setError(nextError);
    } finally {
      setLoadingStaff(false);
    }
  };

  useEffect(() => {
    if (isAdmin) void loadStaff();
  }, [isAdmin]);

  if (loading) return <div className="admin-shell grid min-h-screen place-items-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" /></div>;
  if (!isAdmin) return null;

  const runAction = async (userId: string, action: () => Promise<unknown>, success: string) => {
    setBusyId(userId);
    try {
      await action();
      toast({ title: success });
      await loadStaff();
    } catch (nextError) {
      toast({ title: "Staff action failed", description: nextError instanceof Error ? nextError.message : "Please try again.", variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <BlogAdminShell>
      <div>
      <PageHeader
        title="Staff Access"
        description="Manage staff access and permissions."
        action={<button className="billing-primary" onClick={() => setAdding(true)}><Plus size={16} /> Add Staff Member</button>}
      />
      {error ? <ApiError error={error} /> : (
        <section className="admin-data-card">
          {loadingStaff ? <div className="billing-loading">Loading staff access…</div> : staff.length ? (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead><tr><th>Full Name</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>{staff.map((member) => (
                  <tr key={member.user_id}>
                    <td className="admin-table-primary">{member.full_name || "—"}</td>
                    <td>{member.email}</td>
                    <td><span className={`admin-badge ${roleClass(member.role)}`}><ShieldCheck size={12} /> {staffRoleLabel(member.role)}</span></td>
                    <td><span className={`admin-badge ${statusClass(member.status)}`}>{staffStatusLabel(member.status)}</span></td>
                    <td>{member.created_at ? new Intl.DateTimeFormat("en-LK", { dateStyle: "medium" }).format(new Date(member.created_at)) : "—"}</td>
                    <td><div className="billing-actions">
                      {member.role === "accounting" && member.status !== "disabled" && <button disabled={busyId === member.user_id} onClick={() => confirm("Disable this staff member's access?") && void runAction(member.user_id, () => staffApi.setStatus(member.user_id, true), "Staff access disabled")} title="Disable access"><UserX size={15} /> Disable</button>}
                      {member.role === "accounting" && member.status === "disabled" && <button disabled={busyId === member.user_id} onClick={() => void runAction(member.user_id, () => staffApi.setStatus(member.user_id, false), "Staff access enabled")} title="Enable access"><UserCheck size={15} /> Enable</button>}
                      {member.role === "accounting" && <button className="billing-icon-danger" disabled={busyId === member.user_id} onClick={() => confirm("Remove this staff account and its access?") && void runAction(member.user_id, () => staffApi.delete(member.user_id), "Staff access removed")} title="Remove access"><Trash2 size={15} /> Remove</button>}
                    </div></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          ) : <Empty label="No staff members found" />}
        </section>
      )}
      {adding && <AddStaffDialog onClose={() => setAdding(false)} onCreated={async () => { setAdding(false); await loadStaff(); toast({ title: "Accounting staff member created" }); }} />}
      </div>
    </BlogAdminShell>
  );
}

function AddStaffDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => Promise<void> }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "accounting" as const });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.password.length < 8) { setError("Temporary password must be at least 8 characters."); return; }
    setPending(true); setError("");
    try { await staffApi.create(form); await onCreated(); } catch (nextError) { const message = nextError instanceof Error ? nextError.message : "Could not create staff member."; setError(message); toast({ title: "Staff creation failed", description: message, variant: "destructive" }); } finally { setPending(false); }
  };
  return <div className="billing-modal-backdrop"><div className="billing-modal" role="dialog" aria-modal="true" aria-labelledby="staff-dialog-title"><div className="billing-modal-head"><h2 id="staff-dialog-title">Add Staff Member</h2><button type="button" onClick={onClose} aria-label="Close"><X /></button></div><form onSubmit={submit} className="billing-form-grid"><Field label="Full Name" value={form.full_name} onChange={(value) => setForm({ ...form, full_name: value })} required /><Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required /><Field label="Temporary Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required minLength={8} /><label className="billing-field"><span>Role</span><select value={form.role} disabled><option value="accounting">Accounting</option></select></label>{error && <p className="billing-form-error billing-wide">{error}</p>}<div className="billing-modal-actions billing-wide"><button type="button" className="billing-secondary" onClick={onClose}>Cancel</button><button className="billing-primary" disabled={pending}>{pending ? "Creating…" : "Create Staff Member"}</button></div></form></div></div>;
}

function Field({ label, value, onChange, type = "text", required, minLength }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; minLength?: number }) {
  return <label className="billing-field"><span>{label}</span><input type={type} value={value} required={required} minLength={minLength} onChange={(event) => onChange(event.target.value)} /></label>;
}
