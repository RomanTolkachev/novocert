import { translations, type IDoc } from "@/entities/doc";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<IDoc> = {
    dataUrl: "/public/get-docs-list",
    filtersUrl: "/public/get-docs-list-filters",
    translations,
    withRowActions: false,
    columnOrder: [
        "fb_name",
        "docum_type_name",
        "organ_status_liter",
        "fb_bus_begin",
        "fb_bus_end",
        "fb_doc_reg_num",
        "from_short_name",
        "to_short_name",
    ],
    hiddenColumns: [
        "fb_logo_path",
        "organ_status_liter",
        "fb_gid",
        "fb_docum_text",
        "docum_type_gid",
        "from_gid",
        "from_inn",
        "from_ogrn",
        "from_logo_path",
        "to_gid",
        "to_inn",
        "to_ogrn",
        "to_logo_path",
    ],
    actions: [],
    refetchOnMount: false,
    enableFilters: true,
};
