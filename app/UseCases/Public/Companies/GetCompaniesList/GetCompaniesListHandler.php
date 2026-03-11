<?php

namespace App\UseCases\Public\Companies\GetCompaniesList;

use App\UseCases\Public\Companies\GetCompaniesList\shared\CompaniesFilters;
use Illuminate\Database\Eloquent\Builder;

class GetCompaniesListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        CompaniesFilters $filter,
        Builder $builder
    ): GetCompaniesListResource {
        $paginator = $filter->apply($builder)
            ->paginate($itemsPerPage, ['*'], 'page', $page);

        return new GetCompaniesListResource($paginator);
    }
}
