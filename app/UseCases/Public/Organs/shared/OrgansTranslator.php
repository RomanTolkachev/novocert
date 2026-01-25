<?php

namespace App\UseCases\Public\Organs\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class OrgansTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = self::STATUS_TRANSLATIONS;
}
