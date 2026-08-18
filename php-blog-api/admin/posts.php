<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
blog_method(['GET']);
try {
    $posts = blog_database()->all(blog_post_select() . ' ORDER BY p.created_at DESC');
    blog_json(['success' => true, 'posts' => $posts]);
} catch (Throwable) {
    blog_fail('Blog posts could not be loaded.', 500);
}
