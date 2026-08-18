<?php
declare(strict_types=1);

const BLOG_ADMIN_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://127.0.0.1:8080',
    'https://skydesigners.lk',
    'https://www.skydesigners.lk',
];

function blog_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function blog_fail(string $message, int $status): void
{
    blog_json(['success' => false, 'message' => $message], $status);
}

function blog_apply_cors(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && in_array($origin, BLOG_ADMIN_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, Accept');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
        header('Access-Control-Max-Age: 86400');
    }

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
        if ($origin === '' || !in_array($origin, BLOG_ADMIN_ORIGINS, true)) {
            blog_fail('Origin not allowed.', 403);
        }
        http_response_code(204);
        exit;
    }

    if ($origin !== '' && !in_array($origin, BLOG_ADMIN_ORIGINS, true)) {
        blog_fail('Origin not allowed.', 403);
    }
}

function blog_bearer_token(): string
{
    $header = $_SERVER['HTTP_AUTHORIZATION']
        ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        ?? '';
    if ($header === '' && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $header = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }
    if (!preg_match('/^Bearer\s+(.+)$/i', trim($header), $matches)) {
        blog_fail('Authentication required.', 401);
    }
    return trim($matches[1]);
}

function blog_supabase_request(string $url, string $apiKey, string $token, ?array $body = null): array
{
    if (!function_exists('curl_init')) {
        blog_fail('Server authentication is unavailable.', 500);
    }
    $curl = curl_init($url);
    $headers = [
        'Accept: application/json',
        'apikey: ' . $apiKey,
        'Authorization: Bearer ' . $token,
    ];
    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => $headers,
    ];
    if ($body !== null) {
        $headers[] = 'Content-Type: application/json';
        $options[CURLOPT_HTTPHEADER] = $headers;
        $options[CURLOPT_POST] = true;
        $options[CURLOPT_POSTFIELDS] = json_encode($body);
    }
    curl_setopt_array($curl, $options);
    $response = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $failed = $response === false;
    curl_close($curl);
    if ($failed || $status < 200 || $status >= 300) {
        return ['ok' => false, 'status' => $status];
    }
    $decoded = json_decode((string) $response, true);
    return ['ok' => true, 'status' => $status, 'data' => $decoded];
}

function blog_require_admin(): array
{
    blog_apply_cors();
    $token = blog_bearer_token();
    $supabaseUrl = rtrim((string) getenv('SUPABASE_URL'), '/');
    $anonKey = (string) getenv('SUPABASE_ANON_KEY');
    if ($supabaseUrl === '' || $anonKey === '') {
        blog_fail('Server authentication is not configured.', 500);
    }

    $userResult = blog_supabase_request($supabaseUrl . '/auth/v1/user', $anonKey, $token);
    $user = $userResult['data'] ?? null;
    if (!$userResult['ok'] || !is_array($user) || empty($user['id'])) {
        blog_fail('Invalid or expired session.', 401);
    }

    $roleResult = blog_supabase_request(
        $supabaseUrl . '/rest/v1/rpc/has_role',
        $anonKey,
        $token,
        ['_user_id' => $user['id'], '_role' => 'admin']
    );
    if (!$roleResult['ok']) {
        blog_fail('Unable to verify administrator access.', 403);
    }
    $isAdmin = $roleResult['data'] === true || $roleResult['data'] === 'true';
    if (!$isAdmin) {
        blog_fail('Administrator access required.', 403);
    }
    return $user;
}
