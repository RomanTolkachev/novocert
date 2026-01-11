<?php

use App\UseCases\Session\{
    CloseSession\CloseSessionController,
    RefreshSession\RefreshSessionController,
    StartSession\StartSessionController
};
use App\UseCases\User\{
    GetUser\GetUserController,
};
use App\UseCases\LastFiveCerts\LastFiveCertsController;
use App\UseCases\Admin\Companies\{
    GetCompaniesList\GetCompaniesListController, 
    GetFiltersForCompanies\GetFiltersForCompaniesController, 
};
use App\UseCases\Admin\Users\{
    GetUsersList\GetUsersListController, 
    GetFiltersForUsers\GetFiltersForUsersController, 
};
use App\UseCases\Admin\Systems\{
    GetSystemsList\GetSystemsListController,
    GetSystemsListFilters\GetSystemsListFiltersController,
};
use App\UseCases\Admin\Organs\{
    GetOrgansList\GetOrgansListController,
    GetOrgansListFilters\GetOrgansListFiltersController,
};
use App\UseCases\Admin\Certs\{
    GetCertsList\GetCertsListController,
    GetCertsListFilters\GetCertsListFiltersController,
};
use App\UseCases\Admin\Feedbacks\{
    GetFeedbacksList\GetFeedbacksListController,
    GetFeedbacksListFilters\GetFeedbacksListFiltersController,
};
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->middleware('api')->group(function () {
    Route::post('start-session', StartSessionController::class); // с логином и паролем
    Route::post('refresh-session', RefreshSessionController::class);
    Route::middleware('auth:jwt')->group(function () {
        Route::get('get-user', GetUserController::class); // with-credentials: true обязательно
        Route::post('close-session', CloseSessionController::class);
        
    });
});

Route::prefix("admin")->middleware('auth:jwt')->group(function() {
    Route::get("get-users", GetUsersListController::class);
    Route::get("get-users-filters", GetFiltersForUsersController::class);
    Route::get("get-companies", GetCompaniesListController::class);
    Route::get("get-companies-filters", GetFiltersForCompaniesController::class);
    Route::get("get-system-list", GetSystemsListController::class);
    Route::get("get-system-list-filters", GetSystemsListFiltersController::class);
    Route::get("get-organs-list", GetOrgansListController::class);
    Route::get("get-organs-list-filters", GetOrgansListFiltersController::class);
    Route::get("get-certs-list", GetCertsListController::class);
    Route::get("get-certs-list-filters", GetCertsListFiltersController::class);
    Route::get("get-feedbacks-list", GetFeedbacksListController::class);
    Route::get("get-feedbacks-list-filters", GetFeedbacksListFiltersController::class);
});

Route::get("last-five-certs", LastFiveCertsController::class);
