<?php
declare(strict_types=1);
require_once __DIR__ . '/public-bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') blog_fail('Method not allowed.', 405);

try {
    $posts = blog_public_database()->all(
        blog_post_select() . ' WHERE ' . blog_public_condition() .
        ' ORDER BY COALESCE(p.published_at, p.scheduled_at, p.created_at) DESC, p.id DESC'
    );
    blog_json(['success' => true, 'posts' => $posts]);
} catch (Throwable) {
    blog_fail('Blog posts could not be loaded.', 503);
}
