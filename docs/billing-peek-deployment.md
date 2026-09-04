# Manual PEEK Billing Deployment

Nothing in this repository automatically changes PEEK Hosting, DNS, Supabase, GitHub, or Netlify.

## Before deployment

Confirm the current Sky Designers business name, address, registration number, logo URL, website, email, phone, bank details, default terms, quotation counter, invoice counter, and approved production origins. The migration seeds only the business name and recommended next counters (`QT-000208`, `INV-000542`); it contains no bank credentials.

## MySQL

1. In PEEK/cPanel, create a separate database named `skydesigners_billing` (the host may prefix the name).
2. Create a least-privilege database user and grant it rights only to that database.
3. Select that database and manually run `php-billing-api/migrations/001_create_billing_schema.sql` once.
4. Do not import the fixture file into production.

## PHP API

1. Upload the contents of `php-billing-api/` under the web root mapped to `https://api.skydesigners.lk/billing`.
2. Copy `config.example.php` to `config.php` on the server.
3. Put the dedicated MySQL DSN/user/password, Supabase project URL and anon/publishable key in `config.php`.
4. Keep `config.php` outside public download access where the hosting layout permits; otherwise deny direct HTTP access to it.
5. Confirm PHP 8.1+, PDO MySQL, cURL, mbstring, JSON, HTTPS, and MySQL 8/InnoDB are enabled.
6. Restrict `allowed_origins` to the real Sky Designers production origins. Localhost is accepted by code only for local development.
7. Verify an unauthenticated endpoint request returns 401 and a logged-in non-admin returns 403.

## Netlify (manual later)

Add this environment variable only when the API is ready:

`VITE_BILLING_API_URL=https://api.skydesigners.lk/billing`

Then trigger the normal reviewed deployment workflow. Do not put database credentials, Supabase secret/service keys, or bank details in Netlify client variables.

## Acceptance checks

Create test-only client data, then verify quote allocation, quote conversion, invoice allocation, partial/full/overdue calculations, payment reversal, historical snapshots, A4 print/PDF, mobile layouts, and audit entries. Remove test records before operational use.

