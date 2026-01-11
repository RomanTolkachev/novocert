<?php

namespace App\UseCases\Session\RefreshSession;

use App\Http\Controllers\Controller;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RefreshSessionController extends Controller
{
    public function __invoke(Request $request, RefreshSessionHandler $handler): JsonResponse
    {
        try {
            $tokens = $handler->handle($request);

            return response()->json([
                'accessToken' => $tokens['encodedAccessToken'],
                'refreshToken' => $tokens['encodedRefreshToken'],
            ]);
            // это для nextjs через куки
            // ->cookie(\cookie('accessToken', $tokens['encodedAccessToken'], $tokens['accessTokenPayload']['ttl'],
            // ))
            // ->cookie(\cookie('refreshToken', $tokens['encodedRefreshToken'], $tokens['refreshTokenPayload']['ttl'],
            // ));

        } catch (AuthenticationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
            ], 500);
        }
    }
}
