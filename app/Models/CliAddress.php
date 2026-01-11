<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class CliAddress extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];
    
    protected $table = "cli_address";
    const CREATED_AT = 'tech_create';
}
