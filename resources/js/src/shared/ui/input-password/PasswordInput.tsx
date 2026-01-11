import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, type FormControlProps, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import type { FC } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";



interface Props {
    variant?: FormControlProps["variant"];
    label: React.ReactNode;
    error?: boolean;
    errorText?: string;
    register: UseFormRegisterReturn
}

export const PasswordInput: FC<Props> = ({ variant = "outlined", label, error, register, errorText }) => {

    const [showPassword, setIsShowPassword] = useState(false);

    const handleClickShowPassword = () => setIsShowPassword(prev => !prev)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{}} variant={variant} error={error}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                {...register}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end" sx={{ pr: 1 }}>
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            <FormHelperText>{errorText}</FormHelperText>
        </FormControl>
    )
}