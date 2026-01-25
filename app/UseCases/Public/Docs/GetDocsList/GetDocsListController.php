<?php

namespace App\UseCases\Public\Docs\GetDocsList;

use App\Models\FeedbackView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UseCases\Public\Docs\GetDocsList\shared\DocsFilters;

class GetDocsListController
{
    public function __invoke(GetDocsListHandler $handler, Request $request): JsonResponse
    {
        $builder = FeedbackView::query();

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new DocsFilters($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
