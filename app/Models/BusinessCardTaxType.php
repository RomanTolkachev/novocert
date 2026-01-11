<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasCarbonDates;

class BusinessCardTaxType extends Model
{
    //решения для кривого формата дат
    use HasCarbonDates;
    protected $dateAttributes = [
        'bus_begin',
        'bus_end',
        'tech_begin',
        'tech_end',
    ];

    protected $table = "cli_business_card_tax_type_";
    const CREATED_AT = 'tech_create';
    const UPDATED_AT = 'tech_change';
}
