# Billing Migration 003 — Client Required Fields and Two Phones

This migration supports the simplified client profile. Client/business name and primary phone are the only required values enforced by the frontend and PHP API. Secondary phone, contact person, email, address, city, district, province, country, postal code, tax/business identifier, and notes are optional.

## What changes

- Adds nullable `billing_clients.phone_secondary VARCHAR(100)` after the existing `phone` column.
- Changes `billing_clients.country` from `NOT NULL` to nullable while retaining its `Sri Lanka` default.
- Does not change existing `phone` values, add uniqueness constraints, update rows, delete data, or alter document tables.
- New quote and invoice snapshots automatically include `phone_secondary` because the API snapshots the selected client row. Existing snapshot JSON without that key remains valid and unchanged.

## Manual phpMyAdmin deployment

1. Back up the live `skydesigners_billing` database.
2. Select that billing database in phpMyAdmin.
3. Verify migration 002 is present (`billing_clients.district` and `postal_code` exist). Apply migration 002 first if needed.
4. Open **SQL** and run the complete `php-billing-api/migrations/003_add_secondary_client_phone.sql` file once.
5. Confirm `phone_secondary` is nullable `VARCHAR(100)` with no unique index.
6. Confirm `country` is nullable and its default remains `Sri Lanka`.
7. Confirm a sample of existing rows retained the same primary `phone` values.
8. Upload the reviewed `php-billing-api/admin/_actions.php` file to PEEK. Also upload `_bootstrap.php` only if its already-pending billing-role change has not been deployed.
9. Smoke-test create/update, both-phone search, minimal invoice/quotation creation, issuance, and historical document previews.

The frontend production bundle must be rebuilt and redeployed to Netlify separately. No database migration, PEEK upload, Git push, or deployment is performed automatically by this repository change.

## Files changed

Frontend:

- `src/components/billing/ClientsPage.tsx`
- `src/components/billing/DocumentPreview.tsx`
- `src/types/billing.ts`

PHP/API and schema:

- `php-billing-api/admin/_actions.php`
- `php-billing-api/migrations/003_add_secondary_client_phone.sql`

Documentation:

- `php-billing-api/README.md`
- `docs/billing-system-architecture.md`
- `docs/billing-peek-deployment.md`
- `docs/billing-migration-003-guide.md`
