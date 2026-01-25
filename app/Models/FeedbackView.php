<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;

class FeedbackView extends Model
{
    use HasCarbonDates;

    protected $table = 'feedbacks_view';

    protected $dateAttributes = [
        'fb_bus_begin',
        'fb_bus_end',
    ];

    public $timestamps = false;

    protected $guarded = [];
}
