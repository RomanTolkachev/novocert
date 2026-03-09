import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import type { ICustomSubmitHandlerContext, TFormValues } from "@/widgets/table-with-filters/model";
import { CustomSubmitHandlerContext } from "@/widgets/table-with-filters/api/CustomFormProvider";
import { FormProvider, useForm } from "react-hook-form";
import type { IForm2Config } from "./model";
import { filterEmptyObjectValues } from "@/widgets/table-with-filters/lib";

export type Form2FormProviderProps = PropsWithChildren<{
    config: IForm2Config;
    onSubmit?: (formData: Record<string, unknown>) => void | Promise<void>;
}>;

export const Form2FormProvider = ({ config, onSubmit, children }: Form2FormProviderProps) => {
    const [DevToolComponent, setDevToolComponent] = useState<null | React.FC<{ control: unknown }>>(null);

    useEffect(() => {
        if (import.meta.env.MODE === "development") {
            import("@hookform/devtools")
                .then((mod) => setDevToolComponent(() => mod.DevTool))
                .catch(() => null);
        }
    }, []);

    const absoluteDefaults = useMemo<TFormValues>(() => {
        const fromFields = config.fields.reduce(
            (acc, item) => ({ ...acc, [item.headerLabel]: item.defaultValue ?? "" }),
            {} as Record<string, string>
        );
        return { ...fromFields, page: "1", perPage: "10" };
    }, [config.fields]);

    const methods = useForm<TFormValues>({
        mode: "onChange",
        defaultValues: absoluteDefaults,
        shouldUnregister: false,
    });

    const { getValues, reset, setValue, formState: { dirtyFields } } = methods;
    const control = methods.control;

    const customSubmitHandler = async (formData: TFormValues): Promise<void> => {
        const filtered = filterEmptyObjectValues(formData);
        if (onSubmit) {
            await onSubmit(filtered);
        }
        Object.entries(filtered).forEach(([key, value]) => {
            setValue(key, value, { shouldDirty: false, shouldTouch: false });
        });
    };

    const customResetHandler = async (perPage?: string): Promise<void> => {
        const defaults = { ...absoluteDefaults, perPage: perPage ?? absoluteDefaults.perPage };
        reset(defaults);
    };

    const customResetField = (fieldName: string): void => {
        const defaultValue = absoluteDefaults[fieldName];
        setValue(fieldName, defaultValue, { shouldDirty: true, shouldTouch: false });
        const currentValues = getValues();
        const newValues = { ...filterEmptyObjectValues(currentValues), [fieldName]: defaultValue };
        customSubmitHandler(newValues);
    };

    const contextValue: ICustomSubmitHandlerContext = {
        customSubmitHandler,
        customResetHandler,
        customResetField,
        filtersData: config.fields,
        absoluteDefaults,
    };

    return (
        <CustomSubmitHandlerContext.Provider value={contextValue}>
            <FormProvider {...methods}>
                {children}
                {DevToolComponent && <DevToolComponent control={control} />}
            </FormProvider>
        </CustomSubmitHandlerContext.Provider>
    );
};
