import type { IOrgan } from "@/entities/organ";
import type { ICompany } from "@/entities/company";

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
    owner?: ICompany | null;

    documents?: IDocument[];
}

