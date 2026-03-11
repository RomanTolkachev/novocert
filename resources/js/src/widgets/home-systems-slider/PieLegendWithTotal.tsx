import type { FC } from "react";
import { Box, Typography } from "@mui/material";

export type LegendItem = {
    label: string;
    value: number;
    color: string;
};

type Props = {
    items: LegendItem[];
    total: number;
    unit?: string;
};

export const PieLegendWithTotal: FC<Props> = ({ items, total, unit = "шт." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.25,
                mt: 0.5,
            }}
        >
            {items.map((item) => (
                <Box
                    key={item.label}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            flexShrink: 0,
                        }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        {item.label}
                    </Typography>
                </Box>
            ))}
            <Typography variant="caption" color="text.disabled" sx={{ mt: 0.25 }}>
                Всего: {total} {unit}
            </Typography>
        </Box>
    );
};
