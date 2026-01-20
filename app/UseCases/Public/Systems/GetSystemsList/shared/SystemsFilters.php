<?php

namespace App\UseCases\Public\Systems\GetSystemsList\shared;

use App\Http\Abstract\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class SystemsFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

        
    /**
     * system_name: текстовый поиск по названию системы
     */
    public function systemName(string $value): Builder
    {
        return $this->builder->where('system_name', 'LIKE', "%{$value}%");
    }

    /**
     * system_cert_number: текстовый поиск по номеру сертификата
     */
    public function systemCertNumber(string $value): Builder
    {
        return $this->builder->where('system_cert_number', 'LIKE', "%{$value}%");
    }

    /**
     * accreditation: текстовый поиск по области уполномочивания
     */
    public function accreditation(string $value): Builder
    {
        return $this->builder->where('accreditation', 'LIKE', "%{$value}%");
    }

    /**
     * bus_begin: фильтр по дате регистрации (диапазон)
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
     * bus_end: фильтр по дате прекращения (диапазон)
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
     * status__name: чекбокс, фильтрация по множеству статусов
     */
    public function statusName($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        return $this->builder->whereIn('status__name', $values);
    }

    /**
     * owner__short_name: текстовый поиск по наименованию владельца
     */
    public function ownerShortName(string $value): Builder
    {
        return $this->builder->where('owner__short_name', 'LIKE', "%{$value}%");
    }

    /**
     * owner__ogrn: текстовый поиск по ОГРН владельца
     */
    public function ownerOgrn(string $value): Builder
    {
        return $this->builder->where('owner__ogrn', 'LIKE', "%{$value}%");
    }

    /**
     * owner__inn: текстовый поиск по ИНН владельца
     */
    public function ownerInn(string $value): Builder
    {
        return $this->builder->where('owner__inn', 'LIKE', "%{$value}%");
    }
}
