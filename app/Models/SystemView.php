<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;

class SystemView extends Model
{
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
    ];

    protected $table = 'systems_view';

}
