<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$isLocalDevelopment = (bool) preg_match(
    '#^http://(localhost|127\.0\.0\.1)(:\d+)?$#',
    $origin
);

$isProduction = in_array(
    $origin,
    [
        'https://skydesigners.lk',
        'https://www.skydesigners.lk',
    ],
    true
);

$isAllowedOrigin = $isLocalDevelopment || $isProduction;

if ($isAllowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, Accept');
    header('Access-Control-Max-Age: 86400');
}

/*
|--------------------------------------------------------------------------
| OPTIONS Preflight
|--------------------------------------------------------------------------
*/

$requestMethod = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');

if ($requestMethod === 'OPTIONS') {

    if (!$isAllowedOrigin) {
        http_response_code(403);
        exit;
    }

    http_response_code(204);
    exit;
}


/*
|--------------------------------------------------------------------------
| Existing dependencies
|--------------------------------------------------------------------------
*/

require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/database.php';

blog_require_admin();


function blog_request_data(): array
{
    $raw = file_get_contents('php://input');

    $data = json_decode($raw ?: '{}', true);

    if (!is_array($data)) {
        blog_fail('Invalid JSON request body.', 400);
    }

    return $data;
}


function blog_post_input(array $data): array
{
    $value = static fn(string $key): string =>
        trim((string) ($data[$key] ?? ''));

    $title = $value('title');
    $slug = strtolower($value('slug'));

    $categoryId = filter_var(
        $data['category_id'] ?? null,
        FILTER_VALIDATE_INT
    );

    $content = $value('content');
    $status = strtolower($value('status'));

    if (
        $title === '' ||
        $slug === '' ||
        !$categoryId ||
        $content === ''
    ) {
        blog_fail(
            'Title, slug, category, and content are required.',
            422
        );
    }

    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $slug)) {
        blog_fail('Slug format is invalid.', 422);
    }

    if (!in_array($status, ['draft', 'published'], true)) {
        blog_fail('Status must be draft or published.', 422);
    }

    $publishedAt = $data['published_at'] ?? null;

    if ($publishedAt !== null && $publishedAt !== '') {
        try {
            $publishedAt = (
                new DateTimeImmutable((string) $publishedAt)
            )->format('Y-m-d H:i:s');
        } catch (Throwable) {
            blog_fail('Published date is invalid.', 422);
        }
    } else {
        $publishedAt =
            $status === 'published'
                ? date('Y-m-d H:i:s')
                : null;
    }

    return [
        'category_id' => (int) $categoryId,

        'title' => mb_substr($title, 0, 255),

        'slug' => mb_substr($slug, 0, 255),

        'excerpt' =>
            ($excerpt = $value('excerpt')) !== ''
                ? $excerpt
                : null,

        'content' => $content,

        'featured_image' =>
            ($image = $value('featured_image')) !== ''
                ? mb_substr($image, 0, 2048)
                : null,

        'author_name' =>
            ($author = $value('author_name')) !== ''
                ? mb_substr($author, 0, 255)
                : null,

        'status' => $status,

        'is_featured' =>
            filter_var(
                $data['is_featured'] ?? false,
                FILTER_VALIDATE_BOOLEAN
            ) ? 1 : 0,

        'seo_title' =>
            ($seoTitle = $value('seo_title')) !== ''
                ? mb_substr($seoTitle, 0, 255)
                : null,

        'seo_description' =>
            ($seoDescription = $value('seo_description')) !== ''
                ? mb_substr($seoDescription, 0, 500)
                : null,

        'published_at' => $publishedAt,
    ];
}


function blog_database(): BlogDatabase
{
    try {
        return new BlogDatabase();
    } catch (Throwable) {
        blog_fail(
            'The blog database is temporarily unavailable.',
            500
        );
    }
}


function blog_method(array $allowed): void
{
    $method = strtoupper(
        $_SERVER['REQUEST_METHOD'] ?? 'GET'
    );

    if (!in_array($method, $allowed, true)) {
        header('Allow: ' . implode(', ', $allowed));

        blog_fail(
            'Method not allowed.',
            405
        );
    }
}