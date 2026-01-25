<?php

namespace App\UseCases\Public\Certs\GetCertsList\shared;

use App\Http\Abstract\AbstractFilter;
use App\UseCases\Public\Certs\shared\CertsTranslator;
use Illuminate\Database\Eloquent\Builder;

class CertsFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }


    public function certName(string $value): Builder
    {
        return $this->builder->where('cert__name', 'LIKE', "%{$value}%");
    }

    public function systemName(string $value): Builder
    {
        return $this->builder->where('system__name', 'LIKE', "%{$value}%");
    }

    public function organName(string $value): Builder
    {
        return $this->builder->where('organ__name', 'LIKE', "%{$value}%");
    }

    public function applicantShortName(string $value): Builder
    {
        return $this->builder->where('applicant__short_name', 'LIKE', "%{$value}%");
    }

    public function certBusBegin($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('cert__bus_begin', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('cert__bus_begin', '<=', $to));
    }

    public function certStatus($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        $codes = CertsTranslator::parse($values);

        return $this->builder->whereIn('cert__status', $codes);
    }

    public function organStatus($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        $codes = CertsTranslator::parse($values);

        return $this->builder->whereIn('organ__status', $codes);
    }
}
