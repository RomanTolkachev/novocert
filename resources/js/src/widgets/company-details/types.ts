import type { ICompany } from "@/entities/company";
import type { IDoc } from "@/entities/doc";

export interface ICompanyDetailPayload {
    company: ICompany;
    receivedDocs: IDoc[];
    madeDocs: IDoc[];
}

