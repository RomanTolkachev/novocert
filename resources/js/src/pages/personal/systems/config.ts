import { translations, type ISystem } from "@/entities/system";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<ISystem> = {
    dataUrl: '/admin/get-system-list',
    filtersUrl: "/admin/get-system-list-filters",
    translations: translations,
    withRowActions: true,
    columnOrder: ["status__name", "bus_begin", "bus_end", "accreditation", 'documents_count', "organs_count", "organ_status_", "img_path", ],
    hiddenColumns: [
        "gid", "status__gid", "organ_status_", "docum_web_reference", 
    ],
    actions: [
    ],
    refetchOnMount: false,
    enableFilters: true
}