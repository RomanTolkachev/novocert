import { translations, type ICompany } from "@/entities/company";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ICompany> = {
    dataUrl: '/admin/get-companies',
    filtersUrl: "/admin/get-companies-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: [],
    hiddenColumns: [
        "bus_begin", "bus_end", 'cli_jur__bus_begin', "cli_jur__bus_end",
        "cli_jur__gid", "cli_jur__id", "tech_end", "tech_begin", "tech_user",
        "tech_source", "tech_description", "tech_create", "tech_change",
        "id", "gid", "cli_jur__liquidation_date", "cli_jur__tech_description",
        "cli_jur__tech_begin", "cli_jur__tech_end", "cli_jur__tech_create",
        "cli_jur__okato", "cli_jur__okpo", "cli_jur__okopf", "cli_jur__okgu",
        "cli_jur__okfs", "cli_jur__date_of_formation", "cli_jur__date_assigning_ogrn",
        "cli_jur__tech_source", "cli_jur__tech_change", "cli_jur__tech_user", "is_farmer",
        "liquidation_date", 
        "cli_jur__date_registration20020701", "parent", "cli_jur__cli",
        "cli_jur__ifns_reg_date", "cli_jur__organ_registration20020701",
        "cli_jur__number_registration20020701", "cli_jur__foreing_name", "cli_jur__ifns",
        "cli_jur__full_name", "logo_path", "deletable", "hasBusinessCard", "editable"
    ],
    actions: [
        { label: "Добавить компанию", onClick: () => console.log("Добавить компанию") },
        { label: "Экспорт", onClick: () => console.log("Экспорт") }
    ],
    refetchOnMount: false,
    enableFilters: true
}