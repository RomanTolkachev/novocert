<?php

namespace App\UseCases\Admin\Companies\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class CompaniesTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = [
        'bank' => 'Банк',
        'ip' => 'ИП',
        'jur' => 'ЮЛ',
    ];
}
