import { translations, type IOrgan } from "@/entities/organ";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<IOrgan> = {
    dataUrl: "/public/get-organs-list",
    filtersUrl: "/public/get-organs-list-filters",
    translations,
    withRowActions: false,
    columnOrder: [
        "organ_name",
        "system_name",
        "organ_status_",
        "organ_number",
        "organ_accreditation_scope",
        "legal_short_name",
        "legal_inn",
        "legal_ogrn",
        "certs_count",
        "bus_begin",
        "bus_end",
    ],
    hiddenColumns: [
        "gid",
        "system_img_path",
        "legal_logo_path",
        "organ_cert_begin_date",
        "organ_cert_end_date",
        "organ_status_",
        "docum_web_reference",
        "legal_ogrn"
    ],
    actions: [],
    refetchOnMount: false,
    enableFilters: true,
};
