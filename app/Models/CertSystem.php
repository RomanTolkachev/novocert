<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class CertSystem extends Model
{
    // решения для кривого формата дат
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected function techBegin(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value) : null
        );
    }

    protected function techEnd(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Carbon::parse($value) : null
        );
    }

    public function getCertSystemNameAttribute(): string
    {
        return $this->attributes['name'];
    }

    protected $hidden = ['name'];

    protected $appends = ['cert_system_name'];

    protected $table = 'organ_reestr_system_';

    protected $guarded = [];

    const CREATED_AT = 'tech_create';

    const UPDATED_AT = 'tech_change';

    public function organs()
    {
        return $this->hasMany(Organ::class, 'organ_reestr_system_', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'organ_type_', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function cli_table()
    {
        return $this->hasOne(Cli::class, 'gid', 'cli')->latest();
    }

    public function cli_contact()
    {
        return $this->hasMany(CliContact::class, 'cli', 'cli');
    }

    public function cli_jur()
    {
        return $this->hasOne(CliJur::class, 'cli', 'cli')->latest();
    }

    public function cli_jur_position()
    {
        return $this->hasOne(CliJurPosition::class, 'cli', 'cli')->latest();
    }

    public function registrant_table()
    {
        return $this->hasOne(Cli::class, 'gid', 'registrant')->latest();
    }

    public function applicant_table()
    {
        return $this->hasOne(Cli::class, 'gid', 'applicant')->latest();
    }

    public function status()
    {
        return $this->hasOne(OrganStatus::class, 'gid', 'organ_status_');
    }

    public function scopeFilter($query, $params)
    {
        if (isset($params['name']) && trim($params['name'] !== '')) {
            $query->where('name', 'LIKE', '%'.trim($params['name']).'%');
        }
        if (isset($params['number']) && trim($params['number'] !== '')) {
            $query->where('number', 'LIKE', '%'.trim($params['number']).'%');
        }
        if (isset($params['accreditation']) && trim($params['accreditation'] !== '')) {
            $query->where('accreditation', 'LIKE', '%'.trim($params['accreditation']).'%');
        }
        if (isset($params['main_docum']) && trim($params['main_docum'] !== '')) {
            $query->where('main_docum', 'LIKE', '%'.trim($params['main_docum']).'%');
        }
        if (isset($params['ogrn']) && trim($params['ogrn'] !== '')) {
            $query->where('cli_ogrn', 'LIKE', '%'.trim($params['ogrn']).'%');
        }
        if (isset($params['address']) && trim($params['address'] !== '')) {
            $query->where('cli_address', 'LIKE', '%'.trim($params['address']).'%');
        }
        if (isset($params['status']) && trim($params['status'] !== '')) {
            $query->whereIn('organ_status_', $params['status']);
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
        // if ( isset($params['tel']) && trim($params['tel'] !== '') ) {
        //     $query->join('cli_contact', 'organ_reestr_system_.cli', '=', 'cli_contact.gid')->where('cli_contact.name', 'LIKE', '%' . trim($params['tel']) . '%');
        // }
        // if ( isset($params['email']) && trim($params['email'] !== '') ) {
        //     $query->join('cli_contact', 'organ_reestr_system_.cli', '=', 'cli_contact.gid')->where('cli_contact.name', 'LIKE', '%' . trim($params['email']) . '%');
        // }
        if (isset($params['ul_name']) && trim($params['ul_name'] !== '')) {
            $query->join('cli_jur', 'organ_reestr_system_.cli', '=', 'cli_jur.gid')->
            where('cli_jur.name', 'LIKE', '%'.trim($params['ul_name']).'%');
        }
    }
}
