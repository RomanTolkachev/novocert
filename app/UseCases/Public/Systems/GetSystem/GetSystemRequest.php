<?php

namespace App\UseCases\Public\Systems\GetSystem;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read string|int $id
 */
class GetSystemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required'],
        ];
    }
}
