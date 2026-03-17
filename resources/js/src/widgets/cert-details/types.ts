import type { ICompany } from "@/entities/company";
import type { TStatusLiter } from "@/widgets/organ-details/types";

export interface ICertDetailPayload {
    cert: ICertDetailCert;
    organ: ICertDetailOrgan | null;
    applicant: ICompany | null;
}

export interface ICertDetailCert {
    gid: string;
    cert__id: string;
    cert__name: string;
    cert__status: TStatusLiter;
    cert__bus_begin: string;
    cert__data_end?: string;
    system__name?: string;
    system__img?: string;
    organ__gid?: string;
}

export interface ICertDetailOrgan {
    gid: string;
    identifier: string;
    name?: string;
    full_name?: string;
    organ_logo_path?: string;
    organ_status_: TStatusLiter;
    organ_fact_address?: string;
    organ_status__name?: string;
}

