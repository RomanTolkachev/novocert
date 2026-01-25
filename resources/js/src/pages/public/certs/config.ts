import { translations, type ICertificate } from "@/entities/cert";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ICertificate> = {
    dataUrl: "/public/get-certs-list",
    filtersUrl: "/public/get-certs-list-filters",
    translations,
    withRowActions: false,
    columnOrder: [
        "cert__name",
        "system__name",
        "organ__name",
        "applicant__short_name",
        "cert__bus_begin",
        "cert__status",
    ],
    hiddenColumns: [
        "cert__id",
        "system__img",
        "applicant__img",
        "applicant__logo",
        "applicant__tech_end",
        "applicant__jur_tech_end",
        "cert__tech_end",
        "system__tech_end",
        "organ__tech_end",
        "hasBusinessCard",
        "cert__status",
        "organ__status"
    ],
    actions: [],
    refetchOnMount: false,
    enableFilters: true,
};
