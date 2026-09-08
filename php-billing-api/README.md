# Sky Designers Billing API

PHP 8.1/MySQL 8 API for the separate Sky Designers billing database. Every endpoint loads the same bootstrap, verifies the Supabase bearer token and an authorized billing role, and uses prepared PDO statements.

Deploy manually only after following `docs/billing-peek-deployment.md`. Copy `config.example.php` to an untracked `config.php`; never commit secrets. For an existing installation, apply unapplied migrations in numeric order; never edit or rerun migration 001.

Client creation requires only a trimmed business/client name and a valid primary phone. Secondary phone, contact, email, address, city, district, province, country, postal code, tax identifier, and notes are optional. Apply `migrations/003_add_secondary_client_phone.sql` before uploading the PHP action dispatcher that reads and writes `phone_secondary`.

The endpoint folders match the frontend client: dashboard, clients, quotes, invoices, payments, and settings. There are no public billing endpoints.
