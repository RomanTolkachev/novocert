<?php

namespace App\UseCases\Admin\Systems\GetSystemsList;

use Illuminate\Database\Eloquent\Builder;
use App\UseCases\Admin\Systems\GetSystemsList\shared\SystemsFilter;

class GetSystemsListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        SystemsFilter $filter,
        Builder $builder
    ): GetSystemsListResource {

        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        $result->setCollection(
            collect($result->items())->customToFlat()
        );

        return new GetSystemsListResource($result);
    }
}