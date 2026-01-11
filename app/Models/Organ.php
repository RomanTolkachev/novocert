<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Organ extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'organ_cert_begin_date',
        'organ_cert_end_date',
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "organ";
    const CREATED_AT = 'tech_create';
    const UPDATED_AT = 'tech_change';

    public function cli_jur(): HasOneThrough {
        return $this->hasOneThrough(CliJur::class, Cli::class, "gid", "gid", "cli", "gid");
    }

    public function region() {
        return $this->hasOne(OrganRegion::class, 'gid', 'organ_region');
    }

    public function type() {
        return $this->hasOne(CertSystem::class, 'gid', 'organ_reestr_system_')->latest();
    }

    public function status() {
        return $this->hasOne(OrganStatus::class, 'gid', 'organ_status_');
    }
    public function certStatus() {
        return $this->hasOne(OrganStatus::class, 'gid', 'organ_cert_status_');
    }

    public function cli_table() {
        return $this->hasOne(Cli::class, 'gid', 'cli')->latest();
    }
    public function system_table() {
        return $this->hasOne(CertSystem::class, 'gid', 'organ_reestr_system_')->latest();
    }

    public function cli_address() {
        return $this->hasMany(CliAddress::class, 'gid', 'cli');
    }
    public function cli_contact() {
        return $this->hasMany(CliContact::class, 'cli', 'cli');
    }
    public function certs() {
        return $this->hasMany(Document::class, 'organ', 'gid');
    }

    public function scopeFilter($query, $params){
        if ( isset($params['name']) && trim($params['name'] !== '') ) {
            $query->join('cli', 'organ.cli', '=', 'cli.gid')->where('cli.name', 'LIKE', '%' . trim($params['name']) . '%');
        }
        if ( isset($params['system']) && trim($params['system'] !== '') ) {
            $query->where('organ_reestr_system_', 'LIKE', '%' . trim($params['system']) . '%');
        }
        if ( isset($params['number']) && trim($params['number'] !== '') ) {
            $query->where('identifier', 'LIKE', '%' . trim($params['number']) . '%');
        }
        if ( isset($params['accreditation']) && trim($params['accreditation'] !== '') ) {
            $query->where('organ_accreditation_scope', 'LIKE', '%' . trim($params['accreditation']) . '%');
        }
        if ( isset($params['status']) && trim($params['status'] !== '') ) {
            $query->whereIn('organ_status_', $params['status']);
        }

        if ( isset($params['ogrn']) && trim($params['ogrn'] !== '') ) {
            $query->join('cli', 'organ.cli', '=', 'cli.gid')->where('cli.ogrn', 'LIKE', '%' . trim($params['ogrn']) . '%');
        }
        if ( isset($params['inn']) && trim($params['inn'] !== '') ) {
            $query->join('cli', 'organ.cli', '=', 'cli.gid')->where('cli.inn', 'LIKE', '%' . trim($params['inn']) . '%');
        }

        if ( isset($params['registrationDateFrom']) && trim($params['registrationDateFrom'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateFrom'])));
            $query->where('organ_cert_begin_date', '>=', $date);
        }
        if ( isset($params['registrationDateTo']) && trim($params['registrationDateTo'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateTo'])));
            $query->where('organ_cert_begin_date', '<=', $date);
        }
        if ( isset($params['registrationDateEndFrom']) && trim($params['registrationDateEndFrom'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateEndFrom'])));
            $query->where('organ_cert_end_date', '>=', $date);
        }
        if ( isset($params['registrationDateEndTo']) && trim($params['registrationDateEndTo'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateEndTo'])));
            $query->where('organ_cert_end_date', '<=', $date);
        }
    }
}
