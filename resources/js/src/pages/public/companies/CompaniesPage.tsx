import type { FC } from "react";
import { TableWithFilters } from "@/widgets/table-with-filters";
import { config } from "./config";

export const CompaniesPage: FC = () => {
    return <TableWithFilters config={config} />;
};