<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class Bank extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];
    
    protected $table = "cli_bank";
    const CREATED_AT = 'tech_create';

    // public function scopeFilter($query, $params){
    //     if ( isset($params['full_name']) && trim($params['full_name'] !== '') ) {
    //         $query->where('bank.full_name', 'LIKE', '%' . trim($params['full_name']) . '%');
    //     }
    //     if ( isset($params['ogrn']) && trim($params['ogrn'] !== '') ) {
    //         $query->where('bank.ogrn', 'LIKE', '%' . trim($params['ogrn']) . '%');
    //     }
    // }
}
