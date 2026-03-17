import type { ICompany } from "@/entities/company";

export interface IDocDetailDoc {
    fb_gid: string;
    fb_name?: string;
    fb_bus_begin?: string;
    fb_bus_end?: string;
    fb_doc_reg_num?: string;
    fb_docum_text?: string;
    fb_img_path?: string;
    fb_logo_path?: string;
    organ_status_liter?: string;
    docum_type_gid?: string;
    docum_type_name?: string;
}

export interface IDocDetailPayload {
    doc: IDocDetailDoc;
    from: ICompany | null;
    to: ICompany | null;
}

