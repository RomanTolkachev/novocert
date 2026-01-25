<?php

namespace App\UseCases\Public\Companies\GetCompaniesList\shared;

use App\Http\Abstract\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class CompaniesFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    // company_short_name: поиск по краткому названию компании
    public function companyShortName(string $value): Builder
    {
        return $this->builder->where('company_short_name', 'LIKE', "%{$value}%");
    }

    // company_inn: поиск по ИНН
    public function companyInn(string $value): Builder
    {
        return $this->builder->where('company_inn', 'LIKE', "%{$value}%");
    }

    // company_ogrn: поиск по ОГРН
    public function companyOgrn(string $value): Builder
    {
        return $this->builder->where('company_ogrn', 'LIKE', "%{$value}%");
    }

    // company_type: поиск по типу ЮЛ (текстом)
    public function companyType(string $value): Builder
    {
        return $this->builder->where('company_type', 'LIKE', "%{$value}%");
    }

    // company_status: фильтр по статусу компании (текст, checkbox)
    public function companyStatus($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        return $this->builder->whereIn('company_status', $values);
    }

    // okved_code: поиск по коду ОКВЭД
    public function okvedCode(string $value): Builder
    {
        return $this->builder->where('okved_code', 'LIKE', "%{$value}%");
    }

    // ceo: поиск по ФИО руководителя
    public function ceo(string $value): Builder
    {
        return $this->builder->where('ceo', 'LIKE', "%{$value}%");
    }
}
