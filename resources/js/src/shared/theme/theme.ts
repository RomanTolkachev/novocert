import { createTheme } from '@mui/material/styles';

import ubuntuLight from "@public/fonts/Ubuntu-Light.ttf" // 300
import ubuntuRegular from "@public/fonts/Ubuntu-Regular.ttf" // 400
import ubuntuMedium from "@public/fonts/Ubuntu-Medium.ttf" // 500
import ubuntuBold from "@public/fonts/Ubuntu-Bold.ttf" // 700

export const theme = createTheme({
    colorSchemes: {
        light: {
        },
        dark: {
            palette: {
                primary: { main: '#90caf9' },
                background: {
                    default: '#121212',
                },
                text: {
                    // основной серый цвет текста
                    primary: '#b0b0b0',
                    secondary: '#7a7a7a',
                },
                // всякие иконки и т.д
                action: {
                    active: '#b0b0b0',
                    hover: 'rgba(176, 176, 176, 0.08)',
                    selected: 'rgba(176, 176, 176, 0.16)',
                    disabled: 'rgba(176, 176, 176, 0.3)',
                    disabledBackground: 'rgba(176, 176, 176, 0.12)',
                },
            },
        },
    },
    cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: 'Ubuntu, Arial',
        fontSize: 16,
        body1: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
        },
        body2: {
            fontSize: '0.8125rem',
            lineHeight: 1.5,
        },

    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    paddingInline: 12,
                    paddingswap: 3
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                body: ({ ownerState, theme }) => ({
                    fontWeight: 400,
                    ...(ownerState.size === 'medium' && {
                        fontSize: theme.typography.body1.fontSize,
                    }),
                    ...(ownerState.size === 'small' && {
                        fontSize: theme.typography.body2.fontSize,
                        paddingTop: 4,
                        paddingBottom: 4,
                        paddingLeft: 8,
                        paddingRight: 8,
                    }),
                }),
                head: ({ ownerState, theme }) => ({
                    ...(ownerState.size === 'medium' && {
                        fontSize: theme.typography.body1.fontSize,
                        lineHeight: theme.typography.body1.lineHeight,

                    }),
                    ...(ownerState.size === 'small' && {
                        fontSize: theme.typography.body2.fontSize,
                        lineHeight: theme.typography.body1.lineHeight,
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 8,
                        paddingRight: 8,
                    }),
                }),
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
            styleOverrides: `
                @font-face {
                  font-family: 'Ubuntu';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 300;
                  src: url(${ubuntuLight}) format('truetype');
                }
                @font-face {
                  font-family: 'Ubuntu';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;
                  src: url(${ubuntuRegular}) format('truetype');
                }
                @font-face {
                  font-family: 'Ubuntu';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 500;
                  src: url(${ubuntuMedium}) format('truetype');
                }
                @font-face {
                  font-family: 'Ubuntu';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 700;
                  src: url(${ubuntuBold}) format('truetype');
                }

                body {
                  scrollbar-color: #6b6b6b transparent;
                }

                body::-webkit-scrollbar,
                body *::-webkit-scrollbar {
                  width: 8px;
                  background-color: transparent;
                }

                body::-webkit-scrollbar-thumb,
                body *::-webkit-scrollbar-thumb {
                  border-radius: 8px;
                  background-color: #6b6b6b;
                  min-height: 24px;
                  border: 2px solid transparent;
                }

                body::-webkit-scrollbar-thumb:focus,
                body *::-webkit-scrollbar-thumb:focus,
                body::-webkit-scrollbar-thumb:active,
                body *::-webkit-scrollbar-thumb:active,
                body::-webkit-scrollbar-thumb:hover,
                body *::-webkit-scrollbar-thumb:hover {
                  background-color: #959595;
                }

                body::-webkit-scrollbar-corner,
                body *::-webkit-scrollbar-corner {
                  background-color: transparent;
                }

                body::-webkit-scrollbar-track,
                body *::-webkit-scrollbar-track {
                  background-color: transparent;
                }
            `,
        }
    }
});