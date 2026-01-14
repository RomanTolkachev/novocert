<?php

namespace App\UseCases\Public\Certs\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class CertsTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = [
        // 'raw_value' => 'Перевод' — слева сырое значение из БД, справа перевод
    ];
}