import { useState, type FC, type SyntheticEvent } from "react";
import { Controller, type Control, type UseFormRegister } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Accordion, AccordionSummary, AccordionDetails, Typography, useTheme } from "@mui/material";
import type { IFilterListItem } from "../../model";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
    filterData: IFilterListItem;
    control: Control;
    register: UseFormRegister<Record<string, any>>;
};

export const CheckBoxInput: FC<Props> = ({ filterData, control }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const theme = useTheme();

    const handleChange =
        (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const borderColor = `rgba(${theme.palette.mode === "dark" ? "255,255,255" : "0,0,0"},0.23)`;
    const borderHover = `rgba(${theme.palette.mode === "dark" ? "255,255,255" : "0,0,0"},0.87)`;

    return (
        <Accordion
            expanded={expanded === filterData.headerLabel}
            onChange={handleChange(filterData.headerLabel)}
            disableGutters
            //@ts-ignore
            style={{ "--Paper-overlay": "none" }}
            //@ts-check
            square
            sx={{
                borderRadius: 1,
                bgcolor: theme.palette.background.paper,
                boxShadow: "none",
                border: `1px solid ${borderColor}`,
                "&:hover": { borderColor: borderHover },
                "&.Mui-expanded": { borderColor: theme.palette.primary.main, margin: 0 },
                "& .MuiAccordion-region": {
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                },
                px: 0
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    // px: 1.5,
                    py: 1.5,
                    minHeight: 40,
                    "& .MuiAccordionSummary-content": { margin: 0 },
                    color: theme.palette.text.secondary,

                }}
            >
                <Typography>{filterData.headerLabelTranslate}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{
                bgcolor: theme.palette.background.paper,
                pl: 1, pr: 0, py: 0,
                maxHeight: filterData.values && filterData.values.length > 2 ? 120 : "auto", // ~2 чекбокса высота
                overflowY: filterData.values && filterData.values.length > 2 ? "auto" : "visible",
            }}>
                <FormGroup>
                    <Controller
                        name={filterData.headerLabel}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => {
                            const valuesArray: string[] = Array.isArray(field.value) ? field.value : [];

                            return (
                                <FormGroup>
                                    {filterData.values?.map((option) => (
                                        <FormControlLabel
                                            key={String(option)}
                                            label={String(option)}
                                            control={
                                                <Checkbox
                                                    name={field.name}
                                                    checked={valuesArray.includes(option)}
                                                    onChange={(e) => {
                                                        const next = e.target.checked
                                                            ? [...valuesArray, option]
                                                            : valuesArray.filter((v) => v !== option);
                                                        field.onChange(next);
                                                    }}
                                                    value={option}
                                                    inputProps={{ "aria-label": String(option) }}
                                                />
                                            }
                                        />
                                    ))}
                                </FormGroup>
                            );
                        }}
                    />
                </FormGroup>
            </AccordionDetails>
        </Accordion>

    );
};
