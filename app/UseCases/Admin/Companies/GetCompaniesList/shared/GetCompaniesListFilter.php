<?php

namespace App\UseCases\Admin\Companies\GetCompaniesList\shared;

use App\Http\Abstract\AbstractFilter;
use App\UseCases\Admin\Companies\shared\CompaniesTranslator;
use Illuminate\Database\Eloquent\Builder;

class GetCompaniesListFilter extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    public function inn(string $inn): Builder
    {
        return $this->builder->where('inn', 'LIKE', "%$inn%");
    }

    public function okved(string $okved): Builder
    {
        return $this->builder->whereHas('okved', function ($q) use ($okved) {
            $q->where("name", 'LIKE', "%$okved%");
        });
    }

    public function cliType(array $ulTypes): Builder
    {
        $translated = CompaniesTranslator::parse($ulTypes);

        return $this->builder->where(function ($q) use ($translated) {
            foreach ($translated as $value) {
                $q->orWhere('cli_type_', "$value");
            }
        });
    }

    public function cliStatus(array $cliStatuses): Builder
    {
        $translated = CompaniesTranslator::parse($cliStatuses);

        return $this->builder->where(function ($q) use ($translated) {
            foreach ($translated as $value) {
                $q->orWhere('cli_status_', "$value");
            }
        });
    }
}
