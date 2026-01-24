<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;

class OrganView extends Model
{
    protected $table = "organs_view";

    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin', 'bus_end'
    ];
}
