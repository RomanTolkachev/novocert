<?php

namespace App\UseCases\Public\Systems\GetSystemsList;

use App\Models\SystemView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UseCases\Public\Systems\GetSystemsList\shared\SystemsFilters;


class GetSystemsListController
{
    public function __invoke(GetSystemsListHandler $handler, Request $request): JsonResponse
    {
        $builder = SystemView::query();

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new SystemsFilters($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}