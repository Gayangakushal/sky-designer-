# Manual PEEK Billing Deployment

Nothing in this repository automatically changes PEEK Hosting, DNS, Supabase, GitHub, or Netlify.

## Before deployment

Confirm the current Sky Designers business name, address, registration number, logo URL, website, email, phone, bank details, default terms, quotation counter, invoice counter, and approved production origins. The migration seeds only the business name and recommended next counters (`QT-000208`, `INV-000542`); it contains no bank credentials.

## MySQL

1. In PEEK/cPanel, create a separate database named `skydesigners_billing` (the host may prefix the name).
2. Create a least-privilege database user and grant it rights only to that database.
3. For a new database, manually run `php-billing-api/migrations/001_create_billing_schema.sql`, then migrations 002 and 003 in numeric order. For an existing database, run only the migrations not previously applied.
4. Do not import the fixture file into production.

### Existing database: migration 003

1. Export a backup of the live billing database from phpMyAdmin.
2. In phpMyAdmin, select the dedicated `skydesigners_billing` database. Do not select the blog or Supabase database.
3. Confirm migration 002 has already been applied by checking for `billing_clients.district` and `billing_clients.postal_code`. If either is missing, apply `php-billing-api/migrations/002_billing_professional_polish.sql` first.
4. Open the **SQL** tab, paste the complete contents of `php-billing-api/migrations/003_add_secondary_client_phone.sql`, and run it once.
5. In the `billing_clients` structure, confirm `phone_secondary` is `VARCHAR(100)`, nullable, and has no unique index. Confirm `country` is nullable with the existing `Sri Lanka` default.
6. Spot-check existing client rows and confirm their original `phone` values are unchanged.
7. Only after the migration succeeds, replace the PHP files listed below.

Migration 003 is backward-compatible: it adds one nullable column, relaxes the optional country constraint, and does not update or delete rows. Its `ADD COLUMN IF NOT EXISTS` clause is idempotent on MySQL 8. If the host uses an older MySQL/MariaDB release that rejects this syntax, stop and adapt the statement only after inspecting the schema.

## PHP API

1. Upload the contents of `php-billing-api/` under the web root mapped to `https://api.skydesigners.lk/billing`.
2. Copy `config.example.php` to `config.php` on the server.
3. Put the dedicated MySQL DSN/user/password, Supabase project URL and anon/publishable key in `config.php`.
4. Keep `config.php` outside public download access where the hosting layout permits; otherwise deny direct HTTP access to it.
5. Confirm PHP 8.1+, PDO MySQL, cURL, mbstring, JSON, HTTPS, and MySQL 8/InnoDB are enabled.
6. Restrict `allowed_origins` to the real Sky Designers production origins. Localhost is accepted by code only for local development.
7. Verify an unauthenticated endpoint request returns 401 and a logged-in non-admin returns 403.

### PEEK files to replace for this change

- `php-billing-api/admin/_actions.php`
- `php-billing-api/admin/_bootstrap.php` if the pending billing-role access update has not already been uploaded

The small `clients/create.php` and `clients/update.php` endpoint wrappers are unchanged and do not need replacement. Do not upload the repository ZIP blindly; upload the reviewed files above after migration 003.

## Netlify (manual later)

Add this environment variable only when the API is ready:

`VITE_BILLING_API_URL=https://api.skydesigners.lk/billing`

Then trigger the normal reviewed deployment workflow. Do not put database credentials, Supabase secret/service keys, or bank details in Netlify client variables.

A Netlify redeploy is required for the React form, search display, TypeScript model, and invoice/quotation preview changes to reach production. This repository change does not trigger that redeploy automatically.

## Acceptance checks

Create a client using name + primary phone only, then create and preview both a quotation and invoice for that client. Also test a secondary phone, optional valid email, missing name, missing/invalid primary phone, empty secondary phone, Galle-to-Southern Province mapping, both-phone search, existing client edits, old issued-document rendering, quote allocation/conversion, invoice allocation, payment calculations/reversal, A4 print/PDF, mobile layouts, and audit entries. Remove test records before operational use.
