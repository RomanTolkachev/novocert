import { createContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import type { ICustomSubmitHandlerContext, IFilterListItem, ITableConfig, QueryParams, TFormValues } from "../model";
import { useParamsCustom } from "@/shared";
import { FormProvider, useForm } from "react-hook-form";
import { filterEmptyObjectValues } from "../lib";

export const CustomSubmitHandlerContext = createContext<ICustomSubmitHandlerContext | undefined>(undefined);

export type Props<T extends Record<string, any>> = {
    config: ITableConfig<T>
    filters: IFilterListItem[]
}

export const CustomFormProvider = <T extends Record<string, any>>({
    filters,
    children
}: PropsWithChildren<Props<T>>) => {

    const [setQuery, getQuery] = useParamsCustom();
    const debounceTimeoutRef = useRef<number | null>(null);

    // DevTools
    const [DevToolComponent, setDevToolComponent] = useState<null | React.FC<{ control: any }>>(null);
    useEffect(() => {
        if (import.meta.env.MODE === 'development') {
            import('@hookform/devtools').then((mod) => {
                setDevToolComponent(() => mod.DevTool);
            }).catch(() => "DevTools not found");
        }
    }, []);

    const absoluteDefaults = useMemo<TFormValues>(() => ({
        ...filters.reduce((acc, item) => ({ ...acc, [item.headerLabel]: item.defaultValue }), {}),
        page: "1",
        perPage: "10"
    }), [filters]);

    const currentDefaults = useMemo(() => ({
        ...absoluteDefaults,
        ...getQuery()
    }), [absoluteDefaults, JSON.stringify(getQuery())]);

    const methods = useForm<TFormValues>({
        mode: "onChange",
        defaultValues: absoluteDefaults,
        values: currentDefaults,
        shouldUnregister: false
    });

    const { getValues, reset, setValue, control, formState: {dirtyFields} } = methods;

    const customSubmitHandler = async (formData: TFormValues, debounceTime?: number): Promise<void> => {
        formData = filterEmptyObjectValues(formData);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }

        const runSubmit = () => {
            const hasDirtyFilters = Object.keys(dirtyFields).some(
                key => key !== "page" && key !== "perPage"
            );

            const newPage = hasDirtyFilters ? 1 : formData.page ?? 1;

            const newQuery: QueryParams = {
                ...formData,
                page: newPage,
            };

            setQuery(newQuery, false);

            Object.entries(newQuery).forEach(([key, value]) => {
                setValue(key as any, value, { shouldDirty: false, shouldTouch: false });
            });
        };

        if (debounceTime && debounceTime > 0) {
            debounceTimeoutRef.current = window.setTimeout(runSubmit, debounceTime);
        } else {
            runSubmit();
        }
    };

    const customResetHandler = async (perPage: TFormValues["perPage"]): Promise<void> => {
        reset(absoluteDefaults);
        setQuery(filterEmptyObjectValues({ ...absoluteDefaults, perPage }));
    };

    const customResetField = (fieldName: keyof TFormValues): void => {
        const defaultValue = absoluteDefaults[fieldName];
        setValue(fieldName as string, defaultValue, { shouldDirty: true, shouldTouch: false });

        const currentValues = getValues();
        const newValues = { ...filterEmptyObjectValues(currentValues), [fieldName]: defaultValue };

        customSubmitHandler(newValues);
    };

    return (
        <CustomSubmitHandlerContext.Provider
            value={{
                customSubmitHandler,
                customResetHandler,
                customResetField,
                filtersData: filters ?? [],
                absoluteDefaults
            }}>
            <FormProvider {...methods}>
                {children}
                {DevToolComponent && <DevToolComponent control={control} />}
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    );
};
