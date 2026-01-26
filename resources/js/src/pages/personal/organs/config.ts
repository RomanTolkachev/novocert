
import { translations, type IOrgan } from "@/entities/organ";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<IOrgan> = {
    dataUrl: '/admin/get-organs-list',
    filtersUrl: "/admin/get-organs-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: ["organ_name", "organ_status_"],
    hiddenColumns: [

    ],
    actions: [
        // { label: "Добавить компанию", onClick: () => console.log("Добавить компанию") },
        // { label: "Экспорт", onClick: () => console.log("Экспорт") }
    ],
    refetchOnMount: false,
    enableFilters: true
}