<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class FeedbackView extends Model
{
    use HasCarbonDates;

    protected $table = 'feedbacks_view';

    protected $dateAttributes = [
        'fb_bus_begin',
        'fb_bus_end',
    ];

    public $timestamps = false;

    protected $guarded = [];

    /** Компания "от кого" (CompanyView) по ключу `from_gid` во view. */
    public function from(): HasOne
    {
        return $this->hasOne(CompanyView::class, 'company_gid', 'from_gid')
            ->leftJoin('cli as from_cli', function ($join) {
                $join->on('companies_view.company_gid', '=', 'from_cli.gid')
                    ->where('from_cli.id', '>', 1)
                    ->where('from_cli.tech_end', '2399-12-31');
            })
            ->select('companies_view.*')
            ->addSelect([
                'from_cli.cli_status_ as cli_status_',
                'from_cli.bus_begin as bus_begin',
                'from_cli.bus_end as bus_end',
                'from_cli.liquidation_date as liquidation_date',
            ]);
    }

    /** Компания "кому" (CompanyView) по ключу `to_gid` во view. */
    public function to(): HasOne
    {
        return $this->hasOne(CompanyView::class, 'company_gid', 'to_gid')
            ->leftJoin('cli as to_cli', function ($join) {
                $join->on('companies_view.company_gid', '=', 'to_cli.gid')
                    ->where('to_cli.id', '>', 1)
                    ->where('to_cli.tech_end', '2399-12-31');
            })
            ->select('companies_view.*')
            ->addSelect([
                'to_cli.cli_status_ as cli_status_',
                'to_cli.bus_begin as bus_begin',
                'to_cli.bus_end as bus_end',
                'to_cli.liquidation_date as liquidation_date',
            ]);
    }
}
