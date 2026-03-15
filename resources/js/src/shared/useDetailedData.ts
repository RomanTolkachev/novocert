import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { api, protectedApi } from "./api";

export type DetailScope = "public" | "admin";

const getDetailUrl = (scope: DetailScope, entityType: string) => `/${scope}/get-${entityType}`;

export function useDetailedData(scope: DetailScope, entity_type: string) {
    const { id } = useParams<"id">();
    const url = getDetailUrl(scope, entity_type);
    const client = scope === "admin" ? protectedApi : api;

    return useQuery<AxiosResponse<unknown>>({
        queryKey: [url, id],
        queryFn: () => client.get(url, { params: { id } }),
        enabled: Boolean(id),
    });
}
