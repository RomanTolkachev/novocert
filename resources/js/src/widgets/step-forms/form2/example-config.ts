import type { IForm2Config } from "./model";

/**
 * Пример конфига Form2.
 * columns: 3 → grid-template-columns: 1fr 1fr 1fr
 * rows: 4 → grid-template-rows: 1fr 1fr 1fr 1fr
 * position: { colSpan, rowSpan } → grid-column: span N, grid-row: span N
 */
export const exampleForm2Config: IForm2Config = {
    rows: 4,
    columns: 3,
    fields: [
        {
            headerLabel: "field1",
            headerLabelTranslate: "Поле 1",
            type: "text",
            order: 0,
            defaultValue: "",
            position: { colSpan: 1, rowSpan: 1 },
        },
        {
            headerLabel: "field2",
            headerLabelTranslate: "Поле 2 (широкое)",
            type: "text",
            order: 1,
            defaultValue: "",
            position: { colSpan: 2, rowSpan: 1 },
        },
        {
            headerLabel: "field3",
            headerLabelTranslate: "Поле 3 (высокое)",
            type: "date",
            order: 2,
            defaultValue: "",
            position: { colSpan: 1, rowSpan: 2 },
        },
    ],
};
