<?php

namespace App\UseCases\Public\Organs\GetOrgansListFilters;

use Illuminate\Http\JsonResponse;

class GetOrgansListFiltersController
{
    public function __invoke(): JsonResponse
    {
        $filters = [
            [
                'defaultValue' => '',
                'headerLabel' => 'organ_name',
                'order' => 1,
                'type' => 'text',
                'headerLabelTranslate' => 'Орган по сертификации',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'organ_number',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Рег. номер аттестата ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'organ_accreditation_scope',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'Область уполномочивания ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'bus_begin',
                'order' => 4,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата начала деятельности',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'bus_end',
                'order' => 5,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата окончания деятельности',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'legal_short_name',
                'order' => 6,
                'type' => 'text',
                'headerLabelTranslate' => 'Заявитель / владелец ОС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'legal_ogrn',
                'order' => 7,
                'type' => 'text',
                'headerLabelTranslate' => 'ОГРН заявителя',
                'tooltip' => '',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'legal_inn',
                'order' => 8,
                'type' => 'text',
                'headerLabelTranslate' => 'ИНН заявителя',
                'tooltip' => '',
            ],
        ];

        return new JsonResponse($filters);
    }
}
