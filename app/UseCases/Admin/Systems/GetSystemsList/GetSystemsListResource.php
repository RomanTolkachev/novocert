<?php

namespace App\UseCases\Admin\Systems\GetSystemsList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class GetSystemsListResource extends JsonResource
{
    public function toArray($request): array
    {
        if ($this->resource instanceof LengthAwarePaginator) {
            $p = $this->resource;

            return [
                'data' => $p->items(),
                'current_page' => $p->currentPage(),
                'from' => $p->firstItem(),
                'last_page' => $p->lastPage(),
                'per_page' => $p->perPage(),
                'to' => $p->lastItem(),
                'total' => $p->total(),
            ];
        }

        return is_array($this->resource) ? $this->resource : (array) $this->resource;
    }
}
