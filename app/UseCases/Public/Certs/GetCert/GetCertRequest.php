<?php

namespace App\UseCases\Public\Certs\GetCert;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property-read string|int $id
 */
class GetCertRequest extends FormRequest
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
