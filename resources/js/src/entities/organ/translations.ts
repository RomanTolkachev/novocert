import type { IOrgan } from "./model";

export const translations: Record<keyof IOrgan, string> = {
    gid: "ID",
    organ_name: "Наименование ОС",
    organ_reestr_system_: "Система сертификации",
    organ_status_: "Статус аттестата ОС",
    bus_begin: "Начало деятельности",
    bus_end: "Окончание деятельности",
    identifier: "Регистрационный номер аттестата ОС",
    organ_accreditation_scope: "Область уполномочивания ОС",
    cli: "ID владельца ОС",
    certs_count: "Количество сертификатов ОС",
    type__gid: "ID системы сертификации",
    type__img_path: "Изображение знака системы",
    type__cert_system_name: "Наименование системы сертификации",
    status__gid: "ID статуса",
    status__name: "Статус",
    cli_table__gid: "ID ЮЛ (владелец ОС)",
    cli_table__inn: "ИНН владельца ОС",
    cli_table__ogrn: "ОГРН владельца ОС",
    cli_table__logo_path: "Изображение логотипа ЮЛ",
    cli_jur__cli: "ID ЮЛ владельца ОС",
    cli_jur__short_name: "Сокращенное наименование ЮЛ владельца ОС",
    cli_jur__laravel_through_key: "тех. ключ"
};