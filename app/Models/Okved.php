<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class Okved extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];
    
    protected $table = "okved";
    const CREATED_AT = 'tech_create';

    public function childs()
    {
        return $this->hasMany(Okved::class, 'parent', 'gid');
    }

    public function parent()
    {
        return $this->hasOne(Okved::class);
    }

    public function scopeFilter($query, $params){
        if ( isset($params['name']) && trim($params['name'] !== '') ) {
            $query->where('okved.name', 'LIKE', '%' . trim($params['name']) . '%');
        }
        if ( isset($params['code']) && trim($params['code'] !== '') ) {
            if ( isset($params['start']) && trim($params['start'] == 'begin') ) {
                $query->where('okved.code', 'LIKE', trim($params['code']) . '%');
            } else {
                $query->where('okved.code', 'LIKE', '%' . trim($params['code']) . '%');
            }
        }
    }
}
