<?php
declare(strict_types=1);
require_once __DIR__ . '/public-bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') blog_fail('Method not allowed.', 405);

try {
    $categories = blog_public_database()->all(
        'SELECT c.* FROM blog_categories c ORDER BY c.name ASC'
    );
    blog_json(['success' => true, 'categories' => $categories]);
} catch (Throwable) {
    blog_fail('Blog categories could not be loaded.', 503);
}
