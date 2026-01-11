<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;

class DocumentView extends Model
{
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
    ];

    protected $table = 'documents_view';

    // const CREATED_AT = 'tech_create';
}
