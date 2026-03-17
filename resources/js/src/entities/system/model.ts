import type { IOrgan } from "@/entities/organ";
import type { ICompany } from "@/entities/company";

export interface ISystem {
    id: number;
    gid: string;
    system_name: string;
    system_cert_number: string;
    accreditation: string;
    applicant: string;
    bus_begin: string;
    bus_end: string;
    img_path: string;
    organ_status_: string;
    organs_count: string;
    documents_count: string;
    owner__gid: string;
    owner__inn: string;
    owner__ogrn: string;
    owner__short_name: string;
    owner__logo_path: string;
    status__gid: string;
    status__name: string;
    docum_web_reference: string;
    /** из join cli_jur */
    owner__full_name?: string;
    owner__name?: string;
    owner__kpp?: string;
    owner__bus_begin?: string;
    owner__liquidation_date?: string;
    /** из join cli_address (юр. адрес) */
    owner_address__full_address?: string;
    owner_address__name?: string;
    /** из join cli_jur_position + cli_jur_position_type_ */
    owner__head_name?: string;
    owner__head_position?: string;
    /** из join cli_okved (is_main = 1) — код основного вида деятельности */
    owner__okved_code?: string;
    owner__okved_name?: string;
}

/** Ответ get-system (детальная страница): система + органы. */
export interface ISystemDetail extends ISystem {
    organs?: IOrgan[];
    owner?: ICompany | null;
}
