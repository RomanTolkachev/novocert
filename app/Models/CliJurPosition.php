<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class CliJurPosition extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];
    
    protected $table = "cli_jur_position";
    const CREATED_AT = 'tech_create';

    public function position() {
        return $this->hasOne(CliJurPositionType::class, 'gid', 'cli_jur_position_type_');
    }
}
