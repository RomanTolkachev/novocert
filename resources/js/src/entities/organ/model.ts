export const ORGAN_KEYS = [
    "gid",
    "organ_name",
    "organ_number",
    "organ_cert_begin_date",
    "organ_cert_end_date",
    "organ_accreditation_scope",
    "organ_status_",
    "bus_begin",
    "bus_end",
    "system_name",
    "system_img_path",
    "legal_short_name",
    "legal_inn",
    "legal_ogrn",
    "legal_logo_path",
    "certs_count"
] as const;

export type OrganKeys = typeof ORGAN_KEYS[number];

export interface IOrgan {
    gid: string;
    organ_name: string;
    organ_number: string;
    organ_cert_begin_date: string;
    organ_cert_end_date: string;
    organ_accreditation_scope: string;
    organ_status_: string;
    bus_begin: string;
    bus_end: string;
    system_name: string;
    system_img_path: string;
    legal_short_name: string;
    legal_inn: string;
    legal_ogrn: string;
    legal_logo_path: string;
    certs_count: string;
    docum_web_reference: string
}
