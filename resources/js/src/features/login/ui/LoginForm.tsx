import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { type FC } from "react";
import styles from "./LoginForm.module.css"
import { useForm } from "react-hook-form";
import type { TLoginForm } from "../model/types";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PasswordInput } from "../../../shared";
import { tryLogin } from "../api";
import type { AxiosError } from "axios";

export const LoginForm: FC = () => {

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<TLoginForm>({ mode: "onChange" })

    const { isPending, mutate, error } = useMutation<ITokens, AxiosError, TLoginForm>({
        mutationFn: (formData: TLoginForm) => tryLogin(formData),
        onSuccess: ({ accessToken, refreshToken }) => {
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    })

    const loginError = error?.response?.status === 403
        ? "неверный логин или пароль"
        : error?.message;

    return (
        <>
            <Box onSubmit={handleSubmit(data => mutate(data))} component="form" role="form" sx={{ gap: 1 }} className={styles.wrapper}>
                <TextField
                    helperText={errors.email?.message || " "}
                    label="e-mail"
                    variant="outlined"
                    {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        },
                        required: "обязательное поле"
                    })}
                    error={!!errors.email?.message || !!loginError}
                />
                <PasswordInput
                    error={!!errors.password?.message || !!loginError}
                    errorText={errors.password?.message || " "}
                    label="password"
                    variant="outlined"
                    register={register("password", {
                        required: "обязательное поле",
                        minLength: {
                            value: 3,
                            message: "минимум 3 символа"
                        }
                    })}
                />
                <Button
                    size="large"
                    disabled={isPending || !isValid}
                    type="submit"
                    color="success"
                    variant="contained">
                    Отправить
                </Button>
                <FormHelperText error>
                    {loginError || " "}
                </FormHelperText>
            </Box>
            <DevTool control={control} />
        </>
    )
}