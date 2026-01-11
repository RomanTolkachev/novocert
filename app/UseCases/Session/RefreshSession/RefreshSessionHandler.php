<?php

namespace App\UseCases\Session\RefreshSession;

use App\Models\User;
use App\Services\JwtAuthGuard;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RefreshSessionHandler
{
    public function __construct(protected JwtAuthGuard $guard) {}

    /**
     * @throws AuthenticationException
     */
    public function handle(Request $request): array
    {

        $refreshToken = $request->bearerToken() ?? $request->input('refreshToken');
        if (! $refreshToken) {
            throw new AuthenticationException('Token not provided');
        }

        Log::info($refreshToken);

        return $this->guard->refreshToken($refreshToken);

       

        // return $this->guard->refreshToken($refreshToken);
    }
}
