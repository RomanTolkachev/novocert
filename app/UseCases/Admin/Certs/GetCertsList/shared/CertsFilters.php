<?php

namespace App\UseCases\Admin\Certs\GetCertsList\shared;

use App\Http\Abstract\AbstractFilter;

class CertsFilters extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    // protected string $cacheColumn = '{table}.{column}'; // сюда вручную прописать модель и столбец
}
