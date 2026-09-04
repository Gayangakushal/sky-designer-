# Sky Designers Billing API

Admin-only PHP 8.1/MySQL 8 API for the separate Sky Designers billing database. Every endpoint loads the same bootstrap, verifies the Supabase bearer token and `has_role(..., 'admin')`, and uses prepared PDO statements.

Deploy manually only after following `docs/billing-peek-deployment.md`. Copy `config.example.php` to an untracked `config.php`; never commit secrets. Apply `migrations/001_create_billing_schema.sql` only to the dedicated billing database.

The endpoint folders match the frontend client: dashboard, clients, quotes, invoices, payments, and settings. There are no public billing endpoints.

