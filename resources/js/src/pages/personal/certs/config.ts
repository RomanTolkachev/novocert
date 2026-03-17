import { translations, type ICertificate } from "@/entities/cert";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ICertificate> = {
    dataUrl: '/admin/get-certs-list',
    filtersUrl: "/admin/get-certs-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: [
        "cert__name",
        "cert__bus_begin",
        "cert__bus_end",
        "system__name",
        "organ__name",
        "applicant__short_name",
        "cert__status",
    ],
    hiddenColumns: [
        "cert__id", "system__img", 
        "applicant__img", 'applicant__logo', 
        "applicant__tech_end", "applicant__jur_tech_end", 
        "applicant__inn", "applicant__ogrn",
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