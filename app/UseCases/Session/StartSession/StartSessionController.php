<?php

namespace App\UseCases\Session\StartSession;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class StartSessionController extends Controller
{
    public function __invoke(StartSessionRequest $request)
    {
        $tokens = Auth::attempt(email: $request->email, password: $request->password);

        if (! $tokens) {
            return response()->json([
                'ok' => false,
                'message' => 'Invalid credentials',
            ], 403);
        }

        return new JsonResponse([
            'accessToken' => $tokens['encodedAccessToken'],
            'refreshToken' => $tokens['encodedRefreshToken'],
        ]);
        // для nextjs
        // ->cookie(\cookie('accessToken', $tokens['encodedAccessToken'], $tokens['accessTokenPayload']['ttl']))
        // ->cookie(\cookie('refreshToken', $tokens['encodedRefreshToken'], $tokens['refreshTokenPayload']['ttl']));
    }
}
