<?php

namespace App\Models;

use App\Models\Traits\HasCarbonDates;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class DocumentView extends Model
{
    use HasCarbonDates;

    protected $dateAttributes = [
        'bus_begin',
    ];

    protected $table = 'documents_view';

    /** Заявитель документа отдельным ключом `applicant` (CompanyView). */
    public function applicant(): HasOneThrough
    {
        /**
         * В `documents_view` сейчас нет колонки `applicant` (см. views.md),
         * поэтому связь строим через исходную таблицу `docum`.
         *
         * documents_view.gid -> docum.gid -> docum.applicant -> companies_view.company_gid
         */
        return $this->hasOneThrough(
            CompanyView::class,
            Document::class,
            'gid',          // Foreign key on docum...
            'company_gid',  // Foreign key on companies_view...
            'gid',          // Local key on documents_view...
            'applicant'     // Local key on docum...
        );
    }

    /** Орган, выдавший документ (для cert-details). */
    public function organ(): HasOne
    {
        // Во view есть `organ__gid`, поэтому простой FK без join'ов.
        return $this->hasOne(Organ::class, 'gid', 'organ__gid');
    }
}
