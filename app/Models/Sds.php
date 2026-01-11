<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;


class Sds extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "docum2_sds";
    const CREATED_AT = 'tech_create';

    public function registrant_table() {
        return $this->hasOne(Cli::class, 'gid', 'registrant')->latest();
    }

    public function applicant_table() {
        return $this->hasOne(Cli::class, 'gid', 'applicant')->latest();
    }

    public function system() {
        return $this->hasOne(CertSystem::class, 'gid', 'organ_type_')->latest();
    }

    public function docType() {
        return $this->hasOne(DocumentType::class, 'gid', 'docum_type_')->latest();
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
            $query->join('organ_reestr_system_', 'docum.organ_type_', '=', 'organ_reestr_system_.gid')->where('organ_reestr_system_.name', 'LIKE', '%' . trim($params['system']) . '%')->where('organ_status_', 'A');
        }

        if ( isset($params['osregnum']) && trim($params['osregnum'] !== '') ) {
            $query->join('organ', 'docum.organ', '=', 'organ.gid')->where('organ.identifier', 'LIKE', '%' . trim($params['osregnum']) . '%');
        }

        if ( isset($params['aplicantname']) && trim($params['aplicantname'] !== '') ) {
            $query->join('cli', 'docum.applicant', '=', 'cli.gid')->where('cli.name', 'LIKE', '%' . trim($params['aplicantname']) . '%');
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
