import { Preloader, useParamsCustom } from "@/shared";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { use, type FC } from "react";
import type { ICustomSubmitHandlerContext } from "@/widgets/table-with-filters/model";
import { CustomSubmitHandlerContext } from "@/widgets/table-with-filters/api/CustomFormProvider";
import { useFormContext } from "react-hook-form";
import { Button, Divider, Typography } from "@mui/material";
import { useFormChanges } from "@/widgets/table-with-filters/lib";
import { CheckBoxInput } from "@/widgets/table-with-filters/ui/input-checkbox";
import { DateRangeInput } from "@/widgets/table-with-filters/ui/input-date";
import { ChipList } from "@/widgets/table-with-filters/ui/filters-list/ChipList";
import type { IForm2Config } from "./model";
import { gridPositionToCss } from "./lib";

type Form2Props = {
    config: IForm2Config;
};

export const Form2: FC<Form2Props> = ({ config }) => {

    const filterContext = use<ICustomSubmitHandlerContext>(CustomSubmitHandlerContext);
    const { register, getValues, control, handleSubmit, formState: { isDirty, dirtyFields, isSubmitting } } = useFormContext();

    const [_, getQuery] = useParamsCustom();
    const queries = getQuery();

    const { hasChanges: absoluteDirty } = useFormChanges({ excludeFields: ["perPage", ...Object.keys(dirtyFields)], ignoreCompareFields: ["perPage"] }, filterContext?.absoluteDefaults);

    if (!filterContext) {
        return <Preloader />;
    }

    const { filtersData } = filterContext;
    const fields = config.fields?.length ? config.fields : filtersData;

    const { page, perPage, ...queriesNoPagination } = queries;
    const pickList = Object.keys(queriesNoPagination ?? {});
    const chips = fields.filter((f) => pickList.includes(f.headerLabel));

    const gridTemplateColumns = `repeat(${config.columns}, 1fr)`;
    const gridTemplateRows = `repeat(${config.rows}, 1fr)`;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                minHeight: 0,
            }}
        >
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
                <Box
                    sx={{
                        flex: 1,
                        overflow: "auto",
                        scrollbarGutter: "stable",
                        minHeight: 0,
                        pt: 1,
                        pr: 0.4,
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns,
                            gridTemplateRows,
                            gap: 1,
                        }}
                    >
                        {fields.map((filter) => {
                            const positionStyles = gridPositionToCss(filter.position);

                            const renderField = () => {
                                switch (filter.type) {
                                    case "text":
                                        return (
                                            <TextField
                                                key={filter.headerLabel}
                                                {...register(filter.headerLabel)}
                                                label={filter.headerLabelTranslate}
                                                fullWidth
                                                defaultValue=""
                                            />
                                        );
                                    case "checkbox":
                                        return (
                                            <CheckBoxInput
                                                key={filter.headerLabel}
                                                control={control}
                                                filterData={filter}
                                                register={register}
                                            />
                                        );
                                    case "date":
                                        return (
                                            <DateRangeInput
                                                key={filter.headerLabel}
                                                name={filter.headerLabel}
                                                label={filter.headerLabelTranslate}
                                            />
                                        );
                                    default:
                                        return null;
                                }
                            };

                            return (
                                <Box key={filter.headerLabel} sx={positionStyles}>
                                    {renderField()}
                                </Box>
                            );
                        })}
                    </Box>
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
