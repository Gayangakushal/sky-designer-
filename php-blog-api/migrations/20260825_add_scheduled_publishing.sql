-- Safe, data-preserving scheduling migration. Existing blog rows are not updated.
SET @has_scheduled_at = (
  SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'scheduled_at'
);
SET @add_scheduled_at = IF(
  @has_scheduled_at = 0,
  'ALTER TABLE blog_posts ADD COLUMN scheduled_at DATETIME NULL AFTER published_at',
  'SELECT 1'
);
PREPARE add_scheduled_at_statement FROM @add_scheduled_at;
EXECUTE add_scheduled_at_statement;
DEALLOCATE PREPARE add_scheduled_at_statement;

SET @status_column_type = (
  SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'status'
  LIMIT 1
);
SET @extend_status = IF(
  LOWER(@status_column_type) LIKE 'enum(%' AND LOCATE('scheduled', LOWER(@status_column_type)) = 0,
  CONCAT(
    'ALTER TABLE blog_posts MODIFY status ',
    LEFT(@status_column_type, CHAR_LENGTH(@status_column_type) - 1),
    ',''scheduled'') NOT NULL DEFAULT ''draft'''
  ),
  'SELECT 1'
);
PREPARE extend_status_statement FROM @extend_status;
EXECUTE extend_status_statement;
DEALLOCATE PREPARE extend_status_statement;

SET @has_scheduled_index = (
  SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blog_posts' AND INDEX_NAME = 'blog_posts_scheduled_at_idx'
);
SET @add_scheduled_index = IF(
  @has_scheduled_index = 0,
  'ALTER TABLE blog_posts ADD INDEX blog_posts_scheduled_at_idx (status, scheduled_at)',
  'SELECT 1'
);
PREPARE add_scheduled_index_statement FROM @add_scheduled_index;
EXECUTE add_scheduled_index_statement;
DEALLOCATE PREPARE add_scheduled_index_statement;
