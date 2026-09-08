export type Currency = "LKR" | "USD" | "EUR" | "GBP" | string;
export type QuoteStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "CONVERTED";
export type InvoiceStatus = "DRAFT" | "SENT" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "CANCELLED";

export interface BillingClient {
  id: number;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  phone_secondary: string | null;
  billing_address: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  tax_identifier: string | null;
  district?: string | null;
  postal_code?: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  total_invoiced?: number;
  total_paid?: number;
  outstanding?: number;
}

export interface LineItem {
  id?: number;
  service_title: string;
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  sort_order: number;
}

export interface DocumentSnapshot {
  business_name: string;
  logo_url: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  registration_number?: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  payment_instructions?: string;
  display_name?: string;
  primary_color?: string;
  accent_color?: string;
  footer_company_text?: string;
  footer_show_registration?: boolean;
  disclaimer?: string;
}

export interface BillingQuote {
  id: number;
  quote_number: string;
  client_id: number;
  client_name: string;
  subject: string;
  quote_date: string;
  valid_until: string | null;
  currency: Currency;
  status: QuoteStatus;
  notes: string | null;
  terms: string | null;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  items?: LineItem[];
  client_snapshot?: Record<string, string | number | boolean | null>;
  company_snapshot?: DocumentSnapshot;
  created_at: string;
  updated_at: string;
  issued_at?: string | null;
}

export interface BillingInvoice {
  id: number;
  invoice_number: string;
  client_id: number;
  client_name: string;
  subject: string | null;
  invoice_date: string;
  due_date: string;
  payment_terms: string | null;
  currency: Currency;
  status: InvoiceStatus;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amount_paid: number;
  balance_due: number;
  notes: string | null;
  terms: string | null;
  source_quote_id: number | null;
  items?: LineItem[];
  payments?: BillingPayment[];
  client_snapshot?: Record<string, string | number | boolean | null>;
  company_snapshot?: DocumentSnapshot;
  created_at: string;
  updated_at: string;
  issued_at?: string | null;
}

export interface BillingPayment {
  id: number;
  invoice_id: number;
  invoice_number: string;
  client_id: number;
  client_name: string;
  payment_date: string;
  amount: number;
  payment_method: "Bank Transfer" | "Cash" | "Card" | "Other";
  reference_number: string | null;
  notes: string | null;
  reversed_at: string | null;
  created_at: string;
  created_by?: string;
}

export interface BillingSettings extends DocumentSnapshot {
  id: number;
  country: string;
  quotation_prefix: string;
  quotation_next_number: number;
  invoice_prefix: string;
  invoice_next_number: number;
  default_currency: Currency;
  default_invoice_terms: string;
  default_quote_validity: number;
  quotation_footer_message: string;
  invoice_footer_message: string;
  default_quotation_terms: string;
  disclaimer: string;
  default_invoice_conditions: string;
  display_name?: string;
  primary_color?: string;
  accent_color?: string;
  default_due_days?: number;
  footer_company_text?: string;
  footer_show_registration?: boolean;
}

export interface MonthlyBilling {
  month: string;
  invoiced: number;
  paid: number;
  outstanding: number;
}
export interface BillingDashboardData {
  paid_this_month: number;
  paid_all_time: number;
  total_invoiced: number;
  outstanding: number;
  overdue: number;
  active_quotations: number;
  invoiced_this_month: number;
  quotation_value: number;
  invoice_count: number;
  paid_invoice_count: number;
  overdue_invoice_count: number;
  monthly: MonthlyBilling[];
  recent_invoices: BillingInvoice[];
  recent_quotes: BillingQuote[];
  outstanding_invoices: BillingInvoice[];
  recent_payments: BillingPayment[];
}
