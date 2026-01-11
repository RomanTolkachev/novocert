<?php

namespace App\UseCases\Admin\Organs\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class OrgansTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = [
        // 'raw_value' => 'Перевод' — слева сырое значение из БД, справа перевод
    ];
}