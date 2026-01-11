
import { translations, type IOrgan } from "@/entities/organ";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<IOrgan> = {
    dataUrl: '/admin/get-organs-list',
    filtersUrl: "/admin/get-organs-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: ["organ_name", "organ_status_", "identifier"],
    hiddenColumns: [
        "cli_jur__laravel_through_key", 
        "gid", "status__gid", "cli_table__gid", 
        "cli_jur__cli", "organ_reestr_system_", "cli",
        'type__img_path', "type__gid", "cli_table__logo_path", "status__name"
    ],
    actions: [
        // { label: "Добавить компанию", onClick: () => console.log("Добавить компанию") },
        // { label: "Экспорт", onClick: () => console.log("Экспорт") }
    ],
    refetchOnMount: false,
    enableFilters: true
}