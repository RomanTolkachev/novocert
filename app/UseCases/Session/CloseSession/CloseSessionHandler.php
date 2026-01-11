<?php

namespace App\UseCases\Session\CloseSession;

use Illuminate\Support\Facades\Auth;

class CloseSessionHandler
{
    public function __invoke()
    {
        return Auth::logout();
    }
}
