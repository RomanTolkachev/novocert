<?php

namespace App\UseCases\Public\Organs\GetOrgansList\shared;

use App\Http\Abstract\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class OrgansFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    /**
     * organ_name: текстовый поиск по названию органа
     */
    public function organName(string $value): Builder
    {
        return $this->builder->where('organ_name', 'LIKE', "%{$value}%");
    }

    /**
     * organ_number: текстовый поиск по регистрационному номеру органа
     */
    public function organNumber(string $value): Builder
    {
        return $this->builder->where('organ_number', 'LIKE', "%{$value}%");
    }

    /**
     * organ_accreditation_scope: текстовый поиск по области уполномочивания
     */
    public function organAccreditationScope(string $value): Builder
    {
        return $this->builder->where('organ_accreditation_scope', 'LIKE', "%{$value}%");
    }

    /**
     * bus_begin: фильтр по дате начала деятельности (диапазон)
     */
    public function busBegin($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('bus_begin', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('bus_begin', '<=', $to));
    }

    /**
     * bus_end: фильтр по дате окончания деятельности (диапазон)
     */
    public function busEnd($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('bus_end', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('bus_end', '<=', $to));
    }

    /**
     * legal_short_name: текстовый поиск по сокращённому наименованию ЮЛ
     */
    public function legalShortName(string $value): Builder
    {
        return $this->builder->where('legal_short_name', 'LIKE', "%{$value}%");
    }

    /**
     * legal_ogrn: текстовый поиск по ОГРН ЮЛ
     */
    public function legalOgrn(string $value): Builder
    {
        return $this->builder->where('legal_ogrn', 'LIKE', "%{$value}%");
    }

    /**
     * legal_inn: текстовый поиск по ИНН ЮЛ
     */
    public function legalInn(string $value): Builder
    {
        return $this->builder->where('legal_inn', 'LIKE', "%{$value}%");
    }
}
