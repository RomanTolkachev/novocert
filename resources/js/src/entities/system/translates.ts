import type { ISystem } from "./model";

export const translations: Record<keyof ISystem, string> = {
    gid: "_gid",
    cert_number: "Номер свидетельства СДС",
    accreditation: "Область распространения системы (объекты сертификации)",
    bus_begin: "Дата регистрации",
    bus_end: "Дата окончания",
    img_path: "_img_path",
    cli_name: "Владелец СДС",
    organ_status_: "Статус органа СДС",
    organs_count: "Количество ОС СДС",
    documents_count: "Количество сертификатов в СДС",
    cert_system_name: "Наименование системы сертификации",
    status__gid: "_status__gid",
    status__name: "Статус СДС",
    docum_web_reference: "Ссылка на систему",
};