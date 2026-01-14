<?php

namespace App\UseCases\Public\Certs\GetCertsListFilters;

use App\Models\CertSystem;
use App\Models\DocumentView;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\UseCases\Public\Certs\shared\CertsTranslator;

class GetCertsListFiltersController
{
    public function __invoke()
    {

        // $translated = CertsTranslator::translate(
        //     Cache::remember('distinct_status_sds_example', 86400, function () {
        //         return CertSystem::where('id', '>', 1)
        //             ->select(['gid', 'name', 'number as cert_number', 'accreditation', 'bus_begin', 'bus_end', 'img_path', "cli_name", "organ_status_", "docum_web_reference"])
        //             ->withCount('organs')
        //             ->withCount('documents')
        //             ->with(['status:gid,name'])
        //             ->where('tech_end', '2399-12-31');

        //     })
        // );

        $filters = [

            [
                'defaultValue' => "",
                'headerLabel' => 'regnum_sds',
                'order' => 1,
                'type' => 'text',
                'headerLabelTranslate' => 'регистрационный номер СДС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => "",
                'headerLabel' => 'name_sds',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Наименование системы СДС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => "",
                'headerLabel' => 'area_sds',
                'order' => 3,
                'type' => 'text',
                'headerLabelTranslate' => 'Область распространения системы (объекты сертификации)',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'reg_date_sds',
                'order' => 4,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата регистрации системы СДС',
                'tooltip' => '',
            ],
            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'expires_date_sds',
                'order' => 5,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата окончания действия системы СДС',
                'tooltip' => '',
            ],
            // [
            //     'defaultValue' => [],
            //     'headerLabel' => 'status_sds',
            //     'order' => 6,
            //     'type' => 'checkbox',
            //     'values' => $translated,
            //     'headerLabelTranslate' => 'Чекбокс фильтр',
            //     'tooltip' => '',
            // ],
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
                'headerLabel' => 'example_text',
                'order' => 2,
                'type' => 'text',
                'headerLabelTranslate' => 'Текстовый фильтр',
                'tooltip' => '',
            ],

            [
                'defaultValue' => ['', ''],
                'headerLabel' => 'example_date',
                'order' => 3,
                'type' => 'date',
                'headerLabelTranslate' => 'Дата',
                'tooltip' => '',
            ],

        ];

        return new JsonResponse($filters);
    }
}
