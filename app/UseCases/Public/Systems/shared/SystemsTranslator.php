<?php

namespace App\UseCases\Public\Systems\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class SystemsTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = [
        // 'raw_value' => 'Перевод' — слева сырое значение из БД, справа перевод
    ];
}