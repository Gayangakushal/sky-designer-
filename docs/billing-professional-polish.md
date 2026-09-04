# Billing Professional Polish
## Invoice crash fix

The create/editor path rendered currency values before all API/settings data was guaranteed to be complete. `Intl.NumberFormat` throws a synchronous `RangeError` for an empty or invalid ISO currency, bypassing React Query and reaching the global route error boundary. `normalizeCurrency()` now validates the value and safely falls back to LKR. The editor also renders local loading, retry, expired-session/API messages and an explicit “Create a client first” state.

## Workflow and safety

- New invoices: **Save as Draft** or **Issue Invoice** (`SENT`, displayed as Issued).
- New quotations: **Save as Draft** or **Save & Mark Sent**.
- Issue/sent actions set `issued_at` in UTC and refresh company/client/payment snapshots at the issue boundary.
- Admin display converts issue time to `Asia/Colombo`.
- Payments are rejected for Draft and Cancelled invoices. Existing legacy payment rows are retained.
- Only unconverted Draft quotations and Draft invoices with no payment rows may be hard-deleted after confirmation.
- Issued financial records are cancelled instead and remain auditable.

## Sri Lanka locations

The client form includes all 25 districts and their official 9-province mapping. Selecting Galle produces Southern Province; Colombo and Gampaha produce Western Province; Kandy produces Central Province; Jaffna produces Northern Province. Exact district text entered as City fills District only when District is empty.

## Documents

The A4 preview and print layout use the stored logo, navy/accent settings, structured client metadata, issue time, multiline items, compact totals, conditional notes/bank/terms, and branded footer. Print rules force exact background/color reproduction. “Download PDF” opens the native print-to-PDF path so text remains selectable and no screenshot rasterization is used.

Browser print engines do not reliably expose total page count to CSS. The footer starts at Page 1 (never Page 0); multi-page pagination must be checked in the target production browser during release acceptance.
