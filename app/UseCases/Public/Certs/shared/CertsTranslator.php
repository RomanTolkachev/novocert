<?php

namespace App\UseCases\Public\Certs\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class CertsTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = self::STATUS_TRANSLATIONS;
}
