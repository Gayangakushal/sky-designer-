-- LOCAL TEST DATA TEMPLATE ONLY. Never import into production.
-- Replace TEST_ADMIN_UUID with a local Supabase admin UUID before use.
START TRANSACTION;
INSERT INTO billing_clients(name,contact_person,email,country,created_by)
VALUES ('TEST — Example Client','Test Contact','test@example.invalid','Sri Lanka','TEST_ADMIN_UUID');
SET @client=LAST_INSERT_ID();
-- Create test documents through the API so numbering, snapshots and audit logic are tested.
-- Minimum acceptance set: two-line LKR quote; unpaid, partial, paid and overdue invoices.
ROLLBACK;

