<?php

namespace App\UseCases\Public\Organs\GetOrgansList\shared;

use App\Http\Abstract\AbstractFilter;
use App\UseCases\Public\Organs\shared\OrgansTranslator;
use Illuminate\Database\Eloquent\Builder;

class OrgansFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    public function organName(string $value): Builder
    {
        return $this->builder->where('organ_name', 'LIKE', "%{$value}%");
    }

    public function organNumber(string $value): Builder
    {
        return $this->builder->where('organ_number', 'LIKE', "%{$value}%");
    }

    public function organAccreditationScope(string $value): Builder
    {
        return $this->builder->where('organ_accreditation_scope', 'LIKE', "%{$value}%");
    }

    public function busBegin($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('bus_begin', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('bus_begin', '<=', $to));
    }

    public function busEnd($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('bus_end', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('bus_end', '<=', $to));
    }

    public function legalShortName(string $value): Builder
    {
        return $this->builder->where('legal_short_name', 'LIKE', "%{$value}%");
    }

    public function legalOgrn(string $value): Builder
    {
        return $this->builder->where('legal_ogrn', 'LIKE', "%{$value}%");
    }

    public function legalInn(string $value): Builder
    {
        return $this->builder->where('legal_inn', 'LIKE', "%{$value}%");
    }

    public function organStatus($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        $codes = OrgansTranslator::parse($values);

        return $this->builder->whereIn('organ_status_', $codes);
    }
}
