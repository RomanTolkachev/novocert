<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Builder;

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

    /** Колонки cli_jur для детальной страницы (префикс owner__). */
    private const OWNER_JUR_COLUMNS = [
        'gid', 'short_name', 'full_name', 'name', 'kpp',
        'bus_begin', 'liquidation_date',
    ];

    /** Колонки cli_address для детальной страницы (префикс owner_address__). */
    private const OWNER_ADDRESS_COLUMNS = [
        'full_address', 'name',
    ];

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

    /**
     * Одна запись органа для публичной детальной страницы (organs/:id).
     */
    public function scopeItem(Builder $query, string|int $identifier): void
    {
        $query->where(function ($q) use ($identifier) {
            $q->where('organ.gid', $identifier)->orWhere('organ.id', $identifier);
        });
    }

    /**
     * Left join cli_jur по organ.cli, только нужные колонки с префиксом owner__.
     */
    public function scopeWithOwnerJur(Builder $query): void
    {
        $query->leftJoin('cli_jur', 'organ.cli', '=', 'cli_jur.gid')
            ->select('organ.*');

        foreach (self::OWNER_JUR_COLUMNS as $column) {
            $query->addSelect(\DB::raw("cli_jur.{$column} AS owner__{$column}"));
        }
    }

    /**
     * Left join cli_address (юр. адрес) по organ.cli, только full_address и name с префиксом owner_address__.
     */
    public function scopeWithOwnerAddress(Builder $query): void
    {
        $query->leftJoin('cli_address', function ($q) {
            $q->on('cli_address.cli', '=', 'organ.cli')
                ->where('cli_address.cli_address_type_', 'jur')
                ->where('cli_address.tech_end', '2399-12-31');
        });

        foreach (self::OWNER_ADDRESS_COLUMNS as $column) {
            $query->addSelect(\DB::raw("cli_address.{$column} AS owner_address__{$column}"));
        }
    }

    /**
     * Left join cli_jur_position и cli_jur_position_type_ (актуальная запись tech_end = 2399-12-31).
     * ФИО руководителя и должность для блока владельца.
     */
    public function scopeWithOwnerPosition(Builder $query): void
    {
        $query->leftJoin('cli_jur_position', function ($q) {
            $q->on('cli_jur_position.cli', '=', 'organ.cli')
                ->where('cli_jur_position.id', '>', 1)
                ->where('cli_jur_position.tech_end', '2399-12-31');
        })
            ->leftJoin('cli_jur_position_type_', function ($q) {
                $q->on('cli_jur_position_type_.gid', '=', 'cli_jur_position.cli_jur_position_type_')
                    ->where('cli_jur_position_type_.id', '>', 1)
                    ->where('cli_jur_position_type_.tech_end', '2399-12-31');
            })
            ->addSelect('cli_jur_position.name AS owner__head_name')
            ->addSelect('cli_jur_position_type_.name AS owner__head_position');
    }

    /**
     * Left join cli_okved (основной вид деятельности, is_main = 1, tech_end = 2399-12-31).
     */
    public function scopeWithOwnerOkved(Builder $query): void
    {
        $query->leftJoin('cli_okved', function ($q) {
            $q->on('cli_okved.cli', '=', 'organ.cli')
                ->where('cli_okved.id', '>', 1)
                ->where('cli_okved.tech_end', '2399-12-31')
                ->where('cli_okved.is_main', 1);
        })
            ->addSelect('cli_okved.code AS owner__okved_code')
            ->addSelect('cli_okved.name AS owner__okved_name');
    }
}
