export const ORGAN_KEYS = [
    "gid",
    "name",
    "organ_reestr_system_",
    "organ_status_",
    "bus_begin",
    "bus_end",
    "identifier",
    "organ_accreditation_scope",
    "cli",
    "certs_count",
    "type__gid",
    "type__img_path",
    "type__cert_system_name",
    "status__gid",
    "status__name",
    "cli_table__gid",
    "cli_table__inn",
    "cli_table__ogrn",
    "cli_table__img_path",
    "cli_jur__cli",
    "cli_jur__short_name",
    "cli_jur__laravel_through_key"
] as const;

export type OrganKeys = typeof ORGAN_KEYS[number];

export interface IOrgan {
    gid: string;
    organ_name: string;
    organ_reestr_system_: string;
    organ_status_: string;
    bus_begin: string;
    bus_end: string;
    identifier: string;
    organ_accreditation_scope: string;
    cli: string;
    certs_count: string;
    type__gid: string;
    type__img_path: string;
    type__cert_system_name: string;
    status__gid: string;
    status__name: string;
    cli_table__gid: string;
    cli_table__inn: string;
    cli_table__ogrn: string;
    cli_table__logo_path: string;
    cli_jur__cli: string;
    cli_jur__short_name: string;
    cli_jur__laravel_through_key: string | number
}
