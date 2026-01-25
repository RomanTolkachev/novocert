<?php

namespace App\UseCases\Public\Docs\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class DocsTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = self::STATUS_TRANSLATIONS;
}
