import { type FC } from "react";
import { TableWithFilters } from "@/widgets/table-with-filters";
import { config } from "./config";

export const Users: FC = () => <TableWithFilters config={config} />

    
