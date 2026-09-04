# Sky Designers Billing System Architecture

## Boundaries

Billing is an admin-only module inside the existing TanStack/React admin. It uses the existing Supabase login and `has_role(user_id, 'admin')` authorization. Financial data is isolated in the dedicated `skydesigners_billing` MySQL database and does not read or modify blog tables.

## Request flow

1. The browser obtains the existing Supabase access token.
2. `src/lib/billing-api.ts` sends it as a bearer token to `VITE_BILLING_API_URL/admin/...`.
3. Every PHP endpoint applies the origin allowlist, validates the Supabase user, then calls the existing `has_role()` RPC with that same user/token.
4. Only after administrator authorization does the endpoint use the private MySQL credentials from untracked `config.php`.

## Accounting model

- Income is the sum of non-reversed `billing_payments`, never invoice totals.
- Paid and balance values are derived from payment rows.
- Cancelled invoices are excluded from invoiced/outstanding totals.
- Overdue means an unpaid balance with `due_date` before today.
- Payment reversal retains the original row and records who reversed it, when, and why.
- Monetary columns use `DECIMAL(14,2)`; quantity uses `DECIMAL(12,3)`.

## Numbering and integrity

Quote and invoice numbers are allocated by locking the singleton settings row with `SELECT ... FOR UPDATE` inside the same transaction that creates the document. The counter is incremented before commit. Unique database indexes provide a second guard. Numbers are never generated with `MAX()+1` and the settings API refuses to reduce counters.

Creating, duplicating, converting, and updating documents and recording/reversing payments use transactions. Converting a quote locks it, creates a new invoice and items, links `source_quote_id`, and retains the original quote as `CONVERTED`.

## Historical PDFs

Each financial document stores JSON snapshots of company, client, and payment details plus immutable line-item rows. Changing a client or billing setting therefore does not change the old document. The React A4 document uses semantic text, print CSS, repeatable table headers, page-break safeguards, and the browser print pipeline for selectable-text PDF output without a screenshot or a heavy PDF runtime.

## Frontend routes

- `/admin/billing`
- `/admin/billing/quotations`
- `/admin/billing/invoices`
- `/admin/billing/clients`
- `/admin/billing/payments`
- `/admin/billing/settings`

All render through `BillingShell`, which checks the existing `useAdminAuth` guard. This client guard is supplementary; the PHP API independently enforces admin authorization.

