//AdornedButton.js

import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    spinner: {
        marginLeft: "7px",
        color: theme.palette.secondary.main
    }
});

const SpinnerAdornment = withStyles(styles)(props => {
    return <CircularProgress className={props.classes.spinner} size={18} />;
});

export const AdornedButton = props => {
    const { children, loading, ...rest } = props;
    return (
        <Button {...rest}>
            {children}
            {loading && <SpinnerAdornment {...rest} />}
        </Button>
    );
};
