<?php

namespace App\UseCases\Admin\Feedbacks\GetFeedbacksListFilters;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\UseCases\FeedbacksTranslator;

class GetFeedbacksListFiltersController
{
    public function __invoke()
    {
        // protected string $cacheColumn = '{table}.{column}'; // сюда вручную прописать модель и столбец

        // $translated = FeedbacksTranslator::translate(
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