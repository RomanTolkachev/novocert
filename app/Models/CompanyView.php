<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CompanyView extends Model
{
    protected $table = 'companies_view';

    public $timestamps = false;

    protected $guarded = [];

    /**
     * Полученные документы (feedbacks_view), где компания является получателем (to_gid).
     */
    public function receivedFeedbacks(): HasMany
    {
        return $this->hasMany(FeedbackView::class, 'to_gid', 'company_gid');
    }

    /**
     * Выданные документы (feedbacks_view), где компания является отправителем (from_gid).
     */
    public function madeFeedbacks(): HasMany
    {
        return $this->hasMany(FeedbackView::class, 'from_gid', 'company_gid');
    }
}
