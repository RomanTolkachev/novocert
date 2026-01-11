import { use, type FC } from "react";
import { TablePagination } from "@mui/material";
import { CustomSubmitHandlerContext } from "../../api/CustomFormProvider";
import { useFormContext } from "react-hook-form";

type Props = {
    lastPage?: number
    currentPage?: number
    total?: number
}

export const Pagination: FC<Props> = ({ total }) => {
    const handlers = use(CustomSubmitHandlerContext);
    const { register,  watch, getValues } = useFormContext();

    if (!handlers) return null;

    register("page");
    register("perPage");

    const { customSubmitHandler } = handlers;


    const handlePageChange = (_: any, page: number) => {
        const newPage = page + 1;
        const formData = getValues();
        customSubmitHandler({ ...formData, page: newPage }, 0);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const perPage = event.target.value ?? "10";
        const formData = getValues();
        customSubmitHandler({ ...formData, perPage, page: "1" });
    };

    const zeroBasedPage = (watch("page") || 1) - 1;
    const rowsPerPage = watch("perPage") || "10";

    return (
        <TablePagination
            component="div"
            labelRowsPerPage="Строк на странице"
            count={total ?? 0}
            page={zeroBasedPage}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        />
    );
};

