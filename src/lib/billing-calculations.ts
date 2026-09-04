import type { InvoiceStatus, LineItem } from "@/types/billing";

export const money = (value: number | string, currency = "LKR") =>
  new Intl.NumberFormat("en-LK", { style: "currency", currency, minimumFractionDigits: 2 }).format(Number(value) || 0);

export function calculateTotals(items: LineItem[], discount = 0, tax = 0) {
  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0), 0);
  const total = Math.max(0, subtotal - (Number(discount) || 0) + (Number(tax) || 0));
  return { subtotal, total };
}

export function invoiceState(total: number, payments: number, dueDate: string, current: InvoiceStatus): InvoiceStatus {
  if (current === "CANCELLED" || current === "DRAFT") return current;
  const balance = Math.max(0, total - payments);
  if (balance <= 0) return "PAID";
  if (new Date(`${dueDate}T23:59:59`) < new Date()) return "OVERDUE";
  return payments > 0 ? "PARTIALLY_PAID" : "SENT";
}

