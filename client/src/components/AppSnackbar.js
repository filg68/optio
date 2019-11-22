import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5)
    }
}));

export default function AppSnackbar(props) {
    const classes = useStyles();
    const { snackbarIsOpen, toggleSnackbar, snackbarMessage } = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={snackbarIsOpen}
                autoHideDuration={5000}
                onClose={() => toggleSnackbar("close")}
                ContentProps={{
                    "aria-describedby": "create-poll-message"
                }}
                message={
                    <span id="create-poll-message">{snackbarMessage}</span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => toggleSnackbar("close")}>
                        <Icon>close</Icon>
                    </IconButton>
                ]}
            />
        </div>
    );
}
