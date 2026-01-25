<?php

namespace App\UseCases\Public\Certs\GetCertsListFilters;

use App\Models\DocumentView;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\UseCases\Public\Certs\shared\CertsTranslator;

class GetCertsListFiltersController
{
    public function __invoke(): JsonResponse
    {
      
        $rawCertStatuses = Cache::remember('distinct_documents_view_cert__status', 86400, function () {
            return DocumentView::query()
                ->select('cert__status')
                ->whereNotNull('cert__status')
                ->distinct()
                ->pluck('cert__status')
                ->toArray();
        });

        $rawOrganStatuses = Cache::remember('distinct_documents_view_organ__status', 86400, function () {
            return DocumentView::query()
                ->select('organ__status')
                ->whereNotNull('organ__status')
                ->distinct()
                ->pluck('organ__status')
                ->toArray();
        });

        $translatedCertStatuses = CertsTranslator::translate($rawCertStatuses);
        $translatedOrganStatuses = CertsTranslator::translate($rawOrganStatuses);

        $filters = [
            [
                'defaultValue' => '',
                'headerLabel' => 'cert__name',
                'order' => 1,
                'type' => 'text',
                'headerLabelTranslate' => 'Наименование',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'system__name',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Система сертификации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'organ__name',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'Орган по сертификации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'applicant__short_name',
                'order' => 4,
                'type' => 'text',
                'headerLabelTranslate' => 'Заявитель',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'cert__bus_begin',
                'order' => 5,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата регистрации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => [],
                'headerLabel' => 'cert__status',
                'order' => 6,
                'type' => 'checkbox',
                'values' => $translatedCertStatuses,
                'headerLabelTranslate' => 'Статус сертификата',
                'tooltip' => '',
            ],
            [
                'defaultValue' => [],
                'headerLabel' => 'organ__status',
                'order' => 7,
                'type' => 'checkbox',
                'values' => $translatedOrganStatuses,
                'headerLabelTranslate' => 'Статус органа',
                'tooltip' => '',
            ],
        ];

        return new JsonResponse($filters);
    }
}
