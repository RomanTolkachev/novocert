<?php

namespace App\UseCases\Admin\Systems\GetSystemsList;

use App\Models\CertSystem;
use App\UseCases\Admin\Systems\GetSystemsList\shared\SystemsFilter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetSystemsListController
{
    public function __invoke(GetSystemsListHandler $handler, Request $request): JsonResponse
    {
        $builder = CertSystem::where('id', '>', 1)
            ->select(['gid', 'name', 'number as cert_number', 'accreditation', 'bus_begin', 'bus_end', 'img_path', "cli_name", "organ_status_", "docum_web_reference"])
            ->withCount('organs')
            ->withCount('documents')
            ->with(['status:gid,name'])
            ->where('tech_end', '2399-12-31')
            ->orderBy('id', 'desc');

        $result = $handler->execute(
            page: (int) ($request->page ?? 1),
            itemsPerPage: (int) ($request->perPage ?? 10),
            filter: new SystemsFilter($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
