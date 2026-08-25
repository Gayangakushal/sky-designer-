<?php
declare(strict_types=1);

require_once __DIR__ . '/admin/auth.php';
require_once __DIR__ . '/admin/database.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Accept, Content-Type');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function blog_public_database(): BlogDatabase
{
    try {
        return new BlogDatabase();
    } catch (Throwable) {
        blog_fail('The blog service is temporarily unavailable.', 503);
    }
}

function blog_public_condition(): string
{
    return "(p.status = 'published' OR (p.status = 'scheduled' AND p.scheduled_at IS NOT NULL AND p.scheduled_at <= UTC_TIMESTAMP()))";
}
