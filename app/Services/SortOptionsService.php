<?php

namespace App\Services;

class SortOptionsService
{
    private const DIRECTIONS = ['asc', 'desc'];

    /**
     * Build list of sort option values from column names.
     * Each column yields two values: {column}_asc and {column}_desc.
     *
     * @param array<string> $sortingColumns
     * @return array<string>
     */
    public function buildOptions(array $sortingColumns): array
    {
        $options = [];
        foreach ($sortingColumns as $column) {
            foreach (self::DIRECTIONS as $direction) {
                $options[] = $column . '_' . $direction;
            }
        }
        return $options;
    }

    /**
     * Parse sort value from request into column + direction.
     * Returns null if value is empty or not in the allowed set.
     *
     * @param array<string> $sortingColumns
     * @return array{column: string, direction: string}|null
     */
    public function parse(array $sortingColumns, ?string $value): ?array
    {
        if ($value === null || $value === '') {
            return null;
        }

        $allowed = $this->buildOptions($sortingColumns);
        if (!in_array($value, $allowed, true)) {
            return null;
        }

        foreach (self::DIRECTIONS as $direction) {
            $suffix = '_' . $direction;
            if (str_ends_with($value, $suffix)) {
                return [
                    'column' => substr($value, 0, -strlen($suffix)),
                    'direction' => $direction,
                ];
            }
        }

        return null;
    }
}
