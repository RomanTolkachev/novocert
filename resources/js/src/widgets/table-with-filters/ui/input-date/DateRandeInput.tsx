import { useState, type FC, type SyntheticEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
    name: string;
    label: string;
};

export const DateRangeInput: FC<Props> = ({ name, label }) => {
    const theme = useTheme();
    const { control } = useFormContext();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (_: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    const borderColor = `rgba(${theme.palette.mode === "dark" ? "255,255,255" : "0,0,0"},0.23)`;
    const borderHover = `rgba(${theme.palette.mode === "dark" ? "255,255,255" : "0,0,0"},0.87)`;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={["", ""] as [string, string]}
            render={({ field: { value, onChange } }) => (
                <Accordion
                    expanded={expanded}
                    onChange={handleChange}
                    disableGutters
                    // отключаем MUI Overlay как в CheckboxInput
                    // @ts-ignore
                    style={{ "--Paper-overlay": "none" }}
                    square
                    sx={{
                        borderRadius: 1,
                        bgcolor: theme.palette.background.paper,
                        boxShadow: "none",
                        border: `1px solid ${borderColor}`,
                        transition: "border-color 0.2s ease",
                        "&:hover": { borderColor: borderHover },
                        "&.Mui-expanded": { borderColor: theme.palette.primary.main, margin: 0 },
                        px: 0
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            py: 1.5,
                            minHeight: 40,
                            "& .MuiAccordionSummary-content": { margin: 0 },
                            color: theme.palette.text.secondary
                        }}
                    >
                        <Typography>{label}</Typography>
                    </AccordionSummary>

                    <AccordionDetails
                        sx={{
                            bgcolor: theme.palette.background.paper,
                            px: 1,
                            py: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}
                    >
                        <TextField
                            label={`( начало )`}
                            type="date"
                            value={value[0]}
                            onChange={(e) => {
                                const next = [...value] as [string, string];
                                next[0] = e.target.value;
                                onChange(next);
                            }}
                            slotProps={{ inputLabel: { shrink: true } }}
                            fullWidth
                        />

                        <TextField
                            label={`( окончание )`}
                            type="date"
                            value={value[1]}
                            onChange={(e) => {
                                const next = [...value] as [string, string];
                                next[1] = e.target.value;
                                onChange(next);
                            }}
                            slotProps={{ inputLabel: { shrink: true } }}
                            fullWidth
                        />
                    </AccordionDetails>
                </Accordion>
            )}
        />
    );
};
