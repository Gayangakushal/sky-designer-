import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Archive, Plus, Search, X } from "lucide-react";
import { billingApi } from "@/lib/billing-api";
import type { BillingClient } from "@/types/billing";
import { ApiError, Empty, Money, PageHeader } from "./BillingCommon";
import { districtNames, provinceForDistrict } from "@/data/sri-lanka-locations";

const blank: Partial<BillingClient> = {
  name: "",
  contact_person: "",
  email: "",
  phone: "",
  billing_address: "",
  city: "",
  district: "",
  province: "",
  postal_code: "",
  country: "Sri Lanka",
  tax_identifier: "",
  notes: "",
  is_active: true,
};
export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Partial<BillingClient> | null>(null);
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["billing", "clients", search],
    queryFn: () => billingApi.clients(search),
  });
  const save = useMutation({
    mutationFn: billingApi.saveClient,
    onSuccess: () => {
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["billing", "clients"] });
    },
  });
  const archive = useMutation({
    mutationFn: billingApi.archiveClient,
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["billing", "clients"] }),
  });
  return (
    <div>
      <PageHeader
        title="Clients"
        description="Manage billing contacts and review their financial position."
        action={
          <button className="billing-primary" onClick={() => setEditing({ ...blank })}>
            <Plus size={16} /> New Client
          </button>
        }
      />
      <div className="billing-toolbar">
        <label className="billing-search">
          <Search size={16} />
          <span className="sr-only">Search clients</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or phone"
          />
        </label>
      </div>
      {query.error ? (
        <ApiError error={query.error} />
      ) : (
        <section className="admin-data-card">
          {query.data?.clients.length ? (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Invoiced</th>
                    <th>Paid</th>
                    <th>Outstanding</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {query.data.clients.map((c) => (
                    <tr key={c.id}>
                      <td className="admin-table-primary">{c.name}</td>
                      <td>
                        {c.contact_person}
                        <small className="billing-cell-sub">{c.email || c.phone}</small>
                      </td>
                      <td>{[c.city, c.country].filter(Boolean).join(", ")}</td>
                      <td>
                        <Money value={c.total_invoiced || 0} />
                      </td>
                      <td>
                        <Money value={c.total_paid || 0} />
                      </td>
                      <td>
                        <Money value={c.outstanding || 0} />
                      </td>
                      <td>{c.is_active ? "Active" : "Archived"}</td>
                      <td>
                        <div className="billing-actions">
                          <button onClick={() => setEditing(c)}>Edit</button>
                          {c.is_active && (
                            <button
                              onClick={() =>
                                confirm(
                                  "Archive this client? Financial documents will be retained.",
                                ) && archive.mutate(c.id)
                              }
                              aria-label={`Archive ${c.name}`}
                            >
                              <Archive size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty label="No clients found" />
          )}
        </section>
      )}
      {editing && (
        <ClientDialog
          value={editing}
          pending={save.isPending}
          error={save.error}
          onClose={() => setEditing(null)}
          onSave={(v) => save.mutate(v)}
        />
      )}
    </div>
  );
}

function ClientDialog({
  value,
  pending,
  error,
  onClose,
  onSave,
}: {
  value: Partial<BillingClient>;
  pending: boolean;
  error: unknown;
  onClose: () => void;
  onSave: (v: Partial<BillingClient>) => void;
}) {
  const [form, setForm] = useState(value);
  const set = (key: keyof BillingClient, val: string | boolean) =>
    setForm((p) => ({ ...p, [key]: val }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <div className="billing-modal-backdrop" role="presentation">
      <div className="billing-modal" role="dialog" aria-modal="true" aria-labelledby="client-title">
        <div className="billing-modal-head">
          <h2 id="client-title">{form.id ? "Edit Client" : "New Client"}</h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        <form onSubmit={submit} className="billing-form-grid">
          <Field
            label="Client / business name *"
            value={form.name}
            onChange={(v) => set("name", v)}
            required
          />
          <Field
            label="Contact person"
            value={form.contact_person}
            onChange={(v) => set("contact_person", v)}
          />
          <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
          <Field
            label="Address line"
            value={form.billing_address}
            onChange={(v) => set("billing_address", v)}
            wide
          />
          <Field
            label="City"
            value={form.city}
            onChange={(v) => {
              set("city", v);
              if (!form.district && districtNames.includes(v)) {
                setForm((p) => ({ ...p, city: v, district: v, province: provinceForDistrict(v) }));
              }
            }}
          />
          <label className="billing-field">
            <span>District</span>
            <select
              value={form.district || ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  district: e.target.value,
                  province: provinceForDistrict(e.target.value),
                }))
              }
            >
              <option value="">Select district</option>
              {districtNames.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <Field label="Province" value={form.province} onChange={(v) => set("province", v)} />
          <Field
            label="Postal code"
            value={form.postal_code}
            onChange={(v) => set("postal_code", v)}
          />
          <Field label="Country" value={form.country} onChange={(v) => set("country", v)} />
          <Field
            label="Tax / business identifier"
            value={form.tax_identifier}
            onChange={(v) => set("tax_identifier", v)}
          />
          <label className="billing-field billing-wide">
            <span>Notes</span>
            <textarea value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} />
          </label>
          {error ? (
            <p className="billing-form-error billing-wide">
              {error instanceof Error ? error.message : "Could not save client."}
            </p>
          ) : null}
          <div className="billing-modal-actions billing-wide">
            <button type="button" className="billing-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="billing-primary" disabled={pending || !form.name?.trim()}>
              {pending ? "Saving…" : "Save Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  wide,
}: {
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <label className={`billing-field ${wide ? "billing-wide" : ""}`}>
      <span>{label}</span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
}
