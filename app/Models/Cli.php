<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;
use App\Models\Traits\HasQueryFilters;

class Cli extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates, HasQueryFilters;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "cli";
    protected $guarded = [];
    const CREATED_AT = 'tech_create';
    const UPDATED_AT = 'tech_change';

    public function cli_address() {
        return $this->hasMany(CliAddress::class, 'cli', 'gid')->where('tech_end', '2399-12-31');
    }

    public function cli_address_jur() {
        return $this->hasOne(CliAddress::class, 'cli', 'gid')->where('tech_end', '2399-12-31')->where('cli_address_type_','jur')->latest();
    }

    public function business_card() {
        return $this->hasOne(BusinessCard::class, 'cli', 'gid')->where('tech_end', '2399-12-31');
    }
    public function business_card_tax() {
        return $this->hasOne(BusinessCardTax::class, 'cli', 'gid')->where('tech_end', '2399-12-31')->latest();
    }
    public function business_card_acc() {
        return $this->hasOne(BusinessCardAcc::class, 'cli', 'gid')->where('tech_end', '2399-12-31')->latest();
    }

    public function cli_address_fact() {
        return $this->hasOne(CliAddress::class, 'cli', 'gid')->where('cli_address_type_','fact')->latest();
    }

    public function cli_address_type() {
        return $this->hasOne(CliAddressType::class, 'gid', 'gid')->latest();
    }

    public function cli_contact() {
        return $this->hasMany(CliContact::class, 'cli', 'gid')->where('tech_end', '2399-12-31');
    }

    public function cli_contact_type() {
        return $this->hasOne(CliContactType::class, 'gid', 'cli_type_')->latest();
    }

    public function cli_type() {
        return $this->hasOne(CliType::class, 'gid', 'cli_type_')->latest();
    }

    public function cli_jur() {
        return $this->hasOne(CliJur::class, 'gid', 'gid')->where('tech_end', '2399-12-31')->latest();
    }

    public function cli_phys() {
        return $this->hasOne(Cli_Phys::class, 'gid', 'gid')->where('tech_end', '2399-12-31')->latest();
    }

    public function cli_jur_position() {
        return $this->hasOne(CliJurPosition::class, 'cli', 'gid')->latest();
    }

    public function make_documents() {
        return $this->hasMany(Document::class, 'organ', 'gid')->where('tech_end', '2399-12-31');
    }

    public function get_documents() {
        return $this->hasMany(Document::class, 'applicant', 'gid')->where('tech_end', '2399-12-31');
    }

    public function get_sds() {
        return $this->hasMany(Sds::class, 'applicant', 'gid')->where('tech_end', '2399-12-31');
    }

    public function make_sds() {
        return $this->hasMany(Sds::class, 'registrant', 'gid')->where('tech_end', '2399-12-31');
    }

    public function make_svidetelstva() {
        return $this->hasMany(Sds::class, 'registrant', 'gid')->where('tech_end', '2399-12-31');
    }

    public function get_system() {
        return $this->hasMany(CertSystem::class, 'applicant', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }
    public function make_system() {
        return $this->hasMany(CertSystem::class, 'registrant', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function get_organ()
    {
        return $this->hasMany(Organ::class, 'cli', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function get_feedback()
    {
        return $this->hasMany(Feedback::class, 'cli_to', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function make_feedback()
    {
        return $this->hasMany(Feedback::class, 'cli_from', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function make_organ()
    {
        return $this->hasMany(Organ::class, 'cli', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function systems()
    {
        return $this->hasMany(CertSystem::class, 'cli', 'gid')->where('tech_end', '2399-12-31');
    }

    public function organ()
    {
        return $this->hasMany(Organ::class, 'cli', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function okved()
    {
        //return $this->hasOne(CliOkved::class, 'cli', 'gid')->latest();
        return $this->hasMany(CliOkved::class, 'cli', 'gid')->where('id', '>', 1)->where('is_main', '!=', 1)->where('tech_end', '2399-12-31');
    }

    public function main_okved()
    {
        return $this->hasOne(CliOkved::class, 'cli', 'gid')->where('is_main', 1)->where('tech_end', '2399-12-31')->latest();
        //return $this->hasMany(CliOkved::class, 'cli', 'gid')->where('id', '>', 1)->where('tech_end', '2399-12-31');
    }

    public function status() {
        return $this->hasOne(OrganStatus::class, 'gid', 'cli_status_');
    }

    public function bank() {
        return $this->hasOne(Bank::class, 'cli', 'gid')->where('tech_end', '2399-12-31')->latest();
    }

    public function scopeFilter($query, $params){
        if ( isset($params['name']) && trim($params['name'] !== '') ) {
            $query->where('cli.name', 'LIKE', '%' . trim($params['name']) . '%');
        }
        if ( isset($params['inn']) && trim($params['inn'] !== '') ) {
            $query->where('cli.inn', 'LIKE', '%' . trim($params['inn']) . '%');
        }
        if ( isset($params['ogrn']) && trim($params['ogrn'] !== '') ) {
            $query->where('cli.ogrn', 'LIKE', '%' . trim($params['ogrn']) . '%');
        }

        if ( isset($params['status']) && trim($params['status'] !== '') ) {
            $query->whereIn('cli_status_', $params['status']);
        }

        if ( isset($params['headname']) && trim($params['headname'] !== '') ) {
            $query->join('cli_jur_position', 'cli.gid', '=', 'cli_jur_position.gid')->where('cli_jur_position.name', 'LIKE', '%' . trim($params['headname']) . '%');
        }
        if ( isset($params['type']) && trim($params['type'] !== '') ) {
            $query->where('cli.cli_type_', 'LIKE', '%' . trim($params['type']) . '%');
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
