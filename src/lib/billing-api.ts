import { supabase } from "@/integrations/supabase/client";
import type { BillingClient, BillingDashboardData, BillingInvoice, BillingPayment, BillingQuote, BillingSettings } from "@/types/billing";

const API_URL = (import.meta.env.VITE_BILLING_API_URL || "https://api.skydesigners.lk/billing").replace(/\/$/, "");
type Json = Record<string, unknown>;

export class BillingApiError extends Error { constructor(message: string, public status = 500) { super(message); } }

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) throw new BillingApiError("Your admin session has expired.", 401);
  const response = await fetch(`${API_URL}/admin/${path}`, {
    ...init,
    headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}`, ...init?.headers },
  });
  let payload: Json;
  try { payload = await response.json() as Json; } catch { throw new BillingApiError("Billing service returned an invalid response.", 502); }
  if (!response.ok || payload.success === false) throw new BillingApiError(String(payload.message || "Billing request failed."), response.status);
  return payload as T;
}

export const billingApi = {
  dashboard: () => request<BillingDashboardData & { success: true }>("dashboard.php"),
  clients: (query = "") => request<{ clients: BillingClient[] }>(`clients/list.php?search=${encodeURIComponent(query)}`),
  client: (id: number) => request<{ client: BillingClient; quotes: BillingQuote[]; invoices: BillingInvoice[]; payments: BillingPayment[] }>(`clients/get.php?id=${id}`),
  saveClient: (input: Partial<BillingClient>) => request<{ client: BillingClient }>(input.id ? "clients/update.php" : "clients/create.php", { method: input.id ? "PATCH" : "POST", body: JSON.stringify(input) }),
  archiveClient: (id: number) => request("clients/archive.php", { method: "POST", body: JSON.stringify({ id }) }),
  quotes: (params = "") => request<{ quotes: BillingQuote[] }>(`quotes/list.php?${params}`),
  quote: (id: number) => request<{ quote: BillingQuote; activity: Json[] }>(`quotes/get.php?id=${id}`),
  saveQuote: (input: Json) => request<{ quote: BillingQuote }>(input.id ? "quotes/update.php" : "quotes/create.php", { method: input.id ? "PATCH" : "POST", body: JSON.stringify(input) }),
  quoteAction: (action: "status" | "duplicate" | "convert", input: Json) => request<{ quote?: BillingQuote; invoice?: BillingInvoice }>(`quotes/${action}.php`, { method: "POST", body: JSON.stringify(input) }),
  invoices: (params = "") => request<{ invoices: BillingInvoice[] }>(`invoices/list.php?${params}`),
  invoice: (id: number) => request<{ invoice: BillingInvoice; activity: Json[] }>(`invoices/get.php?id=${id}`),
  saveInvoice: (input: Json) => request<{ invoice: BillingInvoice }>(input.id ? "invoices/update.php" : "invoices/create.php", { method: input.id ? "PATCH" : "POST", body: JSON.stringify(input) }),
  invoiceStatus: (id: number, status: string) => request("invoices/status.php", { method: "POST", body: JSON.stringify({ id, status }) }),
  payments: (params = "") => request<{ payments: BillingPayment[] }>(`payments/list.php?${params}`),
  addPayment: (input: Json) => request<{ payment: BillingPayment }>("payments/create.php", { method: "POST", body: JSON.stringify(input) }),
  reversePayment: (id: number, reason: string) => request("payments/reverse.php", { method: "POST", body: JSON.stringify({ id, reason }) }),
  settings: () => request<{ settings: BillingSettings }>("settings/get.php"),
  saveSettings: (settings: Partial<BillingSettings>) => request<{ settings: BillingSettings }>("settings/update.php", { method: "PATCH", body: JSON.stringify(settings) }),
};
