<?php

namespace App\UseCases\Public\Certs\GetCert;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class GetCertController
{
    public function __invoke(GetCertRequest $request): JsonResponse
    {
        $identifier = $request->validated('id');

        $cert = DB::table('docum')
            ->leftJoin('organ_reestr_system_ as sys', function ($join) {
                // MSSQL: возможен конфликт collations между gid полями
                $join->on(DB::raw('docum.organ_type_ COLLATE SQL_Latin1_General_CP1_CI_AS'), '=', 'sys.gid');
            })
            ->leftJoin('organ_status_ as cert_status', function ($join) {
                // MSSQL: возможен конфликт collations между docum_status_ и gid
                $join->on(DB::raw('docum.docum_status_ COLLATE SQL_Latin1_General_CP1_CI_AS'), '=', 'cert_status.gid');
            })
            ->where(function ($q) use ($identifier) {
                $q->where('docum.gid', $identifier)->orWhere('docum.id', $identifier);
            })
            ->where('docum.id', '>', 1)
            ->where('docum.tech_end', '2399-12-31')
            ->select([
                'docum.gid',
                'docum.docum_number',
                'docum.name',
                'docum.blank_number',
                'docum.doc_reg_num',
                'docum.docum_status_',
                'docum.bus_begin',
                'docum.bus_end',
                'docum.docum_accreditation_scope',
                'docum.standart',
                'docum.organ_head',
                'docum.organ_head_deputy',
                'docum.img_path',
                'docum.organ',
                'docum.applicant',
                'sys.gid as system__gid',
                'sys.name as system__name',
                'sys.img_path as system__img_path',
                'cert_status.name as cert_status__name',
            ])
            ->first();

        if ($cert === null) {
            return new JsonResponse(['message' => 'Not found'], Response::HTTP_NOT_FOUND);
        }

        $applicant = DB::table('cli')
            ->leftJoin('cli_jur', 'cli.gid', '=', 'cli_jur.gid')
            ->leftJoin('cli_address as jur_addr', function ($q) {
                $q->on('jur_addr.cli', '=', 'cli.gid')
                    ->where('jur_addr.cli_address_type_', 'jur')
                    ->where('jur_addr.tech_end', '2399-12-31');
            })
            ->leftJoin('cli_jur_position as ceo', function ($q) {
                $q->on('ceo.cli', '=', 'cli.gid')
                    ->where('ceo.id', '>', 1)
                    ->where('ceo.tech_end', '2399-12-31');
            })
            ->leftJoin('cli_okved as okved', function ($q) {
                $q->on('okved.cli', '=', 'cli.gid')
                    ->where('okved.id', '>', 1)
                    ->where('okved.tech_end', '2399-12-31')
                    ->where('okved.is_main', 1);
            })
            ->leftJoin('organ_status_ as cli_status', function ($join) {
                // на проде возможны конфликты collations
                $join->on(DB::raw('cli.cli_status_ COLLATE SQL_Latin1_General_CP1_CI_AS'), '=', 'cli_status.gid');
            })
            ->where('cli.gid', $cert->applicant)
            ->where('cli.id', '>', 1)
            ->where('cli.tech_end', '2399-12-31')
            ->select([
                'cli.gid',
                'cli.name',
                'cli.inn',
                'cli.ogrn',
                'cli.logo_path',
                'cli.bus_begin',
                'cli.bus_end',
                'cli.cli_status_ as applicant_status__gid',
                'cli_status.name as applicant_status__name',
                'cli_jur.short_name as applicant__short_name',
                'cli_jur.kpp as applicant__kpp',
                'jur_addr.full_address as applicant_address__full_address',
                'jur_addr.name as applicant_address__name',
                'ceo.name as applicant__head_name',
                'okved.code as applicant__okved_code',
                'okved.name as applicant__okved_name',
            ])
            ->first();

        $organ = DB::table('organ')
            ->leftJoin('organ_status_ as organ_status', function ($join) {
                // MSSQL: возможен конфликт collations между organ_status_ и gid
                $join->on(DB::raw('organ.organ_status_ COLLATE SQL_Latin1_General_CP1_CI_AS'), '=', 'organ_status.gid');
            })
            ->where('organ.gid', $cert->organ)
            ->where('organ.id', '>', 1)
            ->where('organ.tech_end', '2399-12-31')
            ->select([
                'organ.gid',
                'organ.identifier',
                'organ.name',
                'organ.full_name',
                'organ.logo_path as organ_logo_path',
                'organ.organ_status_',
                'organ_status.name as organ_status__name',
                'organ.organ_fact_address',
            ])
            ->first();

        return new JsonResponse([
            'cert' => $cert,
            'organ' => $organ,
            'applicant' => $applicant,
        ], Response::HTTP_OK);
    }
}
