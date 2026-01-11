<?php

namespace App\UseCases\Admin\Users\GetUsersList\shared;

use App\Http\Abstract\AbstractFilter;

class GetUsersListFilter extends AbstractFilter
{
    public function __construct(array $inputs)
    {
        parent::__construct($inputs);
    }

    // Example: public function name($value) { return $this->builder->where('name', 'like', "%{$value}%"); }
}