import { useMemo, type FC, type PropsWithChildren } from "react";
import { AuthContext, protectedApi, type IAuthContext } from "../../../shared";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const { data, isFetched } = useQuery<IAuthContext["userData"], AxiosError>({
        queryKey: ["user"],
        queryFn: () => protectedApi.get('/auth/get-user').then(res => res.data),
        retry: 0,
    })

    const contextValue = useMemo(() => {
        const userRoles = data?.role_names || [];
        const isSa = userRoles.includes('sa');

        return (
            {
                authenticated: !!data?.id || false,
                isFetched: isFetched,
                userData: data || null,
                isSa
            }
        )
    }, [data, isFetched]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}