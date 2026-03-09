<?php

use Illuminate\Support\Facades\Route;

Route::get('/storage/{path}', function (string $path) {
    // Временная проверка — удалить после теста
    return response('STORAGE ROUTE HIT', 200, ['Content-Type' => 'text/plain']);

    $path = str_replace(['../', '..\\'], '', $path);
    $base = storage_path('app/public');
    $fullPath = $base . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path);

    if (!is_file($fullPath)) {
        abort(404);
    }

    return response()->file($fullPath, [
        'Content-Type' => mime_content_type($fullPath) ?: 'application/octet-stream',
    ]);
})->where('path', '.*')->name('storage.serve');

Route::get('/{any}', function () {
    return view('root');
})->where('any', '^(?!api|storage).*$');
