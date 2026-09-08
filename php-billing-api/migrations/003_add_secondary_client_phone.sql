-- Add optional secondary client phone support without changing existing phone values.
-- Apply manually once, after migrations 001 and 002, to the dedicated billing database.
ALTER TABLE billing_clients
  ADD COLUMN IF NOT EXISTS phone_secondary VARCHAR(100) NULL AFTER phone;

-- Country is optional client profile data. Keep the Sri Lanka default for new rows
-- that omit the column while allowing the API to store NULL when it is left blank.
ALTER TABLE billing_clients
  MODIFY COLUMN country VARCHAR(120) NULL DEFAULT 'Sri Lanka';
