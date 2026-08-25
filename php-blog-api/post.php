<?php
declare(strict_types=1);
require_once __DIR__ . '/public-bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') blog_fail('Method not allowed.', 405);
$slug = strtolower(trim((string) ($_GET['slug'] ?? '')));
if ($slug === '' || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
    blog_fail('Blog post not found.', 404);
}

try {
    $post = blog_public_database()->one(
        blog_post_select() . ' WHERE p.slug = ? AND ' . blog_public_condition() . ' LIMIT 1',
        's',
        [$slug]
    );
    if (!$post) blog_fail('Blog post not found.', 404);
    blog_json(['success' => true, 'post' => $post]);
} catch (Throwable) {
    blog_fail('The blog post could not be loaded.', 503);
}
