<?php

namespace App\UseCases\Public\Docs\GetDoc;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read string|int $id
 */
class GetDocRequest extends FormRequest
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

