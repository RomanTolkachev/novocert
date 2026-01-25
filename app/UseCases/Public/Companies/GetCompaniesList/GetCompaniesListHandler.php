<?php

namespace App\UseCases\Public\Companies\GetCompaniesList;

use App\UseCases\Public\Companies\GetCompaniesList\shared\CompaniesFilters;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class GetCompaniesListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        CompaniesFilters $filter,
        Builder $builder
    ): LengthAwarePaginator {
        $query = $filter->apply($builder);

        /** @var LengthAwarePaginator $paginator */
        $paginator = $query->paginate($itemsPerPage, ['*'], 'page', $page);

        return $paginator;
    }
}
