<?php

namespace App\UseCases\Admin\Certs\GetCertsList;

use App\Models\DocumentView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UseCases\Admin\Certs\GetCertsList\shared\SystemsFilter;


class GetCertsListController
{
    public function __invoke(GetCertsListHandler $handler, Request $request): JsonResponse
    {
        $builder = DocumentView::query();

        // dd($builder->get()->toArray());

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new SystemsFilter($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}