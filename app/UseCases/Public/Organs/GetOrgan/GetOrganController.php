<?php

namespace App\UseCases\Public\Organs\GetOrgan;

use App\Models\OrganView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetOrganController
{
    public function __invoke(GetOrganRequest $request): JsonResponse
    {
        $organ = OrganView::where("organs_view.gid", $request->validated('id'))
            ->with(['documents', 'owner'])
            ->first();

        if ($organ === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($organ->toArray(), Response::HTTP_OK);
    }
}

