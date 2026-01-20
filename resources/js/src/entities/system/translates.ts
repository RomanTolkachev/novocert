import type { ISystem } from "./model";

export const translations: Record<keyof ISystem, string> = {
    id: "ID системы",
    gid: "GID системы",
    system_name: "Наименование системы сертификации",
    system_cert_number: "Номер сертификата СДС",
    accreditation: "Область распространения системы (объекты сертификации)",
    applicant: "Заявитель",
    bus_begin: "Дата регистрации",
    bus_end: "Дата окончания действия (бизнес)",
    img_path: "Путь к изображению",
    organ_status_: "Статус органа сертификации",
    organs_count: "Количество органов сертификации",
    documents_count: "Количество сертификатов",
    owner__gid: "GID владельца",
    owner__inn: "ИНН / ОГРН владельца",
    owner__ogrn: "ОГРН владельца",
    owner__short_name: "Владелец СДС",
    owner__logo_path: "Путь к логотипу владельца",
    status__gid: "GID статуса системы",
    status__name: "Статус СДС",
    docum_web_reference: "ссылка"
};