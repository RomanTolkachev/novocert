<?php

namespace App\Providers;

use App\Services\JwtAuthGuard;
use Illuminate\Foundation\Application;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Auth::extend('jwt', function ($app) {
            return new JwtAuthGuard($app['request']);
        });

        Collection::macro('customToFlat', function () {
            return $this->map(function ($item) {
                // Преобразуем модель в массив
                $array = $item->toArray();
                $result = [];

                $processNested = function ($nestedArray, $parentKey = null) use (&$result, &$processNested) {
                    if (! is_array($nestedArray)) {
                        return;
                    }

                    // Обработка списков отношений
                    if (array_is_list($nestedArray)) {
                        $concatenated = [];
                        foreach ($nestedArray as $nestedItem) {
                            if (! is_array($nestedItem)) {
                                continue;
                            }
                            foreach ($nestedItem as $k => $v) {
                                // Преобразуем ВСЕ значения в строки, включая массивы
                                $value = is_array($v) ? json_encode($v) : (string) ($v ?? '');
                                $concatenated[$k] = isset($concatenated[$k])
                                    ? $concatenated[$k].' // '.$value
                                    : $value;
                            }
                        }
                        foreach ($concatenated as $k => $v) {
                            $result["{$parentKey}__{$k}"] = $v;
                        }

                        return;
                    }

                    // Обработка обычных массивов
                    foreach ($nestedArray as $k => $v) {
                        $newKey = $parentKey ? "{$parentKey}__{$k}" : $k;
                        if (is_array($v)) {
                            // Если это массив, преобразуем в JSON строку
                            $result[$newKey] = json_encode($v);
                        } else {
                            $result[$newKey] = (string) ($v ?? '');
                        }
                    }
                };

                foreach ($array as $k => $v) {
                    if (is_array($v)) {
                        $processNested($v, $k);
                    } else {
                        $result[$k] = $v;
                    }
                }

                return $result;
            });
        });
    }
}
