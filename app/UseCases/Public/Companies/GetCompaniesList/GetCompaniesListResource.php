<?php

namespace App\UseCases\Public\Companies\GetCompaniesList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class GetCompaniesListResource extends JsonResource
{
    public function toArray($request): array
    {
        if ($this->resource instanceof LengthAwarePaginator) {
            $p = $this->resource;

            return [
                'data' => $p->items(),
                'meta' => [
                    'current_page' => $p->currentPage(),
                    'from'        => $p->firstItem(),
                    'last_page'   => $p->lastPage(),
                    'per_page'    => $p->perPage(),
                    'to'          => $p->lastItem(),
                    'total'       => $p->total(),
                ],
                'links' => [
                    'first' => $p->url(1),
                    'last'  => $p->url($p->lastPage()),
                    'prev'  => $p->previousPageUrl(),
                    'next'  => $p->nextPageUrl(),
                ],
            ];
        }

        return is_array($this->resource) ? $this->resource : (array) $this->resource;
    }
}
