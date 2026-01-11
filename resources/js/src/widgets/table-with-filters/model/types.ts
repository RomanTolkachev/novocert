import type { IAction } from "@/shared/ui/custom-table";

export interface ITableConfig<T extends Record<string, any>> {
    dataUrl: string;
    filtersUrl: string;
    translations: Record<keyof T, string>;
    columnOrder?: (keyof T)[];
    hiddenColumns?: (keyof T)[];
    withRowActions: boolean

    actions?: IAction[];

    refetchOnMount?: boolean;
    enableFilters?: boolean;
}

export interface IFilterListItem {
    'defaultValue': string,
    'headerLabel': string,
    'order': number,
    'type': "text" | "checkbox" | "date",
    'values'?: string[],
    'headerLabelTranslate': string,
    'tooltip'?: string
}

export type TFormValues = {
    [key: string]: any
}

export type ICustomSubmitHandlerContext = {
    filtersData: IFilterListItem[]
    customSubmitHandler: (formData: Record<string, unknown>, debounceTime?: number) => void
    customResetHandler: (perPage: any) => void
    customResetField: (fieldName: string) => void
    absoluteDefaults: Omit<QueryParams, "perPage">
} | undefined

export interface QueryParams extends Record<string | "page" | "perPage", number | string | string[] | undefined> { }