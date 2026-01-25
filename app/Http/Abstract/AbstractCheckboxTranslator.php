<?php

namespace App\Http\Abstract;

abstract class AbstractCheckboxTranslator
{
    protected static array $translations;

    protected const STATUS_TRANSLATIONS = [
        'N'  => 'нет',
        'A'  => 'Действует',
        'D'  => 'Архивный',
        'S'  => 'Приостановлен',
        'T'  => 'Прекращен',
        'P'  => 'Частично приостановлен',
        'L'  => 'Ликвидирована',
        'B'  => 'В процессе банкротства',
        'PL' => 'В процессе ликвидации',
    ];

    public static function translate(array $raw): array
    {
        return array_map(function ($fromDb) {
            return static::$translations[$fromDb] ?? $fromDb;
        }, $raw);
    }

    public static function parse(array $raw): array
    {
        return array_map(function ($translated) {
            $key = array_search($translated, static::$translations, true);

            return $key !== false ? $key : $translated;
        }, $raw);
    }
}
