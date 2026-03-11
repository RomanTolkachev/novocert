<?php

namespace App\UseCases\Public\Systems\GetSystemsList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\Traits\FormatsDates;

class GetSystemsListResource extends JsonResource
{
    use FormatsDates;

    protected array $dateFields = [
        'bus_begin',
        'bus_end',
    ];

    public function __construct(
        $resource,
        private readonly ?array $totals = null
    ) {
        parent::__construct($resource);
    }

    public function toArray($request): array
    {
        if ($this->resource instanceof LengthAwarePaginator) {
            $p = $this->formatDatesOnPaginator($this->resource);

            $meta = [
                'current_page' => $p->currentPage(),
                'from' => $p->firstItem(),
                'last_page' => $p->lastPage(),
                'per_page' => $p->perPage(),
                'to' => $p->lastItem(),
                'total' => $p->total(),
            ];

            if ($this->totals !== null) {
                $meta['total_organs'] = $this->totals['total_organs'];
                $meta['total_documents'] = $this->totals['total_documents'];
            }

            return [
                'data' => $p->items(),
                'meta' => $meta,
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