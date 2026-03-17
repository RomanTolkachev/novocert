<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OrganView extends Model
{
    protected $table = "organs_view";

    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin', 'bus_end'
    ];

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'organ', 'gid')
            ->where('docum.id', '>', 1)
            ->where('docum.tech_end', '2399-12-31');
    }

    /** Колонки cli_jur для детальной страницы (префикс owner__). */
    private const OWNER_JUR_COLUMNS = [
        'gid', 'short_name', 'full_name', 'name', 'kpp',
        'bus_begin', 'liquidation_date',
    ];

    /** Колонки cli_address для детальной страницы (префикс owner_address__). */
    private const OWNER_ADDRESS_COLUMNS = [
        'full_address', 'name',
    ];

    /**
     * Статус владельца (cli.cli_status_) + расшифровка.
     * В ответе: owner_status__gid, owner_status__name.
     */
    public function scopeWithOwnerStatus(Builder $query): void
    {
        $query->leftJoin('cli as owner_cli', 'organs_view.cli', '=', 'owner_cli.gid')
            ->leftJoin('organ_status_ as owner_status', function ($join) {
                // MSSQL: у полей могут быть разные collations (Cyrillic_General_CI_AS vs SQL_Latin1_General_CP1_CI_AS)
                // Приводим к одной, чтобы join по статусу не падал.
                $join->on(\DB::raw('owner_cli.cli_status_ COLLATE SQL_Latin1_General_CP1_CI_AS'), '=', 'owner_status.gid');
            })
            ->addSelect('owner_cli.cli_status_ as owner_status__gid')
            ->addSelect('owner_status.name as owner_status__name');
    }

    /**
     * Left join cli_jur по organs_view.cli, только нужные колонки с префиксом owner__.
     */
    public function scopeWithOwnerJur(Builder $query): void
    {
        $query->leftJoin('cli_jur', 'organs_view.cli', '=', 'cli_jur.gid')
            ->select('organs_view.*');

        foreach (self::OWNER_JUR_COLUMNS as $column) {
            $query->addSelect(\DB::raw("cli_jur.{$column} AS owner__{$column}"));
        }
    }

    /**
     * Left join cli_address (юр. адрес) по organs_view.cli, только full_address и name с префиксом owner_address__.
     */
    public function scopeWithOwnerAddress(Builder $query): void
    {
        $query->leftJoin('cli_address', function ($q) {
            $q->on('cli_address.cli', '=', 'organs_view.cli')
                ->where('cli_address.cli_address_type_', 'jur')
                ->where('cli_address.tech_end', '2399-12-31');
        });

        foreach (self::OWNER_ADDRESS_COLUMNS as $column) {
            $query->addSelect(\DB::raw("cli_address.{$column} AS owner_address__{$column}"));
        }
    }

    /**
     * Left join cli_jur_position и cli_jur_position_type_ (актуальная запись tech_end = 2399-12-31).
     */
    public function scopeWithOwnerPosition(Builder $query): void
    {
        $query->leftJoin('cli_jur_position', function ($q) {
            $q->on('cli_jur_position.cli', '=', 'organs_view.cli')
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
            $q->on('cli_okved.cli', '=', 'organs_view.cli')
                ->where('cli_okved.id', '>', 1)
                ->where('cli_okved.tech_end', '2399-12-31')
                ->where('cli_okved.is_main', 1);
        })
            ->addSelect('cli_okved.code AS owner__okved_code')
            ->addSelect('cli_okved.name AS owner__okved_name');
    }
}
