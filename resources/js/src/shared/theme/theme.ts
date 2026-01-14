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
        fontSize: 14,
        body1: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
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
                body: {
                    fontWeight: 400,
                    // padding: 8
                },
                head: {
                    // padding: 8
                }
            },
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