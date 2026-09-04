# Billing Migration 002 — Manual Guide

Do not edit or rerun migration 001. Migration 002 is backward-compatible and does not update, delete, truncate, seed, or renumber current records.

1. Back up the live `skydesigners_billing` database in phpMyAdmin.
2. Select the billing database—not the blog database.
3. Open **SQL**, paste `php-billing-api/migrations/002_billing_professional_polish.sql`, and execute once.
4. Confirm new nullable columns: `billing_clients.district`, `postal_code`; `billing_quotes.issued_at`; `billing_invoices.issued_at`.
5. Confirm new settings columns: `display_name`, `primary_color`, `accent_color`, `default_due_days`, `footer_company_text`, `footer_show_registration`.
6. Existing documents remain valid; existing `issued_at` values are intentionally NULL because their historical issue times are unknown.
7. Upload the updated PHP files only after the migration succeeds.

The script uses MySQL 8 `ADD COLUMN IF NOT EXISTS`. If the host reports an older MySQL/MariaDB version, stop and have the statements adapted—do not remove safety clauses blindly.
