#!/bin/sh
set -e

cd /var/www/html

if [ ! -d "vendor" ] || [ ! -f "vendor/autoload.php" ]; then
    composer install --no-interaction --optimize-autoloader
fi

php artisan optimize 2>/dev/null || true
exec php-fpm -F
