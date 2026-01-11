<?php

namespace App\UseCases\LastFiveCerts;

use App\Models\Document;

class LastFiveCertsController
{
    public function __invoke()
    {
        $top5Raw = Document::query()
            ->with(['organ_table', 'cli_table', 'system'])
            ->where('tech_end', '2399-12-31')
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();

            dd($top5Raw);
    }
}
