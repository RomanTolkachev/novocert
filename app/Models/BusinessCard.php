<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class BusinessCard extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "cli_business_card";
    const CREATED_AT = 'tech_create';
    const UPDATED_AT = 'tech_change';

    public function cli_table() {
        return $this->hasOne(Cli::class, 'gid', 'cli')->latest();
    }
}
