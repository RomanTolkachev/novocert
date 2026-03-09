#!/bin/sh
set -e

cd /var/www/html

if [ ! -d "vendor" ] || [ ! -f "vendor/autoload.php" ]; then
    composer install --no-interaction --optimize-autoloader
fi

if [ -f .env ] && ! grep -q '^APP_KEY=base64:.\+' .env 2>/dev/null; then
    php artisan key:generate --no-interaction
fi

php artisan optimize 2>/dev/null || true
exec php-fpm -F
