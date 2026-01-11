<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Feedback extends Model
{
    // решения для кривого формата дат
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = 'docum3_feedback';

    const CREATED_AT = 'tech_create';

    const UPDATED_AT = 'tech_change';

    public function scopeForMainList($query)
    {
        return $query
            ->where('id', '>', 1)
            ->select([
                'name', 'gid', 'docum_status_', 'docum_type_', 'cli_from', 'cli_to', "bus_begin"
            ])
            ->with([
                'to:gid,ogrn,inn,img_path',
                'from:gid,ogrn,inn,img_path',
                'toJur' => function ($q) {
                    $q->select('cli_jur.gid', 'cli_jur.short_name');
                },
                'fromJur' => function ($q) {
                    $q->select('cli_jur.gid', 'cli_jur.short_name');
                },
            ])
            ->where('docum3_feedback.tech_end', '2399-12-31')
            ->where('docum_type_', 'f')
            ->orderBy('id', 'asc');
    }

    public function from()
    {
        return $this->hasOne(Cli::class, 'gid', 'cli_from')->latest();
    }

    public function fromJur(): HasOneThrough
    {
        return $this->HasOneThrough(CliJur::class, Cli::class, 'gid', 'gid', 'cli_from', 'gid')->latest('cli.tech_create');
    }

    public function toJur(): HasOneThrough
    {
        return $this->HasOneThrough(CliJur::class, Cli::class, 'gid', 'gid', 'cli_to', 'gid')->latest('cli.tech_create');
    }

    public function to()
    {
        return $this->hasOne(Cli::class, 'gid', 'cli_to')->latest();
    }

    public function status()
    {
        return $this->hasOne(OrganStatus::class, 'gid', 'docum_status_');
    }

    public function type()
    {
        return $this->hasOne(DocumentType::class, 'gid', 'docum_type_');
    }

    public function scopeFilter($query, $params)
    {
        if (isset($params['name']) && trim($params['name'] !== '')) {
            $query->where('name', 'LIKE', '%'.trim($params['name']).'%');
        }

        if (isset($params['status']) && trim($params['status'] !== '')) {
            $query->whereIn('docum_status_', $params['status']);
        }

        if (isset($params['type']) && trim($params['type'] !== '')) {
            $query->where('docum_type_', 'LIKE', '%'.trim($params['type']).'%');
        }

        if (isset($params['number']) && trim($params['number'] !== '')) {
            $query->where('doc_reg_num', 'LIKE', '%'.trim($params['number']).'%');
        }

        if (isset($params['cli_from']) && trim($params['cli_from'] !== '')) {
            $query->WhereHas('from', fn ($query) => $query->where('name', 'LIKE', '%'.trim($params['cli_from']).'%'))
                ->orWhereHas('from', fn ($query) => $query->where('inn', 'LIKE', '%'.trim($params['cli_from']).'%'))
                ->orWhereHas('from', fn ($query) => $query->where('ogrn', 'LIKE', '%'.trim($params['cli_from']).'%'));
        }

        if (isset($params['cli_to']) && trim($params['cli_to'] !== '')) {
            $query->WhereHas('to', fn ($query) => $query->where('name', 'LIKE', '%'.trim($params['cli_to']).'%'))
                ->orWhereHas('to', fn ($query) => $query->where('inn', 'LIKE', '%'.trim($params['cli_to']).'%'))
                ->orWhereHas('to', fn ($query) => $query->where('ogrn', 'LIKE', '%'.trim($params['cli_to']).'%'));
        }

        if (isset($params['registrationDateFrom']) && trim($params['registrationDateFrom'] !== '')) {
            $date = date('Y-m-d', strtotime(($params['registrationDateFrom'])));
            $query->where('bus_begin', '>=', $date);
        }
        if (isset($params['registrationDateTo']) && trim($params['registrationDateTo'] !== '')) {
            $date = date('Y-m-d', strtotime(($params['registrationDateTo'])));
            $query->where('bus_begin', '<=', $date);
        }
        if (isset($params['registrationDateEndFrom']) && trim($params['registrationDateEndFrom'] !== '')) {
            $date = date('Y-m-d', strtotime(($params['registrationDateEndFrom'])));
            $query->where('bus_end', '>=', $date);
        }
        if (isset($params['registrationDateEndTo']) && trim($params['registrationDateEndTo'] !== '')) {
            $date = date('Y-m-d', strtotime(($params['registrationDateEndTo'])));
            $query->where('bus_end', '<=', $date);
        }
    }
}
