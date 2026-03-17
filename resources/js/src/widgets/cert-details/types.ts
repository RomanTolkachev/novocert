import type { TStatusLiter } from "@/widgets/organ-details/types";

export interface ICertDetailPayload {
    cert: ICertDetailCert;
    organ: ICertDetailOrgan | null;
    applicant: ICertDetailApplicant | null;
}

export interface ICertDetailCert {
    gid: string;
    docum_number: string;
    name: string;
    doc_reg_num: string;
    blank_number: string;
    docum_status_: TStatusLiter;
    bus_begin: string;
    bus_end: string;
    docum_accreditation_scope: string;
    standart: string;
    organ_head?: string;
    organ_head_deputy?: string;
    img_path?: string;
    system__gid?: string;
    system__name?: string;
    system__img_path?: string;
    cert_status__name?: string;
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

export interface ICertDetailApplicant {
    gid: string;
    name?: string;
    inn?: string;
    ogrn?: string;
    logo_path?: string;
    bus_begin?: string;
    bus_end?: string;
    applicant_status__gid?: TStatusLiter;
    applicant_status__name?: string;
    applicant__short_name?: string;
    applicant__kpp?: string;
    applicant_address__full_address?: string;
    applicant_address__name?: string;
    applicant__head_name?: string;
    applicant__okved_code?: string | null;
    applicant__okved_name?: string | null;
}

