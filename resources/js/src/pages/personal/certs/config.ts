import { translations, type ICertificate } from "@/entities/cert";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ICertificate> = {
    dataUrl: '/admin/get-certs-list',
    filtersUrl: "/admin/get-certs-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: [],
    hiddenColumns: [
        "cert__id", "system__img", 
        "applicant__img", 'applicant__logo', 
        "applicant__tech_end", "applicant__jur_tech_end", 
        "cert__tech_end", "system__tech_end", "organ__tech_end",
        "cert__status", "organ__status"
    ],
    actions: [
        // { label: "Добавить компанию", onClick: () => console.log("Добавить компанию") },
        // { label: "Экспорт", onClick: () => console.log("Экспорт") }
    ],
    refetchOnMount: false,
    enableFilters: true
}