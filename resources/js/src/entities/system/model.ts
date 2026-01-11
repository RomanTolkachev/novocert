export const SYSTEM_KEYS = [
    "gid",
    "number",
    "accreditation",
    "bus_begin",
    "bus_end",
    "img_path",
    "cli_name",
    "organ_status_",
    "organs_count",
    "documents_count",
    "cert_system_name",
    "status__gid",
    "status__name",
    "docum_web_reference",
] as const;

export type SystemKeys = typeof SYSTEM_KEYS[number];

export interface ISystem {
    gid: string;
    cert_number: string;
    accreditation: string;
    bus_begin: string;
    bus_end: string;
    img_path: string;
    cli_name: string;
    organ_status_: string;
    organs_count: string;
    documents_count: string;
    cert_system_name: string;
    status__gid: string;
    status__name: string;
    docum_web_reference: string;
}
