import { type FC } from "react";
import { TableWithFilters } from "@/widgets/table-with-filters";
import { config } from "./config";

export const Companies: FC = () => <TableWithFilters config={config}/>

