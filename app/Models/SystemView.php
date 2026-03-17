<?php

namespace App\Models;

use App\Models\Organ;
use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class SystemView extends Model
{
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
    ];

    protected $table = 'systems_view';

    /** Колонки cli_jur для детальной страницы (префикс owner__). inn, ogrn, logo_path — из cli (уже в view). */
    private const OWNER_JUR_COLUMNS = [
        'gid', 'short_name', 'full_name', 'name', 'kpp',
        'bus_begin', 'liquidation_date',
    ];

    /** Колонки cli_address для детальной страницы (префикс owner_address__). */
    private const OWNER_ADDRESS_COLUMNS = [
        'full_address', 'name',
    ];

    public function organs()
    {
        return $this->hasMany(Organ::class, 'organ_reestr_system_', 'gid')
            ->where('id', '>', 1)
            ->where('tech_end', '2399-12-31');
    }

    /**
     * Одна запись системы для публичной детальной страницы (cert_systems/:id).
     */
    public function scopeItem(Builder $query, string|int $identifier): void
    {
        $query->where(function ($q) use ($identifier) {
            $q->where('systems_view.gid', $identifier)->orWhere('systems_view.id', $identifier);
        });
    }

    /**
     * Left join cli_jur по owner__gid, только нужные колонки с префиксом owner__.
     */
    public function scopeWithOwnerJur(Builder $query): void
    {
        $query->leftJoin('cli_jur', 'systems_view.owner__gid', '=', 'cli_jur.gid')
            ->select('systems_view.*');

        foreach (self::OWNER_JUR_COLUMNS as $column) {
            $query->addSelect(\DB::raw("cli_jur.{$column} AS owner__{$column}"));
        }
    }

    /**
     * Left join cli_address (юр. адрес) по owner__gid, только full_address и name с префиксом owner_address__.
     */
    public function scopeWithOwnerAddress(Builder $query): void
    {
        $query->leftJoin('cli_address', function ($q) {
            $q->on('cli_address.cli', '=', 'systems_view.owner__gid')
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
            $q->on('cli_jur_position.cli', '=', 'systems_view.owner__gid')
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
     * Как в Companies view: code и name для блока «Код основного вида деятельности».
     */
    public function scopeWithOwnerOkved(Builder $query): void
    {
        $query->leftJoin('cli_okved', function ($q) {
            $q->on('cli_okved.cli', '=', 'systems_view.owner__gid')
                ->where('cli_okved.id', '>', 1)
                ->where('cli_okved.tech_end', '2399-12-31')
                ->where('cli_okved.is_main', 1);
        })
            ->addSelect('cli_okved.code AS owner__okved_code')
            ->addSelect('cli_okved.name AS owner__okved_name');
    }
}
