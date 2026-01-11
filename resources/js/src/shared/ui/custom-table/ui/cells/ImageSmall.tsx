import TableCell from "@mui/material/TableCell";
import type { FC } from "react";

export const ImageSmall: FC<{ path: string, rounded?: boolean }> = ({ path, rounded }) => {
    return (
        <TableCell align="center">
            <img
                src={path}
                alt="Avatar"
                style={{
                    width: rounded ? 40 : "auto",
                    height: 40,
                    borderRadius: rounded ? '50%' : "auto",
                    objectFit: 'cover'
                }}
            />
        </TableCell>
    );
}