import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { theme } from './theme';
import type { FC, PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeModeProvider: FC<PropsWithChildren> = ({ children }) => (
    <ThemeProvider
        theme={theme}
    >
        <CssBaseline />
        {children}
    </ThemeProvider>
);



export const useThemeMode = () => {
    const { mode, setMode } = useColorScheme();
    const toggleTheme = () => setMode(mode === 'light' ? 'dark' : 'light');
    return { mode, toggleTheme };
};
