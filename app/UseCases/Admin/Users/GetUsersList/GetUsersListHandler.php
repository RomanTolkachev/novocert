<?php

namespace App\UseCases\Admin\Users\GetUsersList;

use App\UseCases\Admin\Users\GetUsersList\shared\GetUsersListFilter;
use Illuminate\Database\Eloquent\Builder;

class GetUsersListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        GetUsersListFilter $filter,
        Builder $builder
    ): GetUsersListResource {

        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        $result->setCollection(
            collect($result->items())->customToFlat()
        );

        return new GetUsersListResource($result);
    }
}
