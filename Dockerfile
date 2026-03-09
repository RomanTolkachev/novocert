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

# Скачиваем Microsoft ODBC Driver (amd64 на Intel/AMD, arm64 на Apple Silicon)
ARG TARGETARCH
RUN curl -LO https://download.microsoft.com/download/9dcab408-e0d4-4571-a81a-5a0951e3445f/msodbcsql18_18.6.1.1-1_${TARGETARCH}.apk \
    && apk add --allow-untrusted msodbcsql18_18.6.1.1-1_${TARGETARCH}.apk \
    && rm msodbcsql18_18.6.1.1-1_${TARGETARCH}.apk

# Устанавливаем PECL драйверы
RUN pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html
COPY . .
RUN composer install --no-interaction --optimize-autoloader

COPY docker/php/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

