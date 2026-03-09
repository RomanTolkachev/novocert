import type { IFilterListItem } from "@/widgets/table-with-filters/model";

/**
 * Положение элемента в CSS Grid.
 * Маппится на grid-column и grid-row.
 */
export interface IGridPosition {
    colSpan?: number;
    rowSpan?: number;
}

/**
 * Поле формы Form2 с поддержкой позиционирования в grid.
 */
export interface IForm2FieldConfig extends IFilterListItem {
    position?: IGridPosition;
}

/**
 * Конфиг Form2: управление grid-сеткой из конфига.
 */
export interface IForm2Config {
    rows: number;
    columns: number;
    fields: IForm2FieldConfig[];
}
