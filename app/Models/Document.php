<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class Document extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "docum";
    const CREATED_AT = 'tech_create';
    const UPDATED_AT = 'tech_change';

    public function organ_table() {
        return $this->hasOne(Organ::class, 'gid', 'organ')->where('tech_end','2399-12-31')->latest();
    }

    public function cli_table() {
        return $this->hasOne(Cli::class, 'gid', 'applicant')->where('tech_end','2399-12-31')->latest();
    }
    public function manufacturer_table() {
        return $this->hasOne(Cli::class, 'gid', 'manufacturer')->where('tech_end','2399-12-31')->latest();
    }
    public function applicant_table() {
        return $this->hasOne(Cli::class, 'gid', 'applicant')->where('tech_end','2399-12-31')->latest();
    }
    public function document_type () {
        return $this->hasOne(Cli::class, 'gid', 'applicant')->where('tech_end','2399-12-31')->latest();
    }

    public function system() {
        return $this->hasOne(CertSystem::class, 'gid', 'organ_type_')->where('tech_end','2399-12-31')->latest();
    }

    public function status() {
        return $this->hasOne(OrganStatus::class, 'gid', 'docum_status_');
    }

    public function scopeFilter($query, $params)
    {
        if ( isset($params['name']) && trim($params['name'] !== '') ) {
            $query->where('name', 'LIKE', '%' . trim($params['name']) . '%');
        }

        if ( isset($params['status']) && trim($params['status'] !== '') ) {
            $query->whereIn('docum_status_', $params['status']);
        }

        if ( isset($params['standart']) && trim($params['standart'] !== '') ) {
            $query->where('standart', 'LIKE', '%' . trim($params['standart']) . '%');
        }

        if ( isset($params['ssnumber']) && trim($params['ssnumber'] !== '') ) {
            $query->where('docum_number', 'LIKE', '%' . trim($params['ssnumber']) . '%');
        }

        if ( isset($params['accreditation']) && trim($params['accreditation'] !== '') ) {
            $query->where('docum_accreditation_scope', 'LIKE', '%' . trim($params['accreditation']) . '%');
        }

        if ( isset($params['system']) && trim($params['system'] !== '') ) {
            $query->join('organ_reestr_system_', 'docum.organ_type_', '=', 'organ_reestr_system_.gid')
            ->where('organ_reestr_system_.name', 'LIKE', '%' . trim($params['system']) . '%')
            ->where('organ_reestr_system_.tech_end', '2399-12-31');
        }

        if ( isset($params['osregnum']) && trim($params['osregnum'] !== '') ) {
            $query->join('organ', 'docum.organ', '=', 'organ.gid')
            ->where('organ.identifier', 'LIKE', '%' . trim($params['osregnum']) . '%');
        }

        if ( isset($params['aplicantname']) && trim($params['aplicantname'] !== '') ) {
            $query->join('cli', 'docum.applicant', '=', 'cli.gid')
            ->where('cli.name', 'LIKE', '%' . trim($params['aplicantname']) . '%')
            ->where('cli.tech_end', '2399-12-31');
        }
        if ( isset($params['ogrn']) && trim($params['ogrn'] !== '') ) {
            $query->join('cli', 'docum.applicant', '=', 'cli.gid')->where('cli.ogrn', 'LIKE', '%' . trim($params['ogrn']) . '%');
        }
        if ( isset($params['inn']) && trim($params['inn'] !== '') ) {
            $query->join('cli', 'docum.applicant', '=', 'cli.gid')->where('cli.inn', 'LIKE', '%' . trim($params['inn']) . '%');
        }

        if ( isset($params['registrationDateFrom']) && trim($params['registrationDateFrom'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateFrom'])));
            $query->where('bus_begin', '>=', $date);
        }
        if ( isset($params['registrationDateTo']) && trim($params['registrationDateTo'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateTo'])));
            $query->where('bus_begin', '<=', $date);
        }
        if ( isset($params['registrationDateEndFrom']) && trim($params['registrationDateEndFrom'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateEndFrom'])));
            $query->where('bus_end', '>=', $date);
        }
        if ( isset($params['registrationDateEndTo']) && trim($params['registrationDateEndTo'] !== '') ) {
            $date = date('Y-m-d', strtotime(($params['registrationDateEndTo'])));
            $query->where('bus_end', '<=', $date);
        }
    }
}
