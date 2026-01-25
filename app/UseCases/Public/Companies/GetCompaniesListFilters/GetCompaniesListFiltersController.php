<?php

namespace App\UseCases\Public\Companies\GetCompaniesListFilters;

use App\Models\CompanyView;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class GetCompaniesListFiltersController
{
    public function __invoke(): JsonResponse
    {
        // distinct статусы компании, кэшируем на сутки
        $companyStatuses = Cache::remember('distinct_companies_view_company_status', 86400, function () {
            return CompanyView::query()
                ->select('company_status')
                ->whereNotNull('company_status')
                ->distinct()
                ->pluck('company_status')
                ->toArray();
        });

        $filters = [
            [
                'defaultValue' => '',
                'headerLabel' => 'company_short_name',
                'order' => 1,
                'type' => 'text',
                'headerLabelTranslate' => 'Краткое название компании',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'company_inn',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'ИНН компании',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'company_ogrn',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'ОГРН компании',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'company_type',
                'order' => 4,
                'type' => 'text',
                'headerLabelTranslate' => 'Тип ЮЛ',
                'tooltip' => '',
            ],
            [
                'defaultValue' => [],
                'headerLabel' => 'company_status',
                'order' => 5,
                'type' => 'checkbox',
                'values' => $companyStatuses,
                'headerLabelTranslate' => 'Статус компании',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'okved_code',
                'order' => 6,
                'type' => 'text',
                'headerLabelTranslate' => 'Код ОКВЭД',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'ceo',
                'order' => 7,
                'type' => 'text',
                'headerLabelTranslate' => 'ФИО руководителя',
                'tooltip' => '',
            ],
        ];

        return new JsonResponse($filters);
    }
}
