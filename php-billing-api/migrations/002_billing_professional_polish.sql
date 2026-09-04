-- Backward-compatible professional billing additions. Apply manually once to the live billing DB.
ALTER TABLE billing_clients ADD COLUMN IF NOT EXISTS district VARCHAR(120) NULL AFTER city;
ALTER TABLE billing_clients ADD COLUMN IF NOT EXISTS postal_code VARCHAR(30) NULL AFTER country;
ALTER TABLE billing_quotes ADD COLUMN IF NOT EXISTS issued_at TIMESTAMP NULL AFTER status;
ALTER TABLE billing_invoices ADD COLUMN IF NOT EXISTS issued_at TIMESTAMP NULL AFTER status;
ALTER TABLE billing_settings ADD COLUMN IF NOT EXISTS display_name VARCHAR(190) NULL AFTER business_name;
ALTER TABLE billing_settings ADD COLUMN IF NOT EXISTS primary_color CHAR(7) NOT NULL DEFAULT '#081426' AFTER logo_url;
ALTER TABLE billing_settings ADD COLUMN IF NOT EXISTS accent_color CHAR(7) NOT NULL DEFAULT '#1677FF' AFTER primary_color;
ALTER TABLE billing_settings ADD COLUMN IF NOT EXISTS default_due_days SMALLINT UNSIGNED NOT NULL DEFAULT 30 AFTER default_quote_validity;
ALTER TABLE billing_settings ADD COLUMN IF NOT EXISTS footer_company_text VARCHAR(255) NULL AFTER disclaimer;
ALTER TABLE billing_settings ADD COLUMN IF NOT EXISTS footer_show_registration TINYINT(1) NOT NULL DEFAULT 0 AFTER footer_company_text;
