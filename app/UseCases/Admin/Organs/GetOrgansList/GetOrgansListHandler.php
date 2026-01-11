<?php

namespace App\UseCases\Admin\Organs\GetOrgansList;

use Illuminate\Database\Eloquent\Builder;
use App\UseCases\Admin\Organs\GetOrgansList\shared\SystemsFilter;

class GetOrgansListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        SystemsFilter $filter,
        Builder $builder
    ): GetOrgansListResource {

        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        $result->setCollection(
            collect($result->items())->customToFlat()
        );

        return new GetOrgansListResource($result);
    }
}