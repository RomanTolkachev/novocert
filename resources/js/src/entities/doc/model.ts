export const DOC_KEYS = [
    "fb_gid",
    "fb_name",
    "fb_bus_begin",
    "fb_bus_end",
    "fb_doc_reg_num",
    "fb_docum_text",
    "fb_img_path",
    "fb_logo_path",
    "organ_status_liter",
    "docum_type_gid",
    "docum_type_name",
    "from_gid",
    "from_inn",
    "from_ogrn",
    "from_short_name",
    "from_logo_path",
    "to_short_name",
    "to_inn",
    "to_ogrn",
    "to_logo_path",
    "to_gid",
] as const;

export type DocKeys = typeof DOC_KEYS[number];

export interface IDoc {
    fb_gid: string;
    fb_name: string;
    fb_bus_begin: string;
    fb_bus_end: string;
    fb_doc_reg_num: string;
    fb_docum_text: string;
    fb_img_path: string;
    fb_logo_path: string;
    organ_status_liter: string;
    docum_type_gid: string;
    docum_type_name: string;
    from_gid: string;
    from_inn: string;
    from_ogrn: string;
    from_short_name: string;
    from_logo_path: string;
    to_short_name: string;
    to_inn: string;
    to_ogrn: string;
    to_logo_path: string;
    to_gid: string;
}
