import BillingShell from "@/components/billing/BillingShell";
import BillingDashboard from "@/components/billing/BillingDashboard";
import ClientsPage from "@/components/billing/ClientsPage";
import DocumentsPage from "@/components/billing/DocumentsPage";
import PaymentsPage from "@/components/billing/PaymentsPage";
import BillingSettingsPage from "@/components/billing/BillingSettingsPage";

export default function AdminBilling({ section = "dashboard" }: { section?: string }) {
  const content = section === "quotations" ? <DocumentsPage kind="quote"/> : section === "invoices" ? <DocumentsPage kind="invoice"/> : section === "clients" ? <ClientsPage/> : section === "payments" ? <PaymentsPage/> : section === "settings" ? <BillingSettingsPage/> : <BillingDashboard/>;
  return <BillingShell>{content}</BillingShell>;
}
