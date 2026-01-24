<?php

namespace App\UseCases\Public\Organs\GetOrgansList;

use App\Models\OrganView;
use App\UseCases\Public\Organs\GetOrgansList\shared\OrgansFilters;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetOrgansListController
{
    public function __invoke(GetOrgansListHandler $handler, Request $request): JsonResponse
    {
        $builder = OrganView::query();

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new OrgansFilters($request->all()),
            builder: $builder,
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
