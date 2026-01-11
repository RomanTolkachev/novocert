import { translations, type IFeedback } from "@/entities/feedback";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<IFeedback> = {
    dataUrl: '/admin/get-feedbacks-list',
    filtersUrl: "/admin/get-feedbacks-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: [],
    hiddenColumns: [
        "gid", 'docum_status_', "docum_type_", 
        "from__gid", "to__gid", "from__img_path", "from_jur__gid",
        "to__img_path", "cli_from", "cli_to",
        "to_jur__gid", "from_jur__laravel_through_key",
        "to_jur__laravel_through_key"
    ],
    actions: [
        // { label: "Добавить компанию", onClick: () => console.log("Добавить компанию") },
        // { label: "Экспорт", onClick: () => console.log("Экспорт") }
    ],
    refetchOnMount: false,
    enableFilters: true
}