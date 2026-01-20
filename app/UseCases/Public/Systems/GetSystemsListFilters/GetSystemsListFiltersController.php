<?php

namespace App\UseCases\Public\Systems\GetSystemsListFilters;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\UseCases\Public\Systems\shared\SystemsTranslator;

class GetSystemsListFiltersController
{
    public function __invoke()
    {

        // $translated = SystemsTranslator::translate(
        //     Cache::remember('distinct_/* Model */_example', 86400, function () {
        //         return /* Model */::query()
        //             ->select('example_column') // поменять вручную
        //             ->distinct()
        //             ->pluck('example_column')
        //             ->toArray();
        //     })
        // );

        $filters = [

            // [
            //     'defaultValue' => [],
            //     'headerLabel' => 'example_checkbox',
            //     'order' => 1,
            //     'type' => 'checkbox',
            //     'values' => $translated,
            //     'headerLabelTranslate' => 'Чекбокс фильтр',
            //     'tooltip' => '',
            // ],

            [
                'defaultValue' => '',
                'headerLabel' => 'system_name',
                'order' => 1,
                'type' => 'text',
                'headerLabelTranslate' => 'Система сертификации ',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'system_cert_number',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Рег. номер сертификата',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'accreditation',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'Область уполномачивания ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'bus_begin',
                'order' => 4,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата регистрации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'bus_end',
                'order' => 5,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата прекращения',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'status__name',
                'order' => 6,
                'type' => 'checkbox',
                'headerLabelTranslate' => 'Состояние аттестата ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'owner__short_name',
                'order' => 7,
                'type' => 'text',
                'headerLabelTranslate' => 'Наименованию владельца ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'owner__ogrn',
                'order' => 8,
                'type' => 'text',
                'headerLabelTranslate' => 'ОГРН владельца ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'owner__inn',
                'order' => 9,
                'type' => 'text',
                'headerLabelTranslate' => 'ИНН владельца ОС',
                'tooltip' => '',
            ],
           
        ];
        return new JsonResponse($filters);
    }
}
