<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrganView extends Model
{
    protected $table = "organs_view";

    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin', 'bus_end'
    ];

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'organ', 'gid')
            ->where('docum.id', '>', 1)
            ->where('docum.tech_end', '2399-12-31');
    }

    /** Владелец органа (компания) отдельным ключом `owner`. */
    public function owner(): HasOne
    {
        return $this->hasOne(CompanyView::class, 'company_gid', 'cli')
            ->leftJoin('cli as owner_cli', function ($join) {
                $join->on('companies_view.company_gid', '=', 'owner_cli.gid');
            })
            ->select('companies_view.*')
            ->addSelect([
                'owner_cli.cli_status_ as cli_status_',
                'owner_cli.bus_begin as bus_begin',
            ]);
    }
}
