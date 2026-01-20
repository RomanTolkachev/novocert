<?php

namespace App\UseCases\Admin\Feedbacks\GetFeedbacksList;

use App\Models\Feedback;
use App\UseCases\Admin\Feedbacks\GetFeedbacksList\shared\FeedbacksFilters;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GetFeedbacksListController
{
    public function __invoke(GetFeedbacksListHandler $handler, Request $request): JsonResponse
    {
        $builder = Feedback::query()->forMainList();

        $result = $handler->execute(
            page: (int) ($request->page ?? 1),
            itemsPerPage: (int) ($request->perPage ?? 10),
            filter: new FeedbacksFilters($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}
