<?php

namespace App\UseCases\Admin\Feedbacks\shared;

use App\Http\Abstract\AbstractCheckboxTranslator;

class FeedbacksTranslator extends AbstractCheckboxTranslator
{
    protected static array $translations = [
        // 'raw_value' => 'Перевод' — слева сырое значение из БД, справа перевод
    ];
}