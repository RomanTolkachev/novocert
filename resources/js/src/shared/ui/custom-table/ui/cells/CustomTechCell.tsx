import { type CellContext } from "@tanstack/react-table";
import { Box, IconButton } from "@mui/material";
import type { ReactNode } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface CustomTechCellProps<T extends Record<string, any>> {
    cellData: CellContext<T, unknown>;
}

export const CustomTechCell = <T extends Record<string, any>>({
    cellData
}: CustomTechCellProps<T>): ReactNode => {
    const item = cellData.row.original;

    if (cellData.column.id === "actions") {
        return (
            <Box
                sx={{
                    px: 0,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {item.deletable && (
                    <IconButton size="small" sx={{ p: 0.5 }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
                {item.editable && (
                    <IconButton size="small" color="primary" sx={{ p: 0.5, ml: 0.5 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>
        );
    }

    return '-';
};
