<?php

namespace App\Models\Traits;

use Carbon\Carbon;

trait HasCarbonDates
{
    /**
     * Универсальный метод для преобразования даты в Carbon.
     *
     * @param  string|Carbon|null  $value
     * @return Carbon|null
     */
    protected function convertToCarbon($value)
    {
        if (is_string($value)) {
            $value = str_replace(':AM', ' AM', $value);
            $value = str_replace(':PM', ' PM', $value);
            return Carbon::parse($value);
        }
        return $value; // Уже объект Carbon или null
    }

    /**
     * Автоматическое преобразование атрибутов дат.
     * Определите массив имен атрибутов, требующих преобразования.
     *
     * @param  string  $key
     * @param  mixed   $value
     * @return mixed
     */
    public function getAttribute($key)
    {
        $value = parent::getAttribute($key);

        if (property_exists($this, 'dateAttributes') && in_array($key, $this->dateAttributes)) {
            return $this->convertToCarbon($value);
        }

        return $value;
    }
}
