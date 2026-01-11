<?php

namespace App\UseCases\Admin\Users\GetFiltersForUsers;

use Illuminate\Http\JsonResponse;

class GetFiltersForUsersController
{
    public function __invoke()
    {
        $filters = [
            [
                'defaultValue' => '',
                'headerLabel' => 'text',
                'order' => 1,
                'type' => 'text',
            ],
            [
                'defaultValue' => '',
                'headerLabel' => 'anotherText',
                'order' => 2,
                'type' => 'text',
            ],
        ];

        return new JsonResponse($filters);
    }
}
