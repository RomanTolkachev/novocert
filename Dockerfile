FROM php:8.3-fpm-alpine

# Устанавливаем зависимости
RUN apk add --no-cache \
    bash \
    curl \
    gnupg \
    unixodbc-dev \
    build-base \
    autoconf \
    libpng-dev \
    libzip-dev \
    libxml2-dev \
    git \
    zip \
    unzip \
    curl

# Скачиваем Microsoft ODBC Driver и mssql-tools. это для AMD, если на хосте ARM, то поискать в дистрибутивах icrosoft
RUN curl -LO https://download.microsoft.com/download/9dcab408-e0d4-4571-a81a-5a0951e3445f/msodbcsql18_18.6.1.1-1_amd64.apk \
    && apk add --allow-untrusted msodbcsql18_18.6.1.1-1_amd64.apk \
    && rm msodbcsql18_18.6.1.1-1_amd64.apk

# Устанавливаем PECL драйверы
RUN pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html
COPY . .
RUN composer install --no-interaction --optimize-autoloader

CMD ["sh", "-c", "php artisan optimize && php-fpm -F"]

