<?php

namespace App\UseCases\Admin\Users\GetUsersList;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UseCases\Admin\Users\GetUsersList\shared\GetUsersListFilter;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GetUsersListController
{
    public function __invoke(GetUsersListHandler $handler, Request $request): JsonResponse
    {

        $user = Auth::user();
        $builder = User::where('cli', $user->cli);

        $result = $handler->execute(
            page: (int)($request->page ?? 1),
            itemsPerPage: (int)($request->perPage ?? 10),
            filter: new GetUsersListFilter($request->all()),
            builder: $builder
        );

        return new JsonResponse($result, Response::HTTP_OK);
    }
}