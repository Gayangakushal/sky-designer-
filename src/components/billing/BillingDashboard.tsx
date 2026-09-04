import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Banknote, CalendarClock, CircleDollarSign, FileCheck2, FileText, Landmark, ReceiptText } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { billingApi } from "@/lib/billing-api";
import { ApiError, Empty, Money, PageHeader, StatusBadge } from "./BillingCommon";

export default function BillingDashboard() {
  const query = useQuery({ queryKey: ["billing", "dashboard"], queryFn: billingApi.dashboard, retry: 1 });
  if (query.isLoading) return <div className="billing-loading">Loading billing overview…</div>;
  if (query.error || !query.data) return <><PageHeader title="Billing Dashboard" description="Income, invoices, quotations and payment performance." /><ApiError error={query.error} /></>;
  const d = query.data;
  const cards = [
    ["Paid Income — This Month", d.paid_this_month, CircleDollarSign, "blue"], ["Paid Income — All Time", d.paid_all_time, Banknote, "green"],
    ["Total Invoiced", d.total_invoiced, ReceiptText, "purple"], ["Outstanding", d.outstanding, CalendarClock, "amber"],
    ["Overdue", d.overdue, Landmark, "red"], ["Active Quotations", d.active_quotations, FileText, "indigo"],
  ] as const;
  return <div className="admin-overview">
    <PageHeader title="Billing Dashboard" description="Income reflects recorded payments—not unpaid invoices." />
    <section className="admin-stat-grid billing-kpis" aria-label="Billing statistics">{cards.map(([label, value, Icon, tone]) => <article className="admin-stat-card" key={label}><div className={`admin-stat-icon admin-stat-icon-${tone}`}><Icon size={21} /></div><p className="admin-stat-label">{label}</p><p className="admin-stat-value billing-money"><Money value={value as number} /></p></article>)}</section>
    <section className="admin-data-card"><div className="admin-card-header"><div><h2>Monthly Billing Overview</h2><p>Previous 12 months: invoiced, paid and outstanding.</p></div></div><div className="billing-chart" aria-label="Monthly billing chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={d.monthly}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip formatter={(v) => <Money value={Number(v)} />} /><Legend /><Bar dataKey="invoiced" fill="#1677ff" radius={[4,4,0,0]} /><Bar dataKey="paid" fill="#12b76a" radius={[4,4,0,0]} /><Bar dataKey="outstanding" fill="#f79009" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div></section>
    <div className="billing-dashboard-grid"><DashboardInvoices title="Recent Invoices" rows={d.recent_invoices} /><DashboardQuotes rows={d.recent_quotes} /></div>
    <div className="billing-dashboard-grid"><DashboardInvoices title="Outstanding Invoices" rows={d.outstanding_invoices} /><section className="admin-data-card"><div className="admin-card-header"><div><h2>Recent Payments</h2><p>Latest received funds.</p></div><a href="/admin/billing/payments" className="admin-link-button">View all <ArrowRight size={16}/></a></div>{d.recent_payments.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Invoice</th><th>Client</th><th>Date</th><th>Amount</th></tr></thead><tbody>{d.recent_payments.map(p => <tr key={p.id}><td className="admin-table-primary">{p.invoice_number}</td><td>{p.client_name}</td><td>{p.payment_date}</td><td><Money value={p.amount}/></td></tr>)}</tbody></table></div> : <Empty label="No payments recorded" />}</section></div>
  </div>;
}

function DashboardInvoices({ title, rows }: { title: string; rows: Awaited<ReturnType<typeof billingApi.invoices>>["invoices"] }) { return <section className="admin-data-card"><div className="admin-card-header"><div><h2>{title}</h2><p>Latest invoice activity.</p></div><a href="/admin/billing/invoices" className="admin-link-button">View all <ArrowRight size={16}/></a></div>{rows.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Invoice</th><th>Client</th><th>Total</th><th>Balance</th><th>Status</th></tr></thead><tbody>{rows.map(i => <tr key={i.id}><td className="admin-table-primary">{i.invoice_number}</td><td>{i.client_name}</td><td><Money value={i.total} currency={i.currency}/></td><td><Money value={i.balance_due} currency={i.currency}/></td><td><StatusBadge status={i.status}/></td></tr>)}</tbody></table></div> : <Empty />}</section>; }
function DashboardQuotes({ rows }: { rows: Awaited<ReturnType<typeof billingApi.quotes>>["quotes"] }) { return <section className="admin-data-card"><div className="admin-card-header"><div><h2>Recent Quotations</h2><p>Latest quotation activity.</p></div><a href="/admin/billing/quotations" className="admin-link-button">View all <ArrowRight size={16}/></a></div>{rows.length ? <div className="admin-table-scroll"><table className="admin-table"><thead><tr><th>Quote</th><th>Client</th><th>Total</th><th>Status</th></tr></thead><tbody>{rows.map(q => <tr key={q.id}><td className="admin-table-primary">{q.quote_number}</td><td>{q.client_name}</td><td><Money value={q.total} currency={q.currency}/></td><td><StatusBadge status={q.status}/></td></tr>)}</tbody></table></div> : <Empty />}</section>; }
