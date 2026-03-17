<?php

namespace App\UseCases\Public\Systems\GetSystem;

use App\Models\SystemView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetSystemController
{
    public function __invoke(GetSystemRequest $request): JsonResponse
    {
        $system = SystemView::query()
            ->where('systems_view.id', $request->validated('id'))
            ->with(['organs', 'owner'])
            ->first();

        if ($system === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($system->toArray(), Response::HTTP_OK);
    }
}
