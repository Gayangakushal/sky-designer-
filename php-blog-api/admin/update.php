<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
blog_method(['POST', 'PATCH']);
$data = blog_request_data();
$id = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
if (!$id) blog_fail('A valid post ID is required.', 422);
$input = blog_post_input($data);
try {
    $db = blog_database();
    if (!$db->one('SELECT id FROM blog_posts WHERE id = ? LIMIT 1', 'i', [$id])) blog_fail('Blog post not found.', 404);
    if ($db->one('SELECT id FROM blog_posts WHERE slug = ? AND id <> ? LIMIT 1', 'si', [$input['slug'], $id])) blog_fail('A post with this slug already exists.', 409);
    if (!$db->one('SELECT id FROM blog_categories WHERE id = ? LIMIT 1', 'i', [$input['category_id']])) blog_fail('Selected category does not exist.', 422);
    $db->execute(
        'UPDATE blog_posts SET category_id = ?, title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, author_name = ?, status = ?, is_featured = ?, seo_title = ?, seo_description = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        'isssssssisssi',
        [$input['category_id'], $input['title'], $input['slug'], $input['excerpt'], $input['content'], $input['featured_image'], $input['author_name'], $input['status'], $input['is_featured'], $input['seo_title'], $input['seo_description'], $input['published_at'], $id]
    );
    $post = $db->one(blog_post_select() . ' WHERE p.id = ?', 'i', [$id]);
    blog_json(['success' => true, 'post' => $post]);
} catch (Throwable) {
    blog_fail('The blog post could not be updated.', 500);
}
