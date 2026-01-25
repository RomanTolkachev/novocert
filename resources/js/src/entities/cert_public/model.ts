export interface ICertificatePublic {
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
    gid: string
    id: string

    // опциональные поля (если понадобятся в UI/CRUD)
    deletable?: boolean;
    editable?: boolean;
    hasBusinessCard?: boolean;
}