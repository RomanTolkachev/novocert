<?php

namespace App\UseCases\Admin\Organs\GetOrgansList;

use App\Models\Organ;
use App\UseCases\Admin\Organs\GetOrgansList\shared\OrgansFilters;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetOrgansListController
{
    public function __invoke(GetOrgansListHandler $handler, Request $request): JsonResponse
    {
        $builder = Organ::where('id', '>', 1)
            ->select('gid', 'name as organ_name', "organ_reestr_system_", "organ_status_", "bus_begin", "bus_end", "identifier", "organ_accreditation_scope", "cli")
            ->withCount('certs')
            ->where('tech_end', '2399-12-31')
            ->orderBy('id', 'asc')
            ->with(['type:gid,name,img_path', 'status:gid,name', 'cli_table:gid,inn,ogrn,logo_path', "cli_jur:cli,short_name"]);

        $result = $handler->execute(
            page: (int) ($request->page ?? 1),
            itemsPerPage: (int) ($request->perPage ?? 10),
            filter: new OrgansFilters($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
