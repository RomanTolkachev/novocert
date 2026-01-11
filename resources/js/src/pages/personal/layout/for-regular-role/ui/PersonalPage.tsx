import {Box} from "@mui/material"
import type { FC, PropsWithChildren } from "react"
import { Link, matchPath, Outlet, useLocation } from "react-router-dom"
import styles from "./PersonalPage.module.css"
import Drawer from "@mui/material/Drawer"
import ListItemText from "@mui/material/ListItemText"
import ListItemButton from "@mui/material/ListItemButton"
import ListItem from "@mui/material/ListItem"
import List from "@mui/material/List"

const menuItems = [
    { text: 'Личная информация', path: '/personal' },
    { text: 'Пользователи', path: '/personal/users' },
]

export const PersonalPage: FC<PropsWithChildren> = () => {

    const location = useLocation();

    const isActive = (path: string) => {
        return matchPath(path, location.pathname) !== null
    }

    return (
        <Box sx={{ pt: 3 }} component="section" className={styles.container}>
            <Box sx={{ minWidth: 0 }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        '& .MuiDrawer-paper': {
                            position: 'static',
                            boxSizing: 'border-box',
                        },
                        height: "100%"
                    }}
                >
                    <List>
                        {menuItems.map((item) => (
                            <ListItem sx={{
                                '&:not(:last-of-type)': {
                                    marginBottom: 1
                                }
                            }} key={item.path} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={isActive(item.path)}
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.main',
                                            color: 'primary.contrastText',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark',
                                            },
                                        },
                                        borderRadius: 2
                                    }}
                                >
                                    <ListItemText style={{ textWrap: "nowrap" }} primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

            </Box>
            <Box sx={{ minWidth: 0, minHeight: 0 }}>
                <Outlet />
            </Box>
        </Box>
    )
}
