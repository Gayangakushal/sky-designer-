<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
blog_method(['DELETE', 'POST']);
$data = blog_request_data();
$id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
if (!$id) blog_fail('A valid post ID is required.', 422);
try {
    $deleted = blog_database()->execute('DELETE FROM blog_posts WHERE id = ?', 'i', [$id]);
    if ($deleted < 1) blog_fail('Blog post not found.', 404);
    blog_json(['success' => true, 'message' => 'Blog post deleted.']);
} catch (Throwable) {
    blog_fail('The blog post could not be deleted.', 500);
}
