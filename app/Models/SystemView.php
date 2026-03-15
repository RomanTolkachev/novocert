<?php

namespace App\Models;

use App\Models\Organ;
use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;

class SystemView extends Model
{
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
    ];

    protected $table = 'systems_view';

    public function organs()
    {
        return $this->hasMany(Organ::class, 'organ_reestr_system_', 'gid')
            ->where('id', '>', 1)
            ->where('tech_end', '2399-12-31');
    }

    /**
     * Одна запись системы для публичной детальной страницы (cert_systems/:id).
     * Данные уже в view (owner, status, counts) — without with().
     */
    public function scopeItem($query, string|int $identifier): void
    {
        $query->where(function ($q) use ($identifier) {
            $q->where('gid', $identifier)->orWhere('id', $identifier);
        });
    }
}
