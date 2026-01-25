<?php

namespace App\UseCases\Public\Companies\GetCompaniesList;

use App\Models\CompanyView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UseCases\Public\Companies\GetCompaniesList\shared\CompaniesFilters;

class GetCompaniesListController
{
    public function __invoke(GetCompaniesListHandler $handler, Request $request): JsonResponse
    {
        $builder = CompanyView::query();

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new CompaniesFilters($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
