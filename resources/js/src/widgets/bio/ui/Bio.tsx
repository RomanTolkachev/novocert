import { use } from "react"
import type { FC } from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Box} from "@mui/material";
import { AuthContext } from "@/shared";
import { LogoutButton } from "@/features";
import styles from "./Bio.module.css"

function createData(label: string, value: string) {
    return { label, value };
}

export const Bio: FC = () => {

    const { userData } = use(AuthContext);

    const rows = [
        createData('Email', userData?.email || "не известно"),
        createData('Name', userData?.name || "не известно"),
        createData('id', userData?.id?.toString() || "не известно"),
    ]

    return (
        <Box className={styles.container} sx={{ gap: 1 }}>
            <Table sx={{ width: "fit-content" }} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.label}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '& td': theme => ({ fontSize: theme.typography.body1 })
                            }}
                        >
                            <TableCell sx={{ pr: 8 }} scope="row">{row.label}</TableCell>
                            <TableCell sx={{ pl: 8 }} align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <LogoutButton />
        </Box>
    )
}