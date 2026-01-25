<?php

namespace App\UseCases\Public\Certs\GetCertsList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\Traits\FormatsDates;

class GetCertsListResource extends JsonResource
{
    use FormatsDates;

    protected array $dateFields = [
        'cert__bus_begin',
    ];

    public function toArray($request): array
    {
        if ($this->resource instanceof LengthAwarePaginator) {
            $p = $this->formatDatesOnPaginator($this->resource);

            return [
                'data' => $p->items(),
                'meta' => [
                    'current_page' => $p->currentPage(),
                    'from' => $p->firstItem(),
                    'last_page' => $p->lastPage(),
                    'per_page' => $p->perPage(),
                    'to' => $p->lastItem(),
                    'total' => $p->total(),
                ],
                'links' => [
                    'first' => $p->url(1),
                    'last' => $p->url($p->lastPage()),
                    'prev' => $p->previousPageUrl(),
                    'next' => $p->nextPageUrl(),
                ],
            ];
        }

        $row = is_array($this->resource) ? $this->resource : (array) $this->resource;

        return $this->formatDatesOnArray($row);
    }
}