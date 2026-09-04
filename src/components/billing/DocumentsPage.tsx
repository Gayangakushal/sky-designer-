import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Copy,
  CreditCard,
  Download,
  Eye,
  FilePlus2,
  Pencil,
  Plus,
  Printer,
  Search,
  Send,
  Trash2,
  Ban,
  Archive as ArchiveIcon,
  X,
} from "lucide-react";
import { billingApi } from "@/lib/billing-api";
import { calculateTotals } from "@/lib/billing-calculations";
import type { BillingInvoice, BillingQuote, LineItem } from "@/types/billing";
import { ApiError, Empty, Money, PageHeader, StatusBadge } from "./BillingCommon";
import DocumentPreview from "./DocumentPreview";

type Kind = "quote" | "invoice";
type Doc = BillingQuote | BillingInvoice;
const invoiceDisplayStatus = (status: string) => (status === "SENT" ? "UNPAID" : status);
const today = () => new Date().toISOString().slice(0, 10);
const blankItem = (): LineItem => ({
  service_title: "",
  description: "",
  quantity: 1,
  unit_price: 0,
  line_total: 0,
  sort_order: 0,
});

export default function DocumentsPage({ kind }: { kind: Kind }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<Partial<Doc> | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const qc = useQueryClient();
  const list = useQuery<{ rows: Doc[] }>({
    queryKey: ["billing", kind, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({ search, status }).toString();
      if (kind === "quote") return { rows: (await billingApi.quotes(params)).quotes };
      return { rows: (await billingApi.invoices(params)).invoices };
    },
  });
  const detail = useQuery<{ document: Doc; activity: Record<string, unknown>[] }>({
    queryKey: ["billing", kind, "detail", selected],
    queryFn: async () => {
      if (kind === "quote") {
        const d = await billingApi.quote(selected!);
        return { document: d.quote, activity: d.activity };
      }
      const d = await billingApi.invoice(selected!);
      return { document: d.invoice, activity: d.activity };
    },
    enabled: selected !== null,
  });
  const save = useMutation<unknown, Error, Record<string, unknown>>({
    mutationFn: async (v) =>
      kind === "quote" ? await billingApi.saveQuote(v) : await billingApi.saveInvoice(v),
    onSuccess: () => {
      setEditing(null);
      void qc.invalidateQueries({ queryKey: ["billing", kind] });
    },
  });
  const action = useMutation({
    mutationFn: ({ action, id, status }: { action: string; id: number; status?: string }) =>
      kind === "quote"
        ? billingApi.quoteAction(action as "status" | "duplicate" | "convert", { id, status })
        : billingApi.invoiceStatus(id, status!),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["billing"] });
    },
  });
  const remove = useMutation({
    mutationFn: (id: number) =>
      kind === "quote" ? billingApi.deleteQuote(id) : billingApi.deleteInvoice(id),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["billing", kind] }),
  });
  const archive = useMutation({
    mutationFn: (id: number) => billingApi.archiveDocument(kind, id),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["billing", kind] }),
  });
  const rows = list.data?.rows || [];
  const title = kind === "quote" ? "Quotations" : "Invoices";
  const create = () =>
    setEditing(
      kind === "quote"
        ? {
            quote_date: today(),
            currency: "LKR",
            status: "DRAFT",
            discount: 0,
            tax: 0,
            items: [blankItem()],
          }
        : {
            invoice_date: today(),
            due_date: "",
            currency: "LKR",
            status: "DRAFT",
            discount: 0,
            tax: 0,
            items: [blankItem()],
          },
    );
  return (
    <div>
      <PageHeader
        title={title}
        description={
          kind === "quote"
            ? "Create, issue, duplicate and convert professional quotations."
            : "Track issued invoices, balances, due dates and payment status."
        }
        action={
          <button className="billing-primary" onClick={create}>
            <Plus size={16} /> New {kind === "quote" ? "Quotation" : "Invoice"}
          </button>
        }
      />
      <div className="billing-toolbar">
        <label className="billing-search">
          <Search size={16} />
          <span className="sr-only">Search {title}</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Number, client, subject or amount"
          />
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {(kind === "quote"
            ? ["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED", "CONVERTED"]
            : ["DRAFT", "SENT", "PARTIALLY_PAID", "PAID", "OVERDUE", "CANCELLED"]
          ).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      {list.error ? (
        <ApiError error={list.error} />
      ) : (
        <section className="admin-data-card">
          {rows.length ? (
            <div className="admin-table-scroll">
              <table className="admin-table billing-doc-table">
                <thead>
                  <tr>
                    {kind === "quote" ? (
                      <>
                        <th>Quote No</th>
                        <th>Client</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Updated</th>
                      </>
                    ) : (
                      <>
                        <th>Invoice No</th>
                        <th>Client</th>
                        <th>Invoice Date</th>
                        <th>Due Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Status</th>
                      </>
                    )}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((doc) => (
                    <tr key={doc.id}>
                      {kind === "quote" ? (
                        <QuoteCells quote={doc as BillingQuote} />
                      ) : (
                        <InvoiceCells invoice={doc as BillingInvoice} />
                      )}
                      <td>
                        <div className="billing-actions">
                          <button onClick={() => setSelected(doc.id)} title="Preview">
                            <Eye size={15} />
                          </button>
                          {doc.status === "DRAFT" && (
                            <button onClick={() => setEditing(doc)} title="Edit draft">
                              <Pencil size={15} />
                            </button>
                          )}
                          {doc.status === "DRAFT" && (
                            <button
                              title="Delete draft"
                              aria-label={`Delete draft ${doc.id}`}
                              onClick={() =>
                                confirm(
                                  "Permanently delete this draft? Issued documents cannot be deleted.",
                                ) && remove.mutate(doc.id)
                              }
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                          {doc.status !== "DRAFT" && (
                            <button
                              title="Archive"
                              aria-label={`Archive ${doc.id}`}
                              onClick={() =>
                                confirm(
                                  "Archive this document? Its financial history will be preserved.",
                                ) && archive.mutate(doc.id)
                              }
                            >
                              <ArchiveIcon size={15} />
                            </button>
                          )}
                          {kind === "quote" && (
                            <>
                              <button
                                onClick={() => action.mutate({ action: "duplicate", id: doc.id })}
                                title="Duplicate"
                              >
                                <Copy size={15} />
                              </button>
                              <button
                                onClick={() => action.mutate({ action: "convert", id: doc.id })}
                                title="Convert to invoice"
                              >
                                <FilePlus2 size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty label={`No ${title.toLowerCase()} found`} />
          )}
        </section>
      )}
      {editing && (
        <DocumentEditor
          kind={kind}
          initial={editing}
          pending={save.isPending}
          error={save.error}
          onClose={() => setEditing(null)}
          onSave={(v) => save.mutate(v)}
        />
      )}
      {selected && (
        <DetailDialog
          kind={kind}
          data={detail.data}
          loading={detail.isLoading}
          error={detail.error}
          onClose={() => setSelected(null)}
          onEdit={(d) => {
            setSelected(null);
            setEditing(d);
          }}
          onAction={(a, s) => action.mutate({ action: a, id: selected, status: s })}
        />
      )}
    </div>
  );
}

const QuoteCells = ({ quote: q }: { quote: BillingQuote }) => (
  <>
    <td className="admin-table-primary">{q.quote_number}</td>
    <td>{q.client_name}</td>
    <td>{q.subject}</td>
    <td>{q.quote_date}</td>
    <td>
      <Money value={q.total} currency={q.currency} />
    </td>
    <td>
      <StatusBadge status={q.status} />
    </td>
    <td>{q.updated_at?.slice(0, 10)}</td>
  </>
);
const InvoiceCells = ({ invoice: i }: { invoice: BillingInvoice }) => (
  <>
    <td className="admin-table-primary">{i.invoice_number}</td>
    <td>{i.client_name}</td>
    <td>{i.invoice_date}</td>
    <td>{i.due_date}</td>
    <td>
      <Money value={i.total} currency={i.currency} />
    </td>
    <td>
      <Money value={i.amount_paid} currency={i.currency} />
    </td>
    <td>
      <Money value={i.balance_due} currency={i.currency} />
    </td>
    <td>
      <StatusBadge status={invoiceDisplayStatus(i.status)} />
    </td>
  </>
);

function DocumentEditor({
  kind,
  initial,
  pending,
  error,
  onClose,
  onSave,
}: {
  kind: Kind;
  initial: Partial<Doc>;
  pending: boolean;
  error: unknown;
  onClose: () => void;
  onSave: (v: Record<string, unknown>) => void;
}) {
  const [form, setForm] = useState<Partial<Doc>>({
    ...initial,
    currency: initial.currency || "LKR",
    items: initial.items?.length ? initial.items : [blankItem()],
  });
  const [saveStatus, setSaveStatus] = useState<"DRAFT" | "SENT">("DRAFT");
  const clients = useQuery({
    queryKey: ["billing", "clients", "editor"],
    queryFn: () => billingApi.clients(),
    retry: 1,
  });
  const settings = useQuery({
    queryKey: ["billing", "settings", "editor"],
    queryFn: billingApi.settings,
    retry: 1,
  });
  useEffect(() => {
    if (!settings.data || initial.id) return;
    const defaults = settings.data.settings;
    const addDays = (days: number) => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return date.toISOString().slice(0, 10);
    };
    setForm((current) => ({
      ...current,
      currency: defaults.default_currency || "LKR",
      terms:
        current.terms ||
        (kind === "quote" ? defaults.default_quotation_terms : defaults.default_invoice_conditions),
      ...(kind === "quote"
        ? {
            valid_until:
              (current as Partial<BillingQuote>).valid_until ||
              addDays(Number(defaults.default_quote_validity) || 30),
          }
        : {
            due_date:
              (current as Partial<BillingInvoice>).due_date ||
              addDays(Number(defaults.default_due_days) || 30),
            payment_terms:
              (current as Partial<BillingInvoice>).payment_terms || defaults.default_invoice_terms,
          }),
    }));
  }, [settings.data, initial.id, kind]);
  const items = form.items || [];
  const totals = useMemo(
    () => calculateTotals(items, form.discount, form.tax),
    [items, form.discount, form.tax],
  );
  const previewDocument = useMemo<Doc>(() => {
    const selectedClient = clients.data?.clients.find((client) => client.id === form.client_id);
    const clientSnapshot = Object.fromEntries(
      Object.entries(selectedClient || { name: form.client_name || "Client" })
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => [key, String(value)]),
    );
    const previewItems = items.map((line, index) => ({
      ...line,
      quantity: Number(line.quantity) || 0,
      unit_price: Number(line.unit_price) || 0,
      line_total: (Number(line.quantity) || 0) * (Number(line.unit_price) || 0),
      sort_order: index,
    }));
    const quoteForm = form as Partial<BillingQuote>;
    const invoiceForm = form as Partial<BillingInvoice>;
    const common = {
      ...form,
      id: Number(form.id || 0),
      client_id: Number(form.client_id || 0),
      client_name: selectedClient?.name || form.client_name || "Client",
      subject: String(form.subject || ""),
      currency: form.currency || "LKR",
      status: form.status || "DRAFT",
      notes: form.notes || null,
      terms: form.terms || null,
      subtotal: totals.subtotal,
      discount: Number(form.discount) || 0,
      tax: Number(form.tax) || 0,
      total: totals.total,
      items: previewItems,
      client_snapshot: clientSnapshot,
      company_snapshot: settings.data?.settings,
      created_at: "",
      updated_at: "",
    };
    if (kind === "quote") {
      return {
        ...common,
          quote_number: String(quoteForm.quote_number || "DRAFT-QUOTATION"),
          quote_date: String(quoteForm.quote_date || today()),
          valid_until: quoteForm.valid_until || null,
      } as BillingQuote;
    }
    return {
      ...common,
      invoice_number: String(invoiceForm.invoice_number || "DRAFT-INVOICE"),
      invoice_date: String(invoiceForm.invoice_date || today()),
      due_date: String(invoiceForm.due_date || ""),
      payment_terms: invoiceForm.payment_terms || null,
      amount_paid: Number(invoiceForm.amount_paid) || 0,
      balance_due: Math.max(0, totals.total - (Number(invoiceForm.amount_paid) || 0)),
      source_quote_id: invoiceForm.source_quote_id || null,
    } as BillingInvoice;
  }, [clients.data?.clients, form, items, kind, settings.data?.settings, totals]);
  const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));
  const item = (index: number, k: keyof LineItem, v: string | number) =>
    set(
      "items",
      items.map((x, i) =>
        i === index
          ? {
              ...x,
              [k]: v,
              line_total:
                k === "quantity"
                  ? Number(v) * x.unit_price
                  : k === "unit_price"
                    ? x.quantity * Number(v)
                    : x.line_total,
              sort_order: i,
            }
          : x,
      ),
    );
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      status: form.id ? form.status : saveStatus,
      subtotal: totals.subtotal,
      total: totals.total,
      items,
    });
  };
  return (
    <div className="billing-modal-backdrop">
      <div className="billing-modal billing-modal-large" role="dialog" aria-modal="true">
        <div className="billing-modal-head">
          <h2>
            {form.id ? "Edit" : "New"} {kind === "quote" ? "Quotation" : "Invoice"}
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>
        <form onSubmit={submit} className="billing-document-form">
          <div className="billing-editor-layout">
            <div className="billing-editor-fields">
              {clients.isLoading || settings.isLoading ? (
                <div className="billing-inline-state">Loading billing details...</div>
              ) : null}
          {clients.error ? (
            <div className="billing-inline-error" role="alert">
              Unable to load clients.{" "}
              <button type="button" onClick={() => void clients.refetch()}>
                Retry
              </button>
            </div>
          ) : null}
          {settings.error ? (
            <div className="billing-inline-error" role="alert">
              Unable to load billing settings. LKR remains available.{" "}
              <button type="button" onClick={() => void settings.refetch()}>
                Retry
              </button>
            </div>
          ) : null}
          {clients.data?.clients.length === 0 ? (
            <div className="billing-inline-error">
              Create a client first. <a href="/admin/billing/clients">Go to Clients</a>
            </div>
          ) : null}
          <div className="billing-form-grid">
            <label className="billing-field">
              <span>Client *</span>
              <select
                value={form.client_id || ""}
                onChange={(e) => set("client_id", Number(e.target.value))}
                required
                disabled={!clients.data?.clients.length}
              >
                <option value="">Select client</option>
                {clients.data?.clients
                  .filter((c) => c.is_active)
                  .map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </label>
            <Field
              label="Subject"
              value={form.subject}
              set={(v) => set("subject", v)}
              required={kind === "quote"}
            />
            {kind === "quote" ? (
              <>
                <Field
                  label="Quote date"
                  type="date"
                  value={(form as Partial<BillingQuote>).quote_date}
                  set={(v) => set("quote_date", v)}
                  required
                />
                <Field
                  label="Valid until"
                  type="date"
                  value={(form as Partial<BillingQuote>).valid_until}
                  set={(v) => set("valid_until", v)}
                />
              </>
            ) : (
              <>
                <Field
                  label="Invoice date"
                  type="date"
                  value={(form as Partial<BillingInvoice>).invoice_date}
                  set={(v) => set("invoice_date", v)}
                  required
                />
                <Field
                  label="Due date"
                  type="date"
                  value={(form as Partial<BillingInvoice>).due_date}
                  set={(v) => set("due_date", v)}
                  required
                />
              </>
            )}
            <Field
              label="Currency"
              value={form.currency}
              set={(v) => set("currency", v)}
              required
            />
            <Field
              label="Discount"
              type="number"
              value={String(form.discount || 0)}
              set={(v) => set("discount", Number(v))}
            />
            <Field
              label="Tax"
              type="number"
              value={String(form.tax || 0)}
              set={(v) => set("tax", Number(v))}
            />
          </div>
          <div className="billing-line-editor">
            <div className="billing-section-title">
              <h3>Line Items</h3>
              <button
                type="button"
                className="billing-secondary"
                onClick={() => set("items", [...items, blankItem()])}
              >
                <Plus size={15} /> Add line
              </button>
            </div>
            {items.map((x, i) => (
              <div className="billing-line-row" key={i}>
                <Field
                  label="Service title *"
                  value={x.service_title}
                  set={(v) => item(i, "service_title", v)}
                  required
                />
                <label className="billing-field billing-description">
                  <span>Description</span>
                  <textarea
                    value={x.description}
                    onChange={(e) => item(i, "description", e.target.value)}
                  />
                </label>
                <Field
                  label="Qty"
                  type="number"
                  value={String(x.quantity)}
                  set={(v) => item(i, "quantity", Number(v))}
                  required
                />
                <Field
                  label="Unit price"
                  type="number"
                  value={String(x.unit_price)}
                  set={(v) => item(i, "unit_price", Number(v))}
                  required
                />
                <div className="billing-line-total">
                  <span>Amount</span>
                  <strong>
                    <Money value={x.quantity * x.unit_price} currency={form.currency} />
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "items",
                      items.filter((_, n) => n !== i),
                    )
                  }
                  aria-label="Remove line"
                  disabled={items.length === 1}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="billing-form-grid">
            <label className="billing-field billing-wide">
              <span>Notes</span>
              <textarea value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} />
            </label>
            <label className="billing-field billing-wide">
              <span>Terms &amp; Conditions</span>
              <textarea value={form.terms || ""} onChange={(e) => set("terms", e.target.value)} />
            </label>
          </div>
          <div className="billing-editor-summary">
            <span>
              Subtotal{" "}
              <strong>
                <Money value={totals.subtotal} currency={form.currency} />
              </strong>
            </span>
            <span>
              Total{" "}
              <strong>
                <Money value={totals.total} currency={form.currency} />
              </strong>
            </span>
          </div>
              {error ? (
                <p className="billing-form-error">
                  {error instanceof Error ? error.message : "Could not save document."}
                </p>
              ) : null}
            </div>
            <aside className="billing-live-preview" aria-label="Live document preview">
              <div className="billing-live-preview-head">
                <span>Live Preview</span>
                <small>A4 document</small>
              </div>
              <DocumentPreview document={previewDocument} kind={kind} />
            </aside>
          </div>
          <div className="billing-modal-actions">
            <button type="button" className="billing-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="billing-secondary"
              onClick={() => setSaveStatus("DRAFT")}
              disabled={pending || !items.length || !clients.data?.clients.length}
            >
              {pending ? "Saving…" : "Save Draft"}
            </button>
            {!form.id && (
              <button
                type="submit"
                className="billing-primary"
                onClick={() => setSaveStatus("SENT")}
                disabled={pending || !items.length || !clients.data?.clients.length}
              >
                {kind === "quote" ? "Save & Mark Sent" : "Issue Invoice"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
function Field({
  label,
  value,
  set,
  type = "text",
  required,
}: {
  label: string;
  value?: string | null;
  set: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="billing-field">
      <span>{label}</span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => set(e.target.value)}
        required={required}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? "0.01" : undefined}
      />
    </label>
  );
}

function DetailDialog({
  kind,
  data,
  loading,
  error,
  onClose,
  onEdit,
  onAction,
}: {
  kind: Kind;
  data?: { document: Doc; activity?: Record<string, unknown>[] };
  loading: boolean;
  error: unknown;
  onClose: () => void;
  onEdit: (d: Doc) => void;
  onAction: (a: string, s?: string) => void;
}) {
  const doc = data?.document;
  const qc = useQueryClient();
  const [recordingPayment, setRecordingPayment] = useState(false);
  const payment = useMutation({
    mutationFn: billingApi.addPayment,
    onSuccess: () => {
      setRecordingPayment(false);
      void qc.invalidateQueries({ queryKey: ["billing"] });
    },
  });
  return (
    <div className="billing-modal-backdrop billing-preview-backdrop">
      <div className="billing-preview-modal" role="dialog" aria-modal="true">
        <div className="billing-preview-actions">
          <button className="billing-secondary" onClick={onClose}>
            <X size={16} /> Close
          </button>
          {doc && (
            <>
              {doc.status === "DRAFT" && (
                <button className="billing-secondary" onClick={() => onEdit(doc)}>
                  <Pencil size={16} /> Edit
                </button>
              )}
              <button className="billing-secondary" onClick={() => window.print()}>
                <Printer size={16} /> Print
              </button>
              <button
                className="billing-secondary"
                onClick={() => window.print()}
                title="Choose Save as PDF in the system print dialog"
              >
                <Download size={16} /> Download PDF
              </button>
              {kind === "invoice" && doc.status === "DRAFT" && (
                <button className="billing-primary" onClick={() => onAction("status", "SENT")}>
                  <Send size={16} /> Issue Invoice
                </button>
              )}
              {kind === "invoice" && !["DRAFT", "CANCELLED"].includes(doc.status) && (
                <button
                  className="billing-secondary billing-danger"
                  onClick={() =>
                    confirm("Cancel this issued invoice? Financial history will be preserved.") &&
                    onAction("status", "CANCELLED")
                  }
                >
                  <Ban size={16} /> Cancel
                </button>
              )}
              {kind === "quote" && doc.status === "DRAFT" && (
                <button className="billing-primary" onClick={() => onAction("status", "SENT")}>
                  <Send size={16} /> Mark Sent
                </button>
              )}
              {kind === "invoice" &&
                !["CANCELLED", "DRAFT"].includes(doc.status) &&
                (doc as BillingInvoice).balance_due > 0 && (
                  <button className="billing-primary" onClick={() => setRecordingPayment(true)}>
                    <CreditCard size={16} /> Record Payment
                  </button>
                )}
            </>
          )}
        </div>
        {loading ? (
          <div className="billing-loading">Loading document…</div>
        ) : error ? (
          <ApiError error={error} />
        ) : doc ? (
          <>
            <DocumentPreview document={doc} kind={kind} />
            {kind === "invoice" && (
              <>
              <InvoicePaymentSummary invoice={doc as BillingInvoice} />
              <section className="billing-payment-history">
                <h2>Payment History</h2>
                {(doc as BillingInvoice).payments?.length ? (
                  <div className="admin-table-scroll">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Date & Time</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Reference</th>
                          <th>Notes</th>
                          <th>Recorded By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(doc as BillingInvoice).payments!.map((payment) => (
                          <tr key={payment.id}>
                            <td>
                              {new Intl.DateTimeFormat("en-LK", {
                                dateStyle: "medium",
                                timeStyle: "short",
                                timeZone: "Asia/Colombo",
                              }).format(new Date(payment.created_at.replace(" ", "T") + "Z"))}
                            </td>
                            <td>
                              <Money value={payment.amount} currency={doc.currency} />
                            </td>
                            <td>{payment.payment_method}</td>
                            <td>{payment.reference_number || "-"}</td>
                            <td>{payment.notes || "-"}</td>
                            <td>{payment.created_by || "Administrator"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Empty label="No payments recorded" />
                )}
              </section>
              </>
            )}
          </>
        ) : null}
      </div>
      {recordingPayment && doc && kind === "invoice" && (
        <PaymentDialog
          invoice={doc as BillingInvoice}
          pending={payment.isPending}
          error={payment.error}
          onClose={() => setRecordingPayment(false)}
          onSave={(input) => payment.mutate(input)}
        />
      )}
    </div>
  );
}

function InvoicePaymentSummary({ invoice }: { invoice: BillingInvoice }) {
  const status = invoiceDisplayStatus(invoice.status);
  return (
    <section className="billing-invoice-payment-summary">
      <div><span>Status</span><StatusBadge status={status} /></div>
      <div><span>Invoice Total</span><strong><Money value={invoice.total} currency={invoice.currency} /></strong></div>
      <div><span>Amount Paid</span><strong><Money value={invoice.amount_paid} currency={invoice.currency} /></strong></div>
      <div><span>Balance Due</span><strong><Money value={invoice.balance_due} currency={invoice.currency} /></strong></div>
      <div><span>Due Date</span><strong>{invoice.due_date}</strong></div>
    </section>
  );
}

function PaymentDialog({ invoice, pending, error, onClose, onSave }: {
  invoice: BillingInvoice;
  pending: boolean;
  error: unknown;
  onClose: () => void;
  onSave: (input: Record<string, unknown>) => void;
}) {
  const [form, setForm] = useState({
    invoice_id: invoice.id,
    payment_date: new Date().toISOString().slice(0, 10),
    amount: invoice.balance_due,
    payment_method: "Bank Transfer",
    reference_number: "",
    notes: "",
  });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (form.amount > 0 && form.amount <= invoice.balance_due) onSave(form);
  };
  return (
    <div className="billing-modal-backdrop">
      <div className="billing-modal" role="dialog" aria-modal="true">
        <div className="billing-modal-head"><h2>Record Payment</h2><button onClick={onClose}><X /></button></div>
        <form onSubmit={submit} className="billing-form-grid">
          <div className="billing-inline-state billing-wide">Current balance: <strong><Money value={invoice.balance_due} currency={invoice.currency} /></strong></div>
          <Field label="Payment date" type="date" value={form.payment_date} set={(value) => setForm({ ...form, payment_date: value })} />
          <Field label="Payment amount" type="number" value={String(form.amount)} set={(value) => setForm({ ...form, amount: Number(value) })} />
          <label className="billing-field"><span>Payment method</span><select value={form.payment_method} onChange={(event) => setForm({ ...form, payment_method: event.target.value })}>{["Bank Transfer", "Cash", "Card", "Other"].map((value) => <option key={value}>{value}</option>)}</select></label>
          <Field label="Reference / transaction ID" value={form.reference_number} set={(value) => setForm({ ...form, reference_number: value })} />
          <label className="billing-field billing-wide"><span>Notes</span><textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} /></label>
          {form.amount > invoice.balance_due && <p className="billing-form-error billing-wide">Payment cannot exceed the current balance.</p>}
          {Boolean(error) && <p className="billing-form-error billing-wide">{error instanceof Error ? error.message : "Could not record payment."}</p>}
          <div className="billing-modal-actions billing-wide"><button type="button" className="billing-secondary" onClick={onClose}>Cancel</button><button className="billing-primary" disabled={pending || form.amount <= 0 || form.amount > invoice.balance_due}>{pending ? "Recording…" : "Record Payment"}</button></div>
        </form>
      </div>
    </div>
  );
}
