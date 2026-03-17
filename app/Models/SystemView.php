<?php

namespace App\Models;

use App\Models\Organ;
use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function owner(): HasOne
    {
        return $this->hasOne(CompanyView::class, 'company_gid', 'owner__gid')
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
