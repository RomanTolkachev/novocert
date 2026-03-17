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
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                }),
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    paddingInline: 12,
                    paddingswap: 3,
                    ...(ownerState.variant === 'outlined' && { backgroundColor: 'transparent' }),
                    ...(ownerState.variant !== 'outlined' && {
                        backgroundColor: 'transparent',
                        backgroundImage: theme.palette.mode === 'light'
                            ? 'radial-gradient(ellipse 80% 80% at 0% 0%, rgba(27, 51, 81, 0.18) 0%, transparent 55%), radial-gradient(ellipse 160% 160% at 100% 100%, rgba(155, 97, 149, 0.12) 0%, transparent 50%)'
                            : 'radial-gradient(ellipse 80% 80% at 0% 0%, rgba(27, 51, 81, 0.5) 0%, transparent 60%), radial-gradient(ellipse 160% 160% at 100% 100%, rgba(155, 97, 149, 0.12) 0%, transparent 50%)',
                        border: `1px solid ${theme.palette.divider}`,
                    }),
                }),
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
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.variant !== 'contained' && { backgroundColor: 'transparent' }),
                }),
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
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

                [data-mui-color-scheme="light"] body {
                  background-color: #fff;
                  background-image:
                    radial-gradient(ellipse 65% 55% at 0% 100%, rgba(47, 129, 174, 0.08) 0%, rgba(91, 97, 216, 0.06) 25%, rgba(84, 49, 193, 0.04) 45%, transparent 70%),
                    radial-gradient(ellipse 120% 80% at 30% 40%, rgba(100, 100, 100, 0.04) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 60% at 0% 0%, rgba(100, 100, 100, 0.05) 0%, transparent 45%),
                    radial-gradient(ellipse 70% 40% at 0% 100%, rgba(100, 100, 100, 0.04) 0%, transparent 40%),
                    radial-gradient(ellipse 50% 80% at 80% 20%, rgba(100, 100, 100, 0.03) 0%, transparent 45%);
                  background-attachment: fixed;
                }

                [data-mui-color-scheme="dark"] body {
                  background-color: #121212;
                  background-image:
                    radial-gradient(ellipse 65% 55% at 0% 100%, rgba(47, 129, 174, 0.1) 0%, rgba(91, 97, 216, 0.08) 25%, rgba(84, 49, 193, 0.06) 45%, transparent 70%),
                    radial-gradient(ellipse 120% 80% at 30% 40%, rgba(45, 50, 58, 0.35) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 60% at 0% 0%, rgba(43, 47, 54, 0.5) 0%, transparent 45%),
                    radial-gradient(ellipse 70% 40% at 0% 100%, rgba(43, 47, 54, 0.4) 0%, transparent 40%),
                    radial-gradient(ellipse 50% 80% at 80% 20%, rgba(43, 47, 54, 0.3) 0%, transparent 45%);
                  background-attachment: fixed;
                }

                [data-mui-color-scheme="light"] thead,
                [data-mui-color-scheme="light"] .MuiTableCell-head {
                  background-color: #fff;
                  background-image:
                    radial-gradient(ellipse 65% 55% at 0% 100%, rgba(47, 129, 174, 0.08) 0%, rgba(91, 97, 216, 0.06) 25%, rgba(84, 49, 193, 0.04) 45%, transparent 70%),
                    radial-gradient(ellipse 120% 80% at 30% 40%, rgba(100, 100, 100, 0.04) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 60% at 0% 0%, rgba(100, 100, 100, 0.05) 0%, transparent 45%),
                    radial-gradient(ellipse 70% 40% at 0% 100%, rgba(100, 100, 100, 0.04) 0%, transparent 40%),
                    radial-gradient(ellipse 50% 80% at 80% 20%, rgba(100, 100, 100, 0.03) 0%, transparent 45%);
                  background-attachment: fixed;
                }

                [data-mui-color-scheme="dark"] thead,
                [data-mui-color-scheme="dark"] .MuiTableCell-head {
                  background-color: #121212;
                  background-image:
                    radial-gradient(ellipse 65% 55% at 0% 100%, rgba(47, 129, 174, 0.1) 0%, rgba(91, 97, 216, 0.08) 25%, rgba(84, 49, 193, 0.06) 45%, transparent 70%),
                    radial-gradient(ellipse 120% 80% at 30% 40%, rgba(45, 50, 58, 0.35) 0%, transparent 55%),
                    radial-gradient(ellipse 60% 60% at 0% 0%, rgba(43, 47, 54, 0.5) 0%, transparent 45%),
                    radial-gradient(ellipse 70% 40% at 0% 100%, rgba(43, 47, 54, 0.4) 0%, transparent 40%),
                    radial-gradient(ellipse 50% 80% at 80% 20%, rgba(43, 47, 54, 0.3) 0%, transparent 45%);
                  background-attachment: fixed;
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