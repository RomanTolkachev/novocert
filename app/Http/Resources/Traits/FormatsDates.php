<?php

namespace App\Http\Resources\Traits;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Трейт для форматирования дат в ресурсах.
 *
 * Использование:
 *  - в ресурсе подключить trait и определить protected array $dateFields = ['field1', 'field2'];
 *  - внутри toArray() вызвать $this->formatDatesOnPaginator($p) или $this->formatDatesOnArray($row).
 */
trait FormatsDates
{
    /**
     * Формат даты по умолчанию.
     *
     * @var string
     */
    protected string $dateFormat = 'd.m.Y';

    /**
     * "Бесконечная" дата, которая в UI должна отображаться как "-".
     */
    protected string $infinityDate = '2399-12-31';

    /**
     * Возвращает список полей-даты для форматирования.
     * По умолчанию читает protected $dateFields из ресурса, если он определён.
     */
    protected function getDateFields(): array
    {
        if (property_exists($this, 'dateFields')) {
            /** @var array $fields */
            $fields = $this->dateFields;
            return $fields;
        }

        return [];
    }

    /**
     * Форматирует указанные поля в каждом элементе пагинатора.
     */
    protected function formatDatesOnPaginator(LengthAwarePaginator $paginator, ?array $fields = null): LengthAwarePaginator
    {
        $fields = $fields ?? $this->getDateFields();

        if (empty($fields)) {
            return $paginator;
        }

        $collection = $paginator->getCollection()->map(function ($item) use ($fields) {
            // Приводим к плоскому массиву атрибутов без внутренних свойств модели
            if ($item instanceof Arrayable) {
                $row = $item->toArray();
            } else {
                $row = (array) $item;
            }

            foreach ($fields as $field) {
                if (!array_key_exists($field, $row) || $row[$field] === null || $row[$field] === '') {
                    continue;
                }

                try {
                    $date = Carbon::parse($row[$field]);

                    if ($date->isSameDay($this->infinityDate)) {
                        $row[$field] = '—';
                    } else {
                        $row[$field] = $date->format($this->dateFormat);
                    }
                } catch (\Throwable $e) {}
            }

            return $row;
        });

        $paginator->setCollection($collection);

        return $paginator;
    }

    /**
     * Форматирует указанные поля в одном массиве (одна запись).
     */
    protected function formatDatesOnArray(array $row, ?array $fields = null): array
    {
        $fields = $fields ?? $this->getDateFields();

        if (empty($fields)) {
            return $row;
        }

        foreach ($fields as $field) {
            if (!array_key_exists($field, $row) || $row[$field] === null || $row[$field] === '') {
                continue;
            }

            try {
                $date = Carbon::parse($row[$field]);

                if ($date->isSameDay($this->infinityDate)) {
                    $row[$field] = '—';
                } else {
                    $row[$field] = $date->format($this->dateFormat);
                }
            } catch (\Throwable $e) {}
        }

        return $row;
    }
}
