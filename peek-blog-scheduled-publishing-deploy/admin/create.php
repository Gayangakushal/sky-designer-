<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
blog_method(['POST']);
$input = blog_post_input(blog_request_data());
try {
    $db = blog_database();
    if ($db->one('SELECT id FROM blog_posts WHERE slug = ? LIMIT 1', 's', [$input['slug']])) blog_fail('A post with this slug already exists.', 409);
    if (!$db->one('SELECT id FROM blog_categories WHERE id = ? LIMIT 1', 'i', [$input['category_id']])) blog_fail('Selected category does not exist.', 422);
    $db->execute(
        'INSERT INTO blog_posts (category_id, title, slug, excerpt, content, featured_image, author_name, status, is_featured, seo_title, seo_description, published_at, scheduled_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        'isssssssissss',
        [$input['category_id'], $input['title'], $input['slug'], $input['excerpt'], $input['content'], $input['featured_image'], $input['author_name'], $input['status'], $input['is_featured'], $input['seo_title'], $input['seo_description'], $input['published_at'], $input['scheduled_at']]
    );
    $post = $db->one(blog_post_select() . ' WHERE p.id = ?', 'i', [$db->lastInsertId()]);
    blog_json(['success' => true, 'post' => $post], 201);
} catch (Throwable) {
    blog_fail('The blog post could not be created.', 500);
}
