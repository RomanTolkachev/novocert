<?php

namespace App\UseCases\Public\Organs\GetOrgansList;

use App\UseCases\Public\Organs\GetOrgansList\shared\OrgansFilters;
use Illuminate\Database\Eloquent\Builder;

class GetOrgansListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        OrgansFilters $filter,
        Builder $builder,
    ): GetOrgansListResource {
        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page,
            );

        $result->setCollection(
            collect($result->items())->customToFlat(),
        );

        return new GetOrgansListResource($result);
    }
}
