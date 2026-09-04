-- Run only against the dedicated skydesigners_billing MySQL 8 database.
SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE billing_settings (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY DEFAULT 1,
  business_name VARCHAR(190) NOT NULL, logo_url VARCHAR(2048) NULL, website VARCHAR(255) NULL,
  email VARCHAR(255) NULL, phone VARCHAR(100) NULL, address TEXT NULL, country VARCHAR(100) NOT NULL DEFAULT 'Sri Lanka',
  registration_number VARCHAR(190) NULL, quotation_prefix VARCHAR(20) NOT NULL DEFAULT 'QT-',
  quotation_next_number BIGINT UNSIGNED NOT NULL DEFAULT 1, invoice_prefix VARCHAR(20) NOT NULL DEFAULT 'INV-',
  invoice_next_number BIGINT UNSIGNED NOT NULL DEFAULT 1, default_currency CHAR(3) NOT NULL DEFAULT 'LKR',
  default_invoice_terms VARCHAR(190) NULL, default_quote_validity SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  quotation_footer_message TEXT NULL, invoice_footer_message TEXT NULL, bank_name VARCHAR(190) NULL,
  account_name VARCHAR(190) NULL, account_number VARCHAR(190) NULL, branch VARCHAR(190) NULL,
  payment_instructions TEXT NULL, default_quotation_terms TEXT NULL, default_invoice_conditions TEXT NULL,
  disclaimer TEXT NULL, updated_by VARCHAR(64) NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT billing_settings_singleton CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO billing_settings (id,business_name,quotation_next_number,invoice_next_number)
VALUES (1,'Sky Designers',208,542);

CREATE TABLE billing_clients (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(190) NOT NULL,
  contact_person VARCHAR(190) NULL, email VARCHAR(255) NULL, phone VARCHAR(100) NULL,
  billing_address TEXT NULL, city VARCHAR(120) NULL, province VARCHAR(120) NULL,
  country VARCHAR(120) NOT NULL DEFAULT 'Sri Lanka', tax_identifier VARCHAR(190) NULL, notes TEXT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1, created_by VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_clients_name (name), INDEX idx_clients_email (email), INDEX idx_clients_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE billing_quotes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, quote_number VARCHAR(64) NOT NULL,
  client_id BIGINT UNSIGNED NOT NULL, subject VARCHAR(255) NOT NULL, quote_date DATE NOT NULL,
  valid_until DATE NULL, currency CHAR(3) NOT NULL, status ENUM('DRAFT','SENT','ACCEPTED','REJECTED','EXPIRED','CONVERTED') NOT NULL DEFAULT 'DRAFT',
  notes TEXT NULL, terms TEXT NULL, subtotal DECIMAL(14,2) NOT NULL DEFAULT 0, discount DECIMAL(14,2) NOT NULL DEFAULT 0,
  tax DECIMAL(14,2) NOT NULL DEFAULT 0, total DECIMAL(14,2) NOT NULL DEFAULT 0,
  company_snapshot JSON NOT NULL, client_snapshot JSON NOT NULL, payment_snapshot JSON NOT NULL,
  archived_at TIMESTAMP NULL, created_by VARCHAR(64) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_quote_number (quote_number), INDEX idx_quotes_client (client_id), INDEX idx_quotes_date_status (quote_date,status),
  CONSTRAINT fk_quotes_client FOREIGN KEY (client_id) REFERENCES billing_clients(id) ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE billing_quote_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, quote_id BIGINT UNSIGNED NOT NULL,
  service_title VARCHAR(255) NOT NULL, description TEXT NULL, quantity DECIMAL(12,3) NOT NULL,
  unit_price DECIMAL(14,2) NOT NULL, line_total DECIMAL(14,2) NOT NULL, sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX idx_quote_items (quote_id,sort_order), CONSTRAINT fk_quote_items_quote FOREIGN KEY (quote_id) REFERENCES billing_quotes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE billing_invoices (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, invoice_number VARCHAR(64) NOT NULL,
  client_id BIGINT UNSIGNED NOT NULL, subject VARCHAR(255) NULL, invoice_date DATE NOT NULL, due_date DATE NOT NULL,
  payment_terms VARCHAR(190) NULL, currency CHAR(3) NOT NULL,
  status ENUM('DRAFT','SENT','PARTIALLY_PAID','PAID','OVERDUE','CANCELLED') NOT NULL DEFAULT 'DRAFT',
  subtotal DECIMAL(14,2) NOT NULL DEFAULT 0, discount DECIMAL(14,2) NOT NULL DEFAULT 0,
  tax DECIMAL(14,2) NOT NULL DEFAULT 0, total DECIMAL(14,2) NOT NULL DEFAULT 0,
  notes TEXT NULL, terms TEXT NULL, company_snapshot JSON NOT NULL, client_snapshot JSON NOT NULL, payment_snapshot JSON NOT NULL,
  source_quote_id BIGINT UNSIGNED NULL, archived_at TIMESTAMP NULL, created_by VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_invoice_number (invoice_number), INDEX idx_invoices_client (client_id), INDEX idx_invoices_dates_status (invoice_date,due_date,status),
  CONSTRAINT fk_invoices_client FOREIGN KEY (client_id) REFERENCES billing_clients(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
  CONSTRAINT fk_invoices_quote FOREIGN KEY (source_quote_id) REFERENCES billing_quotes(id) ON UPDATE RESTRICT ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE billing_invoice_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, invoice_id BIGINT UNSIGNED NOT NULL,
  service_title VARCHAR(255) NOT NULL, description TEXT NULL, quantity DECIMAL(12,3) NOT NULL,
  unit_price DECIMAL(14,2) NOT NULL, line_total DECIMAL(14,2) NOT NULL, sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  INDEX idx_invoice_items (invoice_id,sort_order), CONSTRAINT fk_invoice_items_invoice FOREIGN KEY (invoice_id) REFERENCES billing_invoices(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE billing_payments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, invoice_id BIGINT UNSIGNED NOT NULL,
  client_id BIGINT UNSIGNED NOT NULL, payment_date DATE NOT NULL, amount DECIMAL(14,2) NOT NULL,
  payment_method ENUM('Bank Transfer','Cash','Card','Other') NOT NULL, reference_number VARCHAR(190) NULL,
  notes TEXT NULL, created_by VARCHAR(64) NOT NULL, reversed_at TIMESTAMP NULL, reversed_by VARCHAR(64) NULL,
  reversal_reason VARCHAR(500) NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_payments_invoice (invoice_id,payment_date), INDEX idx_payments_client (client_id,payment_date), INDEX idx_payments_active (reversed_at),
  CONSTRAINT fk_payments_invoice FOREIGN KEY (invoice_id) REFERENCES billing_invoices(id) ON DELETE RESTRICT,
  CONSTRAINT fk_payments_client FOREIGN KEY (client_id) REFERENCES billing_clients(id) ON DELETE RESTRICT,
  CONSTRAINT chk_payment_positive CHECK (amount > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE billing_activity_log (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, admin_user_id VARCHAR(64) NOT NULL,
  action VARCHAR(80) NOT NULL, entity_type ENUM('client','quote','invoice','payment','settings') NOT NULL,
  entity_id BIGINT UNSIGNED NULL, metadata JSON NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_entity (entity_type,entity_id,created_at), INDEX idx_activity_admin (admin_user_id,created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
