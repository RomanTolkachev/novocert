import { translations, type IUser } from "@/entities/user";
import type { ITableConfig } from "@/widgets/table-with-filters";

export const config: ITableConfig<IUser> = {
    actions: [
        {
            label: "тестовая",
            onClick: () => console.log("кликнули кнопочку"),
        }
    ],
    dataUrl: "/admin/get-users",
    filtersUrl: "/admin/get-users-filters",
    translations: translations,
    enableFilters: true,
    withRowActions: false,
    refetchOnMount: false,
    columnOrder: ["avatar", "surname", "name", "fathersname", "email"],
    hiddenColumns:
        [
            "email_verified_at",
            "tech_begin",
            "tech_change",
            "tech_create",
            "tech_description",
            "tech_end",
            "tech_source",
            "tech_user",
            "updated_at",
            "status",
            "confirmation",
            "roles__created_at",
            "roles__guard_name",
            "roles__id",
            "roles__updated_at",
            "roles__pivot",
        ]

}