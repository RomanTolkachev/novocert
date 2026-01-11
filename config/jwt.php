<?php

return [
    'secret' => env('JWT_SECRET', 'hello_world'),
    'algorithm' => 'HS256',
    'access_ttl' => 3600 /* 3600 */, // 1 час
    'refresh_ttl' => 86400, // 24 часа
];