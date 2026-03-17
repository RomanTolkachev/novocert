import type { IOrgan } from "@/entities/organ";

export type TStatusLiter = "N" | "A" | "L" | "PL" | "B" | "T" | "P" | "S" | "D" | undefined | null;

export interface IDocument {
    id: number;
    gid: string;
    name: string;
    docum_status_: TStatusLiter;
    docum_number: string;
    bus_begin: string;
    bus_end: string;

    // дополнительные поля, которые реально приходят с бэка
    docum_type_?: string;
    doc_reg_num?: string;
    blank_number?: string;
    applicant?: string;
    manufacturer?: string;
    organ?: string;
    organ_type_?: string;
    docum_accreditation_scope?: string;
    standart?: string;
    img_path?: string;
    tech_begin?: string;
    tech_end?: string;
    tech_create?: string;
    tech_change?: string | null;
    tech_source?: string;
    tech_user?: string;
    tech_description?: string;
}

/** Тип ответа get-organ (детальная страница органа). */
export interface IOrganDetail extends IOrgan {
    owner__gid: string;
    owner__short_name?: string;
    owner__full_name?: string;
    owner__name?: string;
    owner__kpp?: string;
    owner__bus_begin?: string;
    owner__liquidation_date?: string;

    owner_address__full_address?: string;
    owner_address__name?: string;

    owner__head_name?: string;
    owner__head_position?: string;

    owner__okved_code?: string | null;
    owner__okved_name?: string | null;

    owner_status__gid?: TStatusLiter;
    owner_status__name?: string;

    documents?: IDocument[];
}

