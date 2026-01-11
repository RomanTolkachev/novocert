<?php

namespace App\UseCases\Admin\Companies\GetCompaniesList;

use App\UseCases\Admin\Companies\GetCompaniesList\shared\GetCompaniesListFilter;
use Illuminate\Database\Eloquent\Builder;

class GetCompaniesListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        GetCompaniesListFilter $filter,
        Builder $builder
    ): GetCompaniesListResource {

        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        $result->setCollection(
            collect($result->items())
                ->customToFlat()
                ->map(function ($item) {
                    $item['deletable'] = true;
                    $item['editable'] = true;
                    $item['hasBusinessCard'] = true;

                    return $item;
                })
        );

        return new GetCompaniesListResource($result);
    }
}
