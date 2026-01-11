<?php

namespace App\UseCases\Session\CloseSession;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class CloseSessionController extends Controller
{
    public function __invoke(CloseSessionRequest $request, CloseSessionHandler $handler) {

        $tokens = $request->validated();

        return new JsonResponse(call_user_func($handler, $tokens));

    }
}
