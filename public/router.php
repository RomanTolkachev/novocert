<?php
/**
 * Роутер для PHP built-in server.
 * Обслуживает /storage/* напрямую (php artisan serve не следует по симлинкам).
 * Остальные запросы передаёт в Laravel.
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if (str_starts_with($uri, '/storage/')) {
    $path = dirname(__DIR__) . '/storage/app/public' . substr($uri, 8);
    if (is_file($path)) {
        $mime = mime_content_type($path) ?: 'application/octet-stream';
        header('Content-Type: ' . $mime);
        header('Content-Length: ' . filesize($path));
        readfile($path);
        exit;
    }
}

require __DIR__ . '/index.php';
