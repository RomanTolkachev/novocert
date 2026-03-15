import { Box } from "@mui/material";
import type { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./LayoutWithOutlet.module.css";

export const LayoutWithOutlet: FC = () => {
    return (
        <Box sx={{ pt: 3 }} component="section" className={styles.container}>
            <Outlet />
        </Box>
    );
};
