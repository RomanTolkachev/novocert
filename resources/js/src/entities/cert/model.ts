export interface ICertificate {
    applicant__img: string;
    applicant__jur_tech_end: string;
    applicant__logo: string;
    applicant__short_name: string;
    applicant__tech_end: string;
    cert__bus_begin: string;
    cert__id: string;
    cert__name: string;
    cert__status: string;
    cert__tech_end: string;
    organ__name: string;
    organ__status: string;
    organ__tech_end: string;
    system__img: string;
    system__name: string;
    system__tech_end: string;
    gid: string;
    organ__gid: string;
    deletable?: boolean;
    editable?: boolean;
    hasBusinessCard?: boolean;
}

// Ключи
const CERTIFICATE_KEYS = [
    "applicant__img",
    "applicant__jur_tech_end",
    "applicant__logo",
    "applicant__short_name",
    "applicant__tech_end",
    "cert__bus_begin",
    "cert__id",
    "cert__name",
    "cert__status",
    "cert__tech_end",
    "organ__name",
    "organ__status",
    "organ__tech_end",
    "system__img",
    "system__name",
    "system__tech_end",
    "gid",
    "organ__gid",
] as const;

export type CertificateKeys = typeof CERTIFICATE_KEYS[number];