<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class ExcludeTechScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        $builder->where('id', '>', 1)->where('tech_end', "2399-12-31");
    }
}
