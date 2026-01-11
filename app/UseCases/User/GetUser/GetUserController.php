<?php

namespace App\UseCases\User\GetUser;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class GetUserController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();

        if (! $user) {
            return new JsonResponse([
                'error' => 'User not found',
            ], 404);
        }

        return new JsonResponse([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_names' => $user->getCachedRoles() ?? []
        ]);
    }
}
