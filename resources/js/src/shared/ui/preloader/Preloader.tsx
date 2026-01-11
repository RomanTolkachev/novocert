import type { FC } from "react";
import {Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Preloader: FC = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height={"100%"}>
            <CircularProgress />
        </Box>
    )
}