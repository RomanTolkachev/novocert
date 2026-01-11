import { type FC } from "react";
import { TableWithFilters } from "@/widgets/table-with-filters";
import { config } from "./config";


export const Certs: FC = () => <TableWithFilters config={config} />

