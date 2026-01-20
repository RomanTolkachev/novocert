<?php

namespace App\UseCases\Admin\Certs\GetCertsList;

use Illuminate\Database\Eloquent\Builder;
use App\UseCases\Admin\Certs\GetCertsList\shared\CertsFilters;

class GetCertsListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        CertsFilters $filter,
        Builder $builder
    ): GetCertsListResource {

        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        $result->setCollection(
            collect($result->items())->customToFlat()
        );

        return new GetCertsListResource($result);
    }
}