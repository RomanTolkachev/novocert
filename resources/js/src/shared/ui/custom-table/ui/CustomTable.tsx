import { useMemo, useState, type ReactNode } from "react";
import Table, { type TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    flexRender
} from "@tanstack/react-table";
import { Box } from "@mui/material";
import { CustomCell } from "./CustomCell";
import { Preloader } from "@/shared";
import { ActionsToolbar } from "./actions-toolbar";
import type { IAction } from "../model";
import { Pagination } from "@/widgets/table-with-filters/ui/pagination";
import { CustomTechCell } from "./cells/CustomTechCell";

interface CustomTableProps<T extends Record<string, any>> {
    data: T[] | undefined;
    translations: Record<keyof T, string>;
    hiddenColumns?: (keyof T)[];
    columnOrder?: (keyof T)[];
    loading?: boolean;
    actions?: IAction[];
    size?: TableProps["size"];
    pagination?: { currentPage?: number, lastPage?: number, total?: number }
    withRowActions?: boolean
}

export function CustomTable<T extends Record<string, any>>({
    data = [],
    translations,
    hiddenColumns = [],
    columnOrder = [],
    loading = true,
    actions = [],
    size = "medium",
    pagination,
    withRowActions = false
}: CustomTableProps<T>): ReactNode {
    const columnHelper = createColumnHelper<T>();

    const allColumns = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }

        const keys = Object.keys(data[0]) as (keyof T)[];

        return keys.map(key =>
            columnHelper.accessor(key as any, {
                header: translations[key] || String(key),
                cell: info => info.getValue() ?? '-',
            })
        );
    }, [data, translations]);

    const techColumns = columnHelper.display({
        id: "actions",
        header: "",
        cell: (cell) => <CustomTechCell cellData={cell} />,
    });

    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
        () => {
            const visibility: Record<string, boolean> = {};
            hiddenColumns.forEach(col => {
                visibility[col as string] = false;
            });
            return visibility;
        }
    );

    const table = useReactTable({
        data,
        columns: [
            ...(withRowActions ? [techColumns] : []),
            ...allColumns,
        ],
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnVisibility,
            columnOrder: columnOrder as string[]
        },
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
        }}>
            <Box sx={{
                flex: 1,
                overflow: "auto",
            }}>
                {loading ? <Preloader /> :
                    (<Table stickyHeader size={size} sx={{ width: '100%' }} aria-label="custom table">
                        <TableHead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableCell align="center" key={header.id} sx={{ fontWeight: 'bold' }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { backgroundColor: 'action.hover' }
                                    }}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <CustomCell key={cell.id} cellData={cell} />
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)
                }
            </Box>
            {pagination && <Pagination {...pagination} />}
            {actions.length > 0 && <ActionsToolbar actions={actions} />}
        </Box>
    );
}