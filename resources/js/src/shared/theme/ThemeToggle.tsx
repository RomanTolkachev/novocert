
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useThemeMode } from './ThemeProvider';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';

export const ThemeToggle = () => {
    const { mode, toggleTheme } = useThemeMode();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mode === 'dark';

    return (
        <IconButton
            onClick={toggleTheme}
            sx={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}
        >
            {isDark ? <Brightness7 fontSize="medium"/> : <Brightness4 fontSize="medium"/>}
        </IconButton>
    );
};
