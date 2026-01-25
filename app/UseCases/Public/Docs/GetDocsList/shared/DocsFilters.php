<?php

namespace App\UseCases\Public\Docs\GetDocsList\shared;

use App\Http\Abstract\AbstractFilter;
use App\UseCases\Public\Docs\shared\DocsTranslator;
use Illuminate\Database\Eloquent\Builder;

class DocsFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    // fb_name (label: fb_name): текстовый поиск по наименованию документа
    public function fbName(string $value): Builder
    {
        return $this->builder->where('fb_name', 'LIKE', "%{$value}%");
    }

    // fb_doc_reg_num (label: fb_doc_reg_num): поиск по рег. номеру
    public function fbDocRegNum(string $value): Builder
    {
        return $this->builder->where('fb_doc_reg_num', 'LIKE', "%{$value}%");
    }

    // docum_type_name: поиск по типу документа (текстом)
    public function documTypeName(string $value): Builder
    {
        return $this->builder->where('docum_type_name', 'LIKE', "%{$value}%");
    }

    // fb_bus_begin (label: fb_bus_begin): диапазон дат регистрации
    public function fbBusBegin($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('fb_bus_begin', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('fb_bus_begin', '<=', $to));
    }

    // fb_bus_end (label: fb_bus_end): диапазон дат окончания
    public function fbBusEnd($range): Builder
    {
        $range = is_array($range) ? array_values($range) : [$range, null];
        [$from, $to] = $range + [null, null];

        return $this->builder
            ->when($from, fn (Builder $q) => $q->whereDate('fb_bus_end', '>=', $from))
            ->when($to, fn (Builder $q) => $q->whereDate('fb_bus_end', '<=', $to));
    }

    // organ_status_liter: чекбокс по статусу (литера), через Translator
    public function organStatusLiter($values): Builder
    {
        $values = is_array($values) ? $values : [$values];

        $codes = DocsTranslator::parse($values);

        return $this->builder->whereIn('organ_status_liter', $codes);
    }

    // from_short_name: текстовый поиск по отправителю
    public function fromShortName(string $value): Builder
    {
        return $this->builder->where('from_short_name', 'LIKE', "%{$value}%");
    }

    // to_short_name: текстовый поиск по получателю
    public function toShortName(string $value): Builder
    {
        return $this->builder->where('to_short_name', 'LIKE', "%{$value}%");
    }
}
