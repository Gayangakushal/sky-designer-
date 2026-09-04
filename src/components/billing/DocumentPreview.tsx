import type { CSSProperties } from "react";
import { resolveBillingAssetUrl } from "@/lib/billing-assets";
import { money } from "@/lib/billing-calculations";
import type { BillingInvoice, BillingQuote, DocumentSnapshot } from "@/types/billing";

type Doc = BillingQuote | BillingInvoice;
const fallback: DocumentSnapshot = {
  business_name: "Sky Designers",
  logo_url: "",
  website: "",
  email: "",
  phone: "",
  address: "",
  bank_name: "",
  account_name: "",
  account_number: "",
  branch: "",
};
const formatColombo = (value?: string | null) => {
  if (!value) return null;
  const parsed = new Date(value.replace(" ", "T") + (value.includes("Z") ? "" : "Z"));
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-LK", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Colombo",
  }).format(parsed);
};
const formatDate = (value?: string | null) => {
  if (!value) return null;
  const parsed = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Colombo",
  }).format(parsed);
};

const formatDateTime = (value?: string | null) => {
  if (!value) return null;
  const parsed = new Date(value.replace(" ", "T") + (value.includes("Z") ? "" : "Z"));
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-LK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Colombo",
  }).format(parsed);
};

const displayMoney = (value: number | string, currency: string) =>
  money(value, currency).replace(/\u00a0/g, " ");

const populatedClientLines = (client: Record<string, string>, document: Doc) =>
  [
    client.contact_person,
    client.billing_address,
    client.city,
    client.district,
    client.province,
    client.country,
    client.postal_code,
    client.email,
    client.phone,
  ].filter(Boolean).map(String).filter((value) => value !== String(client.name || document.client_name));

function MetaRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="billing-document-meta-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function DocumentPreview({
  document,
  kind,
}: {
  document: Doc;
  kind: "quote" | "invoice";
}) {
  const company = document.company_snapshot || fallback;
  const invoice = kind === "invoice" ? (document as BillingInvoice) : null;
  const quote = kind === "quote" ? (document as BillingQuote) : null;
  const client = document.client_snapshot || { name: document.client_name };
  const logoUrl = resolveBillingAssetUrl(company.logo_url);
  const primary = company.primary_color || "#0b3577";
  const accent = company.accent_color || "#2c83d5";
  const message = document.notes || (kind === "quote" ? "Looking forward to collaborating with you." : "Thanks for your business.");
  const terms = document.terms || company.disclaimer;
  const amountPaid = invoice?.amount_paid || 0;
  const invoiceStatus = invoice?.status === "SENT" ? "UNPAID" : invoice?.status.replace("_", " ");
  const clientName = String(client.name || document.client_name);
  const metadata = kind === "quote" ? (
    <>
      <MetaRow label="Quote No." value={quote?.quote_number} />
      <MetaRow label="Quote Date" value={formatDate(quote?.quote_date)} />
      <MetaRow label="Issued At" value={formatDateTime(document.issued_at)} />
      <MetaRow label="Valid Until" value={formatDate(quote?.valid_until)} />
    </>
  ) : (
    <>
      <MetaRow label="Invoice#" value={invoice?.invoice_number} />
      <MetaRow label="Invoice Date" value={formatDate(invoice?.invoice_date)} />
      <MetaRow label="Issued At" value={formatDateTime(document.issued_at)} />
      <MetaRow label="Terms" value={invoice?.payment_terms} />
      <MetaRow label="Due Date" value={formatDate(invoice?.due_date)} />
    </>
  );
  const documentStyle = {
    "--document-primary": primary,
    "--document-accent": accent,
  } as CSSProperties;

  return (
    <article
      className="billing-document"
      style={documentStyle}
      aria-label={`${kind === "quote" ? "Quotation" : "Invoice"} preview`}
    >
      <header className="billing-document-header">
        <div className="billing-document-brand">
          {logoUrl ? (
            <span className="billing-document-logo-frame">
              <img src={logoUrl} alt={`${company.business_name} logo`} />
            </span>
          ) : (
            <span className="billing-document-wordmark">Sky Designers</span>
          )}
        </div>
        <div className="billing-document-title">
          <h1>{kind === "quote" ? "QUOTATION" : "INVOICE"}</h1>
          <p>{kind === "quote" ? quote?.quote_number : invoice?.invoice_number}</p>
          {document.subject && <span>{document.subject}</span>}
        </div>
        <div className="billing-document-company">
          <strong>{company.display_name || company.business_name}</strong>
          {company.address && <span>{company.address}</span>}
          {company.phone && <span>{company.phone}</span>}
          {company.email && <span>{company.email}</span>}
          {company.website && <span>{company.website}</span>}
          {company.footer_show_registration && company.registration_number && (
            <span>{company.registration_number}</span>
          )}
        </div>
      </header>

      <div className="billing-document-highlight">
        <span>{kind === "quote" ? "TOTAL" : "BALANCE DUE"}</span>
        <strong>{displayMoney(kind === "quote" ? document.total : invoice?.balance_due || 0, document.currency)}</strong>
      </div>

      <section className="billing-document-meta-block">
        <div className="billing-document-client">
          <span className="billing-document-eyebrow">BILL TO</span>
          <h2>{clientName}</h2>
          {populatedClientLines(client, document).map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
        </div>
        <dl className="billing-document-meta-list">
          {metadata}
          {invoiceStatus && <div className="billing-document-status">{invoiceStatus}</div>}
        </dl>
      </section>

      <table className="billing-document-items">
        <thead>
          <tr>
            <th className="item-number">#</th>
            <th>SERVICE &amp; DESCRIPTION</th>
            <th>QTY</th>
            <th>RATE</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {document.items?.map((item, index) => (
            <tr key={item.id || index}>
              <td className="item-number">{index + 1}</td>
              <td className="item-description">
                <strong>{item.service_title}</strong>
                {item.description && <span>{item.description}</span>}
                <small>{Number(item.quantity).toLocaleString("en-LK", { maximumFractionDigits: 2 })} × {displayMoney(item.unit_price, document.currency)}</small>
              </td>
              <td>{Number(item.quantity).toLocaleString("en-LK", { maximumFractionDigits: 2 })}</td>
              <td>{displayMoney(item.unit_price, document.currency)}</td>
              <td className="item-amount">{displayMoney(item.line_total, document.currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="billing-document-totals-panel">
        <p className="billing-document-message">{message}</p>
        <dl className="billing-document-totals">
          <MetaRow label="Subtotal" value={displayMoney(document.subtotal, document.currency)} />
          {document.discount > 0 && <MetaRow label="Discount" value={`- ${displayMoney(document.discount, document.currency)}`} />}
          {document.tax > 0 && <MetaRow label="Tax" value={displayMoney(document.tax, document.currency)} />}
          <MetaRow label="Total" value={displayMoney(document.total, document.currency)} />
          {invoice && amountPaid > 0 && <MetaRow label="Payment Made (-)" value={`- ${displayMoney(amountPaid, document.currency)}`} />}
          {invoice && <div className="billing-document-balance"><dt>Balance Due</dt><dd>{displayMoney(invoice.balance_due, document.currency)}</dd></div>}
        </dl>
      </section>

      {(company.bank_name || company.account_name || company.account_number || company.branch || company.payment_instructions) && (
        <section className="billing-document-bank">
          <h3>Payment Details</h3>
          <p>{[company.bank_name, company.account_number].filter(Boolean).join(" - ")}</p>
          <p>{[company.account_name, company.branch].filter(Boolean).join(" - ")}</p>
          {company.payment_instructions && <p>{company.payment_instructions}</p>}
        </section>
      )}

      {terms && (
        <section className="billing-document-terms">
          <h3>Terms &amp; Conditions</h3>
          <p>{terms}</p>
        </section>
      )}

      <footer className="billing-document-footer">
        <span>{company.footer_company_text || company.business_name}</span>
        <span>{[company.website, company.email, company.phone].filter(Boolean).join(" · ")}</span>
        <span className="billing-page-number">Page 1 of 1</span>
      </footer>
    </article>
  );
}
