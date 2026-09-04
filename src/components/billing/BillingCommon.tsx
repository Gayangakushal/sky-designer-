import type { ReactNode } from "react";
import { AlertCircle, Inbox } from "lucide-react";
import { money } from "@/lib/billing-calculations";

export const StatusBadge = ({ status }: { status: string }) => {
  const tone = ["PAID", "ACCEPTED"].includes(status)
    ? "green"
    : ["OVERDUE", "REJECTED", "CANCELLED"].includes(status)
      ? "red"
      : ["SENT", "UNPAID", "CONVERTED"].includes(status)
        ? "blue"
        : ["PARTIALLY_PAID", "EXPIRED"].includes(status)
          ? "amber"
          : "gray";
  const label = status === "SENT" ? "Issued" : status.replaceAll("_", " ");
  return (
    <span className={`admin-badge admin-badge-${tone}`} aria-label={`Status: ${label}`}>
      {label}
    </span>
  );
};
export const PageHeader = ({
  eyebrow = "Billing",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <header className="admin-page-header">
    <div>
      <p className="admin-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    {action}
  </header>
);
export const Empty = ({ label = "No records found" }: { label?: string }) => (
  <div className="admin-empty-state">
    <span>
      <Inbox size={24} />
    </span>
    <h3>{label}</h3>
    <p>Records will appear here after they are created.</p>
  </div>
);
export const ApiError = ({ error }: { error: unknown }) => (
  <div className="billing-alert" role="alert">
    <AlertCircle size={20} />
    <div>
      <strong>Billing service unavailable</strong>
      <p>
        {error instanceof Error ? error.message : "Could not load billing data."} Check the API URL
        and deploy the prepared PHP package when ready.
      </p>
    </div>
  </div>
);
export const Money = ({
  value,
  currency = "LKR",
}: {
  value: number | string;
  currency?: string;
}) => <>{money(value, currency)}</>;
