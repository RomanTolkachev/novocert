<?php

namespace App\UseCases\Admin\Feedbacks\GetFeedbacksList;

use Illuminate\Database\Eloquent\Builder;
use App\UseCases\Admin\Feedbacks\GetFeedbacksList\shared\FeedbacksFilters;

class GetFeedbacksListHandler
{
    public function execute(
        int $page,
        int $itemsPerPage,
        FeedbacksFilters $filter,
        Builder $builder
    ): GetFeedbacksListResource {

        $result = $filter->apply($builder)
            ->paginate(
                perPage: $itemsPerPage,
                page: $page
            );

        $result->setCollection(
            collect($result->items())->customToFlat()
        );

        return new GetFeedbacksListResource($result);
    }
}