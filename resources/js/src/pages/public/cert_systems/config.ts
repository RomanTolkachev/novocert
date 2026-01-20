import { translations, type ISystem } from "@/entities/system";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ISystem> = {
    dataUrl: '/public/get-systems-list',
    filtersUrl: "/public/get-systems-list-filters",
    translations: translations,
    withRowActions: false,
    columnOrder: [],
    hiddenColumns: [
        "gid", "id", "owner__gid","status__gid", "bus_end", "applicant", "docum_web_reference",
        "img_path", "owner__logo_path", "owner__ogrn", "organ_status_", "status__name"
    ],
    actions: [
        // { label: "Добавить компанию", onClick: () => console.log("Добавить компанию") },
        // { label: "Экспорт", onClick: () => console.log("Экспорт") }
    ],
    refetchOnMount: false,
    enableFilters: true
}