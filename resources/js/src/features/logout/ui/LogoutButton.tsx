import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedApi } from "../../../shared";
import type { FC } from "react";

export const LogoutButton: FC = () => {

    const queryClient = useQueryClient()

    const logoutMutation = useMutation({
        mutationFn: () => protectedApi.post("/auth/close-session"),
        onSuccess: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            queryClient.setQueryData(['user'], null);

            queryClient.invalidateQueries({
                queryKey: ['user'],
                refetchType: 'active'
            });
        },
        onError: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            queryClient.setQueryData(['user'], null);

            queryClient.invalidateQueries({
                queryKey: ['user'],
                refetchType: 'active'
            });
        }
    });

    return (
        <Button
            onClick={() => logoutMutation.mutate()}
            fullWidth
            size="large"
            disabled={logoutMutation.isPending}
            color="warning"
            variant="contained"
        >
            {logoutMutation.isPending ? "Выход..." : "Выход"}
        </Button>
    );
};