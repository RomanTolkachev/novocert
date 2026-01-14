import { Box } from "@mui/material"
import type { FC } from "react"
import { Outlet } from "react-router-dom"
import styles from "./PublicLayout.module.css"

export const Publiclayout: FC = () => {
    return (
        <Box sx={{ pt: 3 }} component="section" className={styles.container}>
            <Box sx={{ minWidth: 0, minHeight: 0 }}>
                <Outlet />
            </Box>
        </Box >
    )
}