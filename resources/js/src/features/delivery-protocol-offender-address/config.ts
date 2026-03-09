import type { IForm2Config } from "@/widgets";

/**
 * Конфиг Form2 для шага "Адрес правонарушителя" в протоколе доставки.
 */
export const deliveryProtocolOffenderAddressConfig: IForm2Config = {
    rows: 4,
    columns: 3,
    fields: [
        {
            headerLabel: "region",
            headerLabelTranslate: "Регион / Субъект",
            type: "text",
            order: 0,
            defaultValue: "",
            position: { colSpan: 2, rowSpan: 1 },
        },
        {
            headerLabel: "city",
            headerLabelTranslate: "Город",
            type: "text",
            order: 1,
            defaultValue: "",
            position: { colSpan: 1, rowSpan: 1 },
        },
        {
            headerLabel: "street",
            headerLabelTranslate: "Улица",
            type: "text",
            order: 2,
            defaultValue: "",
            position: { colSpan: 3, rowSpan: 1 },
        },
        {
            headerLabel: "building",
            headerLabelTranslate: "Дом",
            type: "text",
            order: 3,
            defaultValue: "",
            position: { colSpan: 1, rowSpan: 1 },
        },
        {
            headerLabel: "apartment",
            headerLabelTranslate: "Квартира",
            type: "text",
            order: 4,
            defaultValue: "",
            position: { colSpan: 1, rowSpan: 1 },
        },
        {
            headerLabel: "postal_code",
            headerLabelTranslate: "Индекс",
            type: "text",
            order: 5,
            defaultValue: "",
            position: { colSpan: 1, rowSpan: 1 },
        },
    ],
};
