import type { IFeedback } from "./model";

export const translations: Record<keyof IFeedback, string> = {
    name: "Наименование",
    gid: "ID",
    docum_status_: "Статус",
    docum_type_: "Тип документа",
    cli_from: "ID от",
    cli_to: "ID кому",
    to__gid: "ID организации кому",
    to__ogrn: "ОГРН кому",
    to__inn: "ИНН кому",
    to__img_path: "Логотип кому",
    from__gid: "ID организации от",
    from__ogrn: "ОГРН от",
    from__inn: "ИНН от",
    from__img_path: "Логотип от",
    to_jur__gid: "ID юр.лица кому",
    to_jur__short_name: "Кому",
    to_jur__laravel_through_key: "Служебный ключ кому",
    from_jur__gid: "ID юр.лица от",
    from_jur__short_name: "От кого",
    from_jur__laravel_through_key: "Служебный ключ от",
    bus_begin: "Дата добавления"
}