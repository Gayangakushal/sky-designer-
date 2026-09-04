import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageUp, Save, Trash2 } from "lucide-react";
import { billingApi } from "@/lib/billing-api";
import { resolveBillingAssetUrl } from "@/lib/billing-assets";
import type { BillingSettings } from "@/types/billing";
import { ApiError, PageHeader } from "./BillingCommon";

const groups: { title: string; fields: [keyof BillingSettings, string, string?][] }[] = [
  {
    title: "Business",
    fields: [
      ["business_name", "Business name"],
      ["display_name", "Display name"],
      ["website", "Website"],
      ["email", "Email", "email"],
      ["phone", "Phone"],
      ["address", "Business address"],
      ["country", "Country"],
      ["registration_number", "Registration number"],
    ],
  },
  {
    title: "Document Settings",
    fields: [
      ["quotation_prefix", "Quotation prefix"],
      ["quotation_next_number", "Next quotation number", "number"],
      ["invoice_prefix", "Invoice prefix"],
      ["invoice_next_number", "Next invoice number", "number"],
      ["default_currency", "Default currency"],
      ["default_invoice_terms", "Default invoice payment terms"],
      ["default_quote_validity", "Default quote validity (days)", "number"],
      ["default_due_days", "Default invoice due days", "number"],
      ["quotation_footer_message", "Quotation footer message"],
      ["invoice_footer_message", "Invoice footer message"],
    ],
  },
  {
    title: "Branding & Footer",
    fields: [
      ["primary_color", "Primary document color", "color"],
      ["accent_color", "Accent color", "color"],
      ["footer_company_text", "Footer company text"],
    ],
  },
  {
    title: "Payment Details",
    fields: [
      ["bank_name", "Bank name"],
      ["account_name", "Account name"],
      ["account_number", "Account number"],
      ["branch", "Branch"],
      ["payment_instructions", "Additional instructions"],
    ],
  },
  {
    title: "Terms",
    fields: [
      ["default_quotation_terms", "Default quotation terms"],
      ["default_invoice_conditions", "Default invoice terms & conditions"],
      ["disclaimer", "Disclaimer"],
    ],
  },
];
export default function BillingSettingsPage() {
  const query = useQuery({ queryKey: ["billing", "settings"], queryFn: billingApi.settings });
  const [form, setForm] = useState<Partial<BillingSettings>>({});
  const qc = useQueryClient();
  useEffect(() => {
    if (query.data) setForm(query.data.settings);
  }, [query.data]);
  const save = useMutation({
    mutationFn: billingApi.saveSettings,
    onSuccess: (d) => {
      setForm(d.settings);
      void qc.invalidateQueries({ queryKey: ["billing", "settings"] });
    },
  });
  const upload = useMutation({
    mutationFn: billingApi.uploadLogo,
    onSuccess: (logo_url) => {
      setForm((current) => ({ ...current, logo_url }));
      void qc.invalidateQueries({ queryKey: ["billing", "settings"] });
    },
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    save.mutate(form);
  };
  return (
    <div>
      <PageHeader
        title="Billing Settings"
        description="Server-side business, numbering, bank and document defaults. Issued documents retain snapshots."
      />
      {query.error ? (
        <ApiError error={query.error} />
      ) : (
        <form onSubmit={submit} className="billing-settings-grid">
          <section className="admin-data-card billing-settings-card billing-branding-card">
            <div className="admin-card-header">
              <div>
                <h2>Company Logo</h2>
                <p>PNG, JPEG or WebP. Maximum 3 MB.</p>
              </div>
            </div>
            <div className="billing-logo-control">
              {resolveBillingAssetUrl(form.logo_url) ? (
                <img src={resolveBillingAssetUrl(form.logo_url)!} alt="Current billing logo" />
              ) : (
                <div className="billing-logo-empty">No logo uploaded</div>
              )}
              <div>
                <label className="billing-primary billing-upload-button">
                  <ImageUp size={16} />
                  {upload.isPending ? "Uploading…" : form.logo_url ? "Replace Logo" : "Upload Logo"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    hidden
                    disabled={upload.isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) upload.mutate(file);
                      e.target.value = "";
                    }}
                  />
                </label>
                {form.logo_url && (
                  <button
                    type="button"
                    className="billing-secondary"
                    onClick={() => setForm((current) => ({ ...current, logo_url: "" }))}
                  >
                    <Trash2 size={15} /> Remove
                  </button>
                )}
                {upload.error && <p className="billing-form-error">{upload.error.message}</p>}
              </div>
            </div>
            <label className="billing-settings-check">
              <input
                type="checkbox"
                checked={Boolean(form.footer_show_registration)}
                onChange={(e) => setForm({ ...form, footer_show_registration: e.target.checked })}
              />
              <span>Show registration number in document footer</span>
            </label>
          </section>
          {groups.map((g) => (
            <section className="admin-data-card billing-settings-card" key={g.title}>
              <div className="admin-card-header">
                <div>
                  <h2>{g.title}</h2>
                </div>
              </div>
              <div className="billing-settings-fields">
                {g.fields.map(([key, label, type = "text"]) => (
                  <label className="billing-field" key={key}>
                    <span>{label}</span>
                    {[
                      "payment_instructions",
                      "quotation_footer_message",
                      "invoice_footer_message",
                      "default_quotation_terms",
                      "default_invoice_conditions",
                      "disclaimer",
                      "address",
                    ].includes(key) ? (
                      <textarea
                        value={String(form[key] || "")}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      />
                    ) : (
                      <input
                        type={type}
                        value={String(form[key] ?? "")}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [key]: type === "number" ? Number(e.target.value) : e.target.value,
                          })
                        }
                      />
                    )}
                  </label>
                ))}
              </div>
            </section>
          ))}
          {save.error && <p className="billing-form-error">{save.error.message}</p>}
          <div className="billing-settings-save">
            <button className="billing-primary" disabled={save.isPending}>
              <Save size={16} />
              {save.isPending ? "Saving…" : "Save Billing Settings"}
            </button>
            {save.isSuccess && <span role="status">Settings saved.</span>}
          </div>
        </form>
      )}
    </div>
  );
}
