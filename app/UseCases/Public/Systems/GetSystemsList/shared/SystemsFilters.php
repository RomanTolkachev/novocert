<?php

namespace App\UseCases\Public\Systems\GetSystemsList\shared;

use App\Http\Abstract\AbstractFilter;
use App\UseCases\Public\Systems\shared\SystemsTranslator;
use Illuminate\Database\Eloquent\Builder;

class SystemsFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

       
    public function systemName(string $value): Builder
    {
        return $this->builder->where('system_name', 'LIKE', "%{$value}%");
    }


    public function systemCertNumber(string $value): Builder
    {
        return $this->builder->where('system_cert_number', 'LIKE', "%{$value}%");
    }

    public function accreditation(string $value): Builder
    {
        return $this->builder->where('accreditation', 'LIKE', "%{$value}%");
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

    public function statusName($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        $codes = SystemsTranslator::parse($values);

        return $this->builder->whereIn('organ_status_', $codes);
    }

    public function ownerShortName(string $value): Builder
    {
        return $this->builder->where('owner__short_name', 'LIKE', "%{$value}%");
    }

    public function ownerOgrn(string $value): Builder
    {
        return $this->builder->where('owner__ogrn', 'LIKE', "%{$value}%");
    }


    public function ownerInn(string $value): Builder
    {
        return $this->builder->where('owner__inn', 'LIKE', "%{$value}%");
    }
}
