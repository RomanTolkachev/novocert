<?php

namespace App\UseCases\Session\CloseSession;

use Illuminate\Foundation\Http\FormRequest;

class CloseSessionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            // 'accessToken' => 'required|string',
            // 'refreshToken' => 'required|string',
        ];
    }
}
