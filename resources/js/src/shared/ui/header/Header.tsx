import { use, type FC } from "react"
import { ThemeToggle } from "../../theme"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Stack, Tab, Tabs } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LoopIcon from '@mui/icons-material/Loop';

import { AuthContext } from "../../model";

type TabItem = {
    index: number;
    label: string;
    href: string;
};

const tabs: TabItem[] = [
    { index: 0, label: "Главная", href: "/" },
    { index: 1, label: "Системы сертификации", href: "/cert_systems" },
    { index: 2, label: "Органы по сертификации", href: "/organs" },
    { index: 3, label: "Сертификаты", href: "/certs" },
    { index: 4, label: "Документы", href: "/docs" },
    { index: 5, label: "Компании", href: "/companies" },
    { index: 6, label: "Справочники", href: "/dictionaries" },
];

export const Header: FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = tabs.find(tab => tab.href === location.pathname)?.index ?? false;

    const { isFetched, authenticated } = use(AuthContext)

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        const tab = tabs.find(t => t.index === newValue);
        if (tab) navigate(tab.href);
    };

    const isLoginPage = location.pathname.startsWith('/login');
    const isPersonalPage = location.pathname.startsWith('/personal');

    return (
        <header style={{ minWidth: 0 }}>
            <Stack sx={{ width: '100%', paddingRight: "40px", minWidth: 0 }} direction="row" justifyContent={"space-between"}>
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    variant="scrollable"
                    allowScrollButtonsMobile
                    scrollButtons
                    sx={{
                        '& .MuiTabs-indicator': {
                            height: "1.5px",
                        }
                    }}
                >
                    {tabs.map(tab => (
                        <Tab
                            sx={{
                                fontSize: (theme) => theme.typography.caption,
                            }}
                            key={tab.index}
                            label={tab.label} />
                    ))}
                </Tabs>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={.5}
                >
                    <ThemeToggle />
                    {
                        !isFetched ?
                            <Box
                                role="img"
                                sx={{
                                    padding: '8px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <LoopIcon className="rotate_infinite" fontSize="medium" />
                            </Box> :
                            (
                                <Link to={authenticated ? '/personal' : '/login'}>
                                    <IconButton
                                        sx={{
                                            color: (isLoginPage || isPersonalPage)
                                                ? (theme) => theme.palette.primary.main
                                                : null
                                        }}>
                                        {authenticated ? <PersonIcon fontSize="medium" /> : <LoginIcon fontSize="medium" />}
                                    </IconButton>
                                </Link>
                            )
                    }
                </Stack>
            </Stack>
            <Divider />
        </header>
    )
}