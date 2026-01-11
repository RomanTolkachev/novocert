import { translations, type ISystem } from "@/entities/system";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ISystem> = {
    dataUrl: '/admin/get-system-list',
    filtersUrl: "/admin/get-system-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: ["cert_system_name", "status__name", "cert_number", "bus_begin", "bus_end", "accreditation", 'documents_count', "organs_count", "organ_status_", "img_path", 'cert_system_name', ],
    hiddenColumns: [
        "gid", "status__gid", "organ_status_", "docum_web_reference", 
    ],
    actions: [
    ],
    refetchOnMount: false,
    enableFilters: true
}