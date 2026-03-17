<?php

namespace App\UseCases\Public\Companies\GetCompany;

use App\Models\CompanyView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetCompanyController
{
    public function __invoke(GetCompanyRequest $request): JsonResponse
    {
        $identifier = $request->validated('id');

        $company = CompanyView::query()
            ->where('companies_view.company_gid', $identifier)
            ->with(['receivedFeedbacks', 'madeFeedbacks'])
            ->first();

        if ($company === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'company' => $company->getAttributes(),
            'receivedDocs' => $company->receivedFeedbacks,
            'madeDocs' => $company->madeFeedbacks,
        ], Response::HTTP_OK);
    }
}

