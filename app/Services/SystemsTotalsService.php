<?php

namespace App\Services;

use App\Models\SystemView;
use Illuminate\Support\Facades\Cache;

class SystemsTotalsService
{
    private const CACHE_KEY = 'systems_totals';

    private const CACHE_TTL_SECONDS = 1800; // 30 minutes

    public function get(): array
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL_SECONDS, function (): array {
            $row = SystemView::query()
                ->selectRaw('COALESCE(SUM(organs_count), 0) as total_organs, COALESCE(SUM(documents_count), 0) as total_documents')
                ->first();

            return [
                'total_organs' => (int) ($row->total_organs ?? 0),
                'total_documents' => (int) ($row->total_documents ?? 0),
            ];
        });
    }
}
