<?php

namespace App\UseCases\Public\Docs\GetDocsListFilters;

use App\Models\FeedbackView;
use App\Services\SortOptionsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\UseCases\Public\Docs\shared\DocsTranslator;

class GetDocsListFiltersController
{
    public function __invoke(SortOptionsService $sortOptionsService): JsonResponse
    {
        $config = require __DIR__ . '/../config.php';
        $sortingColumns = $config['sorting_columns'];
        $sortValues = $sortOptionsService->buildOptions($sortingColumns);
        $rawStatuses = Cache::remember('distinct_feedbacks_view_organ_status_liter', 86400, function () {
            return FeedbackView::query()
                ->select('organ_status_liter')
                ->whereNotNull('organ_status_liter')
                ->distinct()
                ->pluck('organ_status_liter')
                ->toArray();
        });

        $translatedStatuses = DocsTranslator::translate($rawStatuses);

        $filters = [
            [
                'defaultValue' => '',
                'headerLabel' => 'fb_name',
                'order' => 1,
                'type' => 'text',
                'headerLabelTranslate' => 'Наименование документа',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'fb_doc_reg_num',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Регистрационный номер',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'docum_type_name',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'Тип документа',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'fb_bus_begin',
                'order' => 4,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата регистрации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'fb_bus_end',
                'order' => 5,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата окончания',
                'tooltip' => '',
            ],
            [
                'defaultValue' => [],
                'headerLabel' => 'organ_status_liter',
                'order' => 6,
                'type' => 'checkbox',
                'values' => $translatedStatuses,
                'headerLabelTranslate' => 'Статус документа',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'from_short_name',
                'order' => 7,
                'type' => 'text',
                'headerLabelTranslate' => 'От кого (наименование)',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'to_short_name',
                'order' => 8,
                'type' => 'text',
                'headerLabelTranslate' => 'Кому (наименование)',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'sort',
                'order' => 9,
                'type' => 'select',
                'values' => $sortValues,
                'headerLabelTranslate' => 'Сортировка',
                'tooltip' => '',
            ],
        ];

        return new JsonResponse($filters);
    }
}
