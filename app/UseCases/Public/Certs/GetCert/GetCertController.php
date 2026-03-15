<?php

namespace App\UseCases\Public\Certs\GetCert;

use App\Models\SystemView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetCertController
{
    public function __invoke(GetCertRequest $request): JsonResponse
    {
        $system = SystemView::item($request->validated('id'))->first();

        if ($system === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($system->toArray(), Response::HTTP_OK);
    }
}
