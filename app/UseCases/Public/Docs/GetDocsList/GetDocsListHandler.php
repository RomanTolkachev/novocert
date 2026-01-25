<?php

namespace App\UseCases\Public\Docs\GetDocsList;

use App\UseCases\Public\Docs\GetDocsList\shared\DocsFilters;
use Illuminate\Database\Eloquent\Builder;

class GetDocsListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        DocsFilters $filter,
        Builder $builder
    ): GetDocsListResource {
        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        return new GetDocsListResource($result);
    }
}
