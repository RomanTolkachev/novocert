<?php

namespace App\UseCases\Public\Certs\GetCert;

use App\Models\DocumentView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GetCertController
{
    public function __invoke(GetCertRequest $request): JsonResponse
    {
        $identifier = $request->validated('id');

        $cert = DocumentView::query()
            ->where(function ($q) use ($identifier) {
                $q->where('documents_view.gid', $identifier)->orWhere('documents_view.cert__id', $identifier);
            })
            ->with(['applicant', 'organ'])
            ->first();

        if ($cert === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        $applicant = $cert->applicant;
        if ($applicant !== null) {
            $applicantCli = DB::table('cli')
                ->where('cli.gid', $applicant->company_gid ?? null)
                ->where('cli.id', '>', 1)
                ->where('cli.tech_end', '2399-12-31')
                ->select([
                    'cli.cli_status_ as cli_status_',
                    'cli.bus_begin as bus_begin',
                    'cli.bus_end as bus_end',
                    'cli.liquidation_date as liquidation_date',
                ])
                ->first();

            if ($applicantCli !== null) {
                // Важно: не кастуем Eloquent-модель в array напрямую (иначе утечёт внутреннее состояние модели).
                $applicant = array_merge($applicant->toArray(), (array) $applicantCli);
            }
        }

        // В ответе не возвращаем вложенные связи внутри cert, только плоские поля documents_view.
        return new JsonResponse([
            'cert' => $cert->getAttributes(),
            'organ' => $cert->organ,
            'applicant' => $applicant,
        ], Response::HTTP_OK);
    }
}
