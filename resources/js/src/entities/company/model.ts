const COMPANY_KEYS = [
    "id",
    "gid", 
    "parent",
    "inn",
    "ogrn",
    "cli_type_",
    "cli_status_",
    "name",
    "liquidation_date",
    "is_farmer",
    "is_our",
    "img_path",
    "logo_path",
    "bus_begin",
    "bus_end",
    "tech_description",
    "tech_begin",
    "tech_end",
    "tech_create",
    "tech_change",
    "tech_source",
    "tech_user",
    // поля из companies_view
    "company_name",
    "company_short_name",
    "company_full_name",
    "company_inn",
    "company_ogrn",
    "company_logo_path",
    "company_gid",
    "company_liquidation_date",
    "company_type",
    "company_status",
    "okved_code",
    "okved_name",
    "ceo",
    "docs_made",
    "docs_received",
    "cli_jur__id",
    "cli_jur__gid",
    "cli_jur__cli",
    "cli_jur__name",
    "cli_jur__liquidation_date",
    "cli_jur__is_resident",
    "cli_jur__jurisdiction",
    "cli_jur__cli_ownership",
    "cli_jur__full_name",
    "cli_jur__short_name",
    "cli_jur__foreing_name",
    "cli_jur__kpp",
    "cli_jur__okato",
    "cli_jur__okpo",
    "cli_jur__okgu",
    "cli_jur__okfs",
    "cli_jur__okopf",
    "cli_jur__date_of_formation",
    "cli_jur__date_assigning_ogrn",
    "cli_jur__date_registration20020701",
    "cli_jur__organ_registration20020701",
    "cli_jur__number_registration20020701",
    "cli_jur__ifns",
    "cli_jur__ifns_reg_date",
    "cli_jur__bus_begin",
    "cli_jur__bus_end",
    "cli_jur__tech_description",
    "cli_jur__tech_begin",
    "cli_jur__tech_end",
    "cli_jur__tech_create",
    "cli_jur__tech_change",
    "cli_jur__tech_source",
    "cli_jur__tech_user",
    "cli_phys"
] as const;

export type CompanyKeys = typeof COMPANY_KEYS[number];

export interface ICompany {
    id: number;
    gid: string;
    parent: string;
    inn: string;
    ogrn: string;
    cli_type_: string;
    cli_status_: string;
    name: string;
    liquidation_date: string;
    is_farmer: string;
    is_our: string;
    img_path: string;
    logo_path: string;
    bus_begin: string;
    bus_end: string;
    tech_description: string;
    tech_begin: string;
    tech_end: string;
    tech_create: string;
    tech_change: string;
    tech_source: string;
    tech_user: string;
    // поля из companies_view (public companies)
    company_name?: string;
    company_short_name?: string;
    company_full_name?: string;
    company_inn?: string;
    company_ogrn?: string;
    company_logo_path?: string;
    company_gid?: string;
    company_liquidation_date?: string;
    company_type?: string;
    company_status?: string;
    okved_code?: string;
    okved_name?: string;
    ceo?: string;
    docs_made?: number;
    docs_received?: number;

    cli_jur__id: string;
    cli_jur__gid: string;
    cli_jur__cli: string;
    cli_jur__name: string;
    cli_jur__liquidation_date: string;
    cli_jur__is_resident: string;
    cli_jur__jurisdiction: string;
    cli_jur__cli_ownership: string;
    cli_jur__full_name: string;
    cli_jur__short_name: string;
    cli_jur__foreing_name: string;
    cli_jur__kpp: string;
    cli_jur__okato: string;
    cli_jur__okpo: string;
    cli_jur__okgu: string;
    cli_jur__okfs: string;
    cli_jur__okopf: string;
    cli_jur__date_of_formation: string;
    cli_jur__date_assigning_ogrn: string;
    cli_jur__date_registration20020701: string;
    cli_jur__organ_registration20020701: string;
    cli_jur__number_registration20020701: string;
    cli_jur__ifns: string;
    cli_jur__ifns_reg_date: string;
    cli_jur__bus_begin: string;
    cli_jur__bus_end: string;
    cli_jur__tech_description: string;
    cli_jur__tech_begin: string;
    cli_jur__tech_end: string;
    cli_jur__tech_create: string;
    cli_jur__tech_change: string;
    cli_jur__tech_source: string;
    cli_jur__tech_user: string;
    cli_phys: null;
    deletable?: boolean,
    hasBusinessCard?: boolean
    editable? : boolean
}

