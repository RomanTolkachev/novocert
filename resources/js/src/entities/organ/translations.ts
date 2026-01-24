import type { IOrgan } from "./model";

export const translations: Record<keyof IOrgan, string> = {
    gid: "ID",
    organ_name: "Орган по сертификации",
    organ_number: "Регистрационный номер аттестата ОС",
    organ_cert_begin_date: "Дата регистрации аттестата ОС",
    organ_cert_end_date: "Дата окончания аттестата ОС",
    organ_accreditation_scope: "Область уполномочивания ОС",
    organ_status_: "Статус аттестата ОС",
    bus_begin: "Начало деятельности",
    bus_end: "Окончание деятельности",
    system_name: "Система сертификации",
    system_img_path: "Изображение знака системы",
    legal_short_name: "Заявитель / владелец ОС",
    legal_inn: "ИНН владельца ОС",
    legal_ogrn: "ОГРН владельца ОС",
    legal_logo_path: "Логотип владельца ОС",
    certs_count: "Количество сертификатов ОС",
    docum_web_reference: "Ссылка на ОС"
};
