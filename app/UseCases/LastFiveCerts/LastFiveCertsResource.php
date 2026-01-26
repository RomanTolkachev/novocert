<?php

namespace App\UseCases\LastFiveCerts;

use App\Http\Resources\Traits\FormatsDates;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LastFiveCertsResource extends JsonResource
{
    use FormatsDates;

    /**
     * Поля-даты, которые нужно отформатировать в ответе.
     */
    protected array $dateFields = [
        'cert__bus_begin',
    ];

    public function toArray(Request $request): array
    {
        $row = $this->resource instanceof Arrayable
            ? $this->resource->toArray()
            : (array) $this->resource;

        return $this->formatDatesOnArray($row);
    }
}
