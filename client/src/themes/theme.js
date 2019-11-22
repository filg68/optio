import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: '"Montserrat", sans-serif'
    },
    palette: {
        primary: {
            main: "#000000"
        },
        secondary: {
            main: "#62CD4D"
        },
        error: {
            main: "#d8000c"
        },
        background: {
            default: "#f6f6f6",
            gray: "#D8D8D8"
        },
        common: {
            red: "#FF5D5D"
        }
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "20px"
            },
            sizeLarge: {
                padding: "8px 44px"
            },
            sizeSmall: {
                padding: "6px 22px"
            },
            containedSecondary: {
                color: "#fff",
                boxShadow:
                    "0px 1px 5px 0px rgba(98, 205, 77, 0.2), 0px 2px 2px 0px rgba(98, 205, 77, 0.14), 0px 3px 1px -2px rgba(98, 205, 77, 0.12)"
            }
        }
    }
});
