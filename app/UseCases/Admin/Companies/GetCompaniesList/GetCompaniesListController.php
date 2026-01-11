<?php

namespace App\UseCases\Admin\Companies\GetCompaniesList;

use App\Models\Cli;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UseCases\Admin\Companies\GetCompaniesList\shared\GetCompaniesListFilter;


class GetCompaniesListController
{
    public function __invoke(GetCompaniesListHandler $handler, Request $request): JsonResponse
    {

        $builder = Cli::query();

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new GetCompaniesListFilter($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}