<?php

namespace App\UseCases\LastFiveCerts;

use App\Models\DocumentView;

class LastFiveCertsController
{
    public function __invoke()
    {
        $certs = DocumentView::query()
            ->orderByDesc('cert__bus_begin')
            ->limit(5)
            ->get();

        return LastFiveCertsResource::collection($certs);
    }
}
