<?php

namespace App\UseCases\Public\Docs\GetDoc;

use App\Models\FeedbackView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetDocController
{
    public function __invoke(GetDocRequest $request): JsonResponse
    {
        $identifier = $request->validated('id');

        /** @var FeedbackView|null $doc */
        $doc = FeedbackView::query()
            ->where('feedbacks_view.fb_gid', $identifier)
            ->with(['from', 'to'])
            ->first();

        if ($doc === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            // только атрибуты feedbacks_view, без вложенных связей
            'doc' => $doc->getAttributes(),
            'from' => $doc->from,
            'to' => $doc->to,
        ], Response::HTTP_OK);
    }
}

