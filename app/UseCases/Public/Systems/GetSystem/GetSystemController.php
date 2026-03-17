<?php

namespace App\UseCases\Public\Systems\GetSystem;

use App\Models\SystemView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetSystemController
{
    public function __invoke(GetSystemRequest $request): JsonResponse
    {
        $system = SystemView::item($request->validated('id'))
            ->withOwnerJur()
            ->withOwnerAddress()
            ->withOwnerPosition()
            ->withOwnerOkved()
            ->with('organs')
            ->first();

        if ($system === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($system->toArray(), Response::HTTP_OK);
    }
}
