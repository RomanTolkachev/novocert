<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class CliOkved extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "cli_okved";
    const CREATED_AT = 'tech_create';

    public function okved2()
    {
        return $this->hasOne(Okved::class, 'code', 'name')->latest();
    }
}
