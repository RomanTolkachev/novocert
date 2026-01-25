import type { ICertificatePublic } from "./model";

export const translations: Record<keyof ICertificatePublic, string> = {
    applicant__img: "Изображение заявителя",
    applicant__jur_tech_end: "applicant__jur_tech_end",
    applicant__logo: "Логотип заявителя",
    applicant__short_name: "Заявитель",
    applicant__tech_end: "applicant__tech_end",

    cert__bus_begin: "Дата регистрации",
    cert__id: "id",
    cert__name: "Наименование",
    cert__status: "Статус",
    cert__tech_end: "cert__tech_end",

    organ__name: "Орган по сертификации",
    organ__status: "Статус органа",
    organ__tech_end: "organ__tech_end",

    system__img: "Изображение системы",
    system__name: "Система сертификации",
    system__tech_end: "system__tech_end",

    deletable: "Действия",
    editable: "Действия",
    hasBusinessCard: "Действия",
    id: "id",
    gid: "gid",
};
