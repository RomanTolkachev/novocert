import { createTheme } from '@mui/material/styles';

import ubuntuLight from "@public/fonts/Ubuntu-Light.ttf" // 300
import ubuntuRegular from "@public/fonts/Ubuntu-Regular.ttf" // 400
import ubuntuMedium from "@public/fonts/Ubuntu-Medium.ttf" // 500
import ubuntuBold from "@public/fonts/Ubuntu-Bold.ttf" // 700

export const theme = createTheme({
    colorSchemes: {
        dark: true
    },
    cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
    },
    typography: {
        fontFamily: 'Ubuntu, Arial',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    paddingInline: 12,
                    paddingBlock: 3
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                contained: {
                    borderRadius: 8,
                },
                outlined: {
                    borderRadius: 8,
                },
                text: {
                    borderRadius: 8,
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    height: "fit-content",
                },
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    alignItems: "center",
                },
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '@font-face': [
                    {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontDisplay: 'fallback',
                        fontWeight: 300,
                        src: `local('Ubuntu Light'), local('Ubuntu-Light'), url(${ubuntuLight}) format('truetype')`,
                        // unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
                    },
                    {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontDisplay: 'fallback',
                        fontWeight: 400,
                        src: `local('Ubuntu Regular'), local('Ubuntu-Regular'), url(${ubuntuRegular}) format('truetype')`,
                        // unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
                    },
                    {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontDisplay: 'fallback',
                        fontWeight: 500,
                        src: `local('Ubuntu Medium'), local('Ubuntu-Medium'), url(${ubuntuMedium}) format('truetype')`,
                        // unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
                    },
                    {
                        fontFamily: 'Ubuntu',
                        fontStyle: 'normal',
                        fontDisplay: 'fallback',
                        fontWeight: 700,
                        src: `local('Ubuntu Bold'), local('Ubuntu-Bold'), url(${ubuntuBold}) format('truetype')`,
                        // unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
                    }
                ],
                body: {
                    scrollbarColor: "#6b6b6b transparent",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        width: 8,
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#6b6b6b",
                        minHeight: 24,
                        border: "2px solid transparent",
                    },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                }
            }
        },
    }
});