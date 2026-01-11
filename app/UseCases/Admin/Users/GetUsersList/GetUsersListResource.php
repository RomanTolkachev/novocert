<?php

namespace App\UseCases\Admin\Users\GetUsersList;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

class GetUsersListResource extends JsonResource
{
    public function toArray($request): array
    {
        // Если ресурс — пагинатор, возвращаем стандартную структуру
        if ($this->resource instanceof LengthAwarePaginator) {
            $p = $this->resource;

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

        // Иначе приводим ресурс к массиву как есть
        return is_array($this->resource) ? $this->resource : (array) $this->resource;
    }
}