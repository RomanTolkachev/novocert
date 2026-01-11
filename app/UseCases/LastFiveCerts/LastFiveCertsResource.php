<?php

namespace App\UseCases\LastFiveCerts;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LastFiveCertsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $result = parent::toArray($request);

        # чистим не нужное
        $handled = $this->collection->map(function ($item) {
            return [
                "doc_date" => $item->bus_begin,
                "doc_number" => $item->docum_number,
                "doc_link" => $item->gid,
                "organ_name" => $item->organ_table->name,
                "organ_link" => $item->organ_table->gid,

            ];
        });

        return $result;
    }
}
