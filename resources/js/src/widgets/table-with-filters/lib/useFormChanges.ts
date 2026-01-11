import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { isEqual } from "lodash";

interface UseFormChangesOptions {
    excludeFields?: string[];
    includeOnly?: string[];
    ignoreCompareFields?: string[];
}

interface FieldChangeInfo {
    current: any;
    default: any;
    hasChanged: boolean;
}

interface UseFormChangesReturn {
    changes: Record<string, FieldChangeInfo>;
    changedValues: Record<string, any>;
    hasChanges: boolean;
    changesCount: number;
    isFieldChanged: (fieldName: string) => boolean;
    getFieldChange: (fieldName: string) => FieldChangeInfo | undefined;
}

/**
 * Хук сравнивает текущие значения формы с дефолтными.
 * Дефолты берутся из externalDefaults (если переданы) или из formState.defaultValues.
 * Добавлен детальный дебаг для отслеживания, почему поля считаются изменёнными.
 */
export const useFormChanges = (
    options: UseFormChangesOptions = {},
    externalDefaults?: Record<string, any>
): UseFormChangesReturn => {
    const {
        excludeFields = [],
        includeOnly = [],
        ignoreCompareFields = [],
    } = options;

    const { control, formState } = useFormContext();
    const formDefaults = formState?.defaultValues ?? {};
    const chosenDefaults = externalDefaults ?? formDefaults ?? {};

    const currentValues = useWatch({ control }) as Record<string, any> | undefined;

    const changedFields = useMemo(() => {
        const result: Record<string, FieldChangeInfo> = {};

        let fieldsToCheck: string[] = [];
        if (includeOnly.length > 0) {
            fieldsToCheck = includeOnly.filter(f => !excludeFields.includes(f));
        } else {
            const defKeys = Object.keys(chosenDefaults || {});
            const currKeys = Object.keys(currentValues || {});
            const union = Array.from(new Set([...defKeys, ...currKeys]));
            fieldsToCheck = union.filter(f => !excludeFields.includes(f));
        }

        fieldsToCheck.forEach((key) => {
            const current = currentValues ? currentValues[key] : undefined;
            const def = chosenDefaults ? chosenDefaults[key] : undefined;

            if (ignoreCompareFields.includes(key)) {
                result[key] = { current, default: def, hasChanged: false };
                return;
            }

            const normalizedCurrent = normalizeValue(current);
            const normalizedDefault = normalizeValue(def);

            const changed = !isEqual(normalizedCurrent, normalizedDefault);

            result[key] = { current, default: def, hasChanged: changed };

        });

        return result;
    }, [currentValues, chosenDefaults, excludeFields, includeOnly, ignoreCompareFields]);

    const changedValues = useMemo(() => {
        const res: Record<string, any> = {};
        Object.keys(changedFields).forEach((k) => {
            if (changedFields[k].hasChanged) {
                res[k] = changedFields[k].current;
            }
        });
        return res;
    }, [changedFields]);

    const hasChanges = Object.values(changedFields).some((f) => f.hasChanged);
    const changesCount = Object.values(changedFields).filter((f) => f.hasChanged).length;

    return {
        changes: changedFields,
        changedValues,
        hasChanges,
        changesCount,
        isFieldChanged: (fieldName) => changedFields[fieldName]?.hasChanged ?? false,
        getFieldChange: (fieldName) => changedFields[fieldName],
    };
};

function normalizeValue(value: any): any {
    if (value === undefined || value === null) return undefined;
    if (Array.isArray(value)) return value.map((v) => (v === null || v === undefined ? "" : normalizeValue(v)));
    if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
    if (typeof value === "string") return value.trim();
    return value;
}
