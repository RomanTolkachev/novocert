<?php

namespace App\UseCases\Public\Systems\GetSystemsList;

use App\Services\SystemsTotalsService;
use Illuminate\Database\Eloquent\Builder;
use App\UseCases\Public\Systems\GetSystemsList\shared\SystemsFilters;

class GetSystemsListHandler
{
    public function __construct(
        private readonly SystemsTotalsService $totalsService
    ) {
    }

    public function execute(
        int $page,
        int $itemsPerPage,
        SystemsFilters $filter,
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

        $totals = $this->totalsService->get();

        return new GetSystemsListResource($result, $totals);
    }
}