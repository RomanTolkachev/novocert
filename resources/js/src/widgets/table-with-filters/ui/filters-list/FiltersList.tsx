import { Preloader, useParamsCustom } from "@/shared";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { use, type FC } from "react";
import type { ICustomSubmitHandlerContext } from "../../model";
import { CustomSubmitHandlerContext } from "../../api/CustomFormProvider";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Divider, Typography, useTheme } from "@mui/material";
import { useFormChanges } from "../../lib";
import { CheckBoxInput } from "../input-checkbox";
import { DateRangeInput } from "../input-date";
import { ChipList } from "./ChipList";

function formatSortOptionLabel(value: string, translations?: Partial<Record<string, string>>): string {
    const match = value.match(/^(.+)_(asc|desc)$/);
    if (!match) return value;
    const [, column] = match;
    const dir = value.endsWith("_asc") ? "возр." : "убыв.";
    const columnLabel = translations?.[column] ?? column;
    return `${columnLabel} (${dir})`;
}

export const FiltersList: FC = () => {
    const theme = useTheme();
    const filterContext = use<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext);
    const { register, getValues, control, handleSubmit, formState: { isDirty, dirtyFields, isSubmitting } } = useFormContext();

    const [_, getQuery] = useParamsCustom();
    const queries = getQuery();

    const { hasChanges: absoluteDirty } = useFormChanges({ excludeFields: ["perPage", ...Object.keys(dirtyFields)], ignoreCompareFields: ["perPage"] }, filterContext?.absoluteDefaults);

    if (!filterContext || !filterContext.filtersData?.length) {
        return <Preloader />;
    }

    const { filtersData } = filterContext;

    const { page, perPage, ...queriesNoPagination } = queries;
    const pickList = Object.keys(queriesNoPagination ?? {});
    const chips = filtersData.filter(f => pickList.includes(f.headerLabel));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: 0,
            }}
        >
            {/* Формa: занимает всё доступное пространство, внутри — скроллимая часть */}
            <Box
                component="form"
                onSubmit={handleSubmit((data) => filterContext.customSubmitHandler(data))}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    pl: 2.5,
                    pt: 2,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {/* Scrollable area: только тут прокрутка */}
                <Box
                    sx={{
                        flex: 1,
                        overflow: "auto",
                        scrollbarGutter: "stable",
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        pt: 1,
                        pr: .4,
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {filtersData.map((filter) => {
                        switch (filter.type) {
                            case "text":
                                return (
                                    <TextField
                                        key={filter.headerLabel}
                                        {...register(filter.headerLabel)}
                                        label={filter.headerLabelTranslate}
                                        fullWidth
                                        defaultValue=""
                                        variant="outlined"
                                        size="medium"
                                    />
                                );
                            case "checkbox":
                                return (
                                    <CheckBoxInput key={filter.headerLabel} control={control} filterData={filter} register={register} />
                                );
                            case "date":
                                return (
                                    <DateRangeInput key={filter.headerLabel} name={filter.headerLabel} label={filter.headerLabelTranslate} />
                                );
                            case "select":
                                return (
                                    <Controller
                                        key={filter.headerLabel}
                                        name={filter.headerLabel}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth variant="outlined" size="medium">
                                                <InputLabel
                                                    id={`${filter.headerLabel}-label`}
                                                    sx={{
                                                        "&.MuiInputLabel-root": {
                                                            fontSize: theme.typography.body1.fontSize,
                                                            "&.MuiInputLabel-shrink": {
                                                                fontSize: theme.typography.body1.fontSize,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {filter.headerLabelTranslate}
                                                </InputLabel>
                                                <Select
                                                    {...field}
                                                    labelId={`${filter.headerLabel}-label`}
                                                    label={filter.headerLabelTranslate}
                                                    value={field.value ?? filter.defaultValue ?? ""}
                                                    variant="outlined"
                                                    sx={{
                                                        "& .MuiSelect-select": {
                                                            typography: "body1",
                                                        },
                                                    }}
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                bgcolor:
                                                                    theme.palette.mode === "dark"
                                                                        ? theme.palette.background.default
                                                                        : theme.palette.background.paper,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {(filter.values ?? []).map((optionValue: string) => (
                                                        <MenuItem key={optionValue} value={optionValue}>
                                                            {formatSortOptionLabel(optionValue, filterContext.translations)}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                );
                            default:
                                return null;
                        }
                    })}
                </Box>

                {chips.length ? <Divider sx={{ mr: 3.2 }} /> : null}
                <Box sx={{ pt: 1, flexShrink: 0, maxHeight: 200, overflow: "auto", scrollbarGutter: "stable" }}>
                    <ChipList list={chips} onDeleteFn={filterContext.customResetField} />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexShrink: 0,
                        pt: 1,
                        alignItems: "center",
                    }}
                >
                    <Button
                        sx={{ minHeight: 0 }}
                        disabled={!isDirty}
                        type="submit"
                        variant="contained"
                    >
                        <Typography>применить</Typography>
                    </Button>

                    <Button
                        sx={{ minHeight: 0 }}
                        disabled={!absoluteDirty || isSubmitting}
                        color="warning"
                        variant="contained"
                        onClick={() => filterContext.customResetHandler(getValues("perPage"))}
                    >
                        <Typography>сбросить</Typography>
                    </Button>
                </Box>
            </Box>


        </Box>
    );
};
