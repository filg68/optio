import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

export const ResponsiveDialog = props => {
    const { children, onClose, ariaLabel, open } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            fullScreen={fullScreen}
            onClose={onClose}
            aria-labelledby={ariaLabel}
            open={open}>
            {children}
        </Dialog>
    );
};
