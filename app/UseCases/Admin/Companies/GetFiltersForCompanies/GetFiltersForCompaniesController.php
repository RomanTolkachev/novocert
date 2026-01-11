<?php

namespace App\UseCases\Admin\Companies\GetFiltersForCompanies;

use App\Models\Cli;
use App\UseCases\Admin\Companies\shared\CompaniesTranslator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class GetFiltersForCompaniesController
{
    public function __invoke()
    {

        $translatedCliTypes = CompaniesTranslator::translate(Cache::remember('distinct_cli_type', 60 * 60 * 24, function () {
            return Cli::query()->select('cli_type_')->distinct()->pluck('cli_type_')->toArray();
        }));

        $translatedCliStatus = CompaniesTranslator::translate(Cache::remember('distinct_cli_status', 60 * 60 * 24, function () {
            return Cli::query()->select('cli_status_')->distinct()->pluck('cli_status_')->toArray();
        }));

        $filters = [
            [
                'defaultValue' => [],
                'headerLabel' => 'cli_type',
                'order' => 1,
                'type' => 'checkbox',
                'values' => $translatedCliTypes,
                'headerLabelTranslate' => 'Тип юл',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'okved',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Код ОКВЭД',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'fio_ceo',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'Фио руководителя',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'reg_date',
                'order' => 4,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата регистрации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => [],
                'headerLabel' => 'cli_status',
                'order' => 5,
                'type' => 'checkbox',
                'values' => $translatedCliStatus,
                'headerLabelTranslate' => 'Статус ЮЛ',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'ul_name',
                'order' => 6,
                'type' => 'text',
                'headerLabelTranslate' => 'Наименование ЮЛ',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'ogrn',
                'order' => 7,
                'type' => 'text',
                'headerLabelTranslate' => 'ОГРН',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'inn',
                'order' => 8,
                'type' => 'text',
                'headerLabelTranslate' => 'ИНН',
                'tooltip' => '',
            ],
        ];

        return new JsonResponse($filters);
    }
}
