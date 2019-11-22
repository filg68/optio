import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, Link } from "@material-ui/core";
import logo from "../images/icons/logo.png";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    header: {
        backgroundColor: "transparent",
        padding: theme.spacing(4),
        [theme.breakpoints.down("xs")]: {
            padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
            position: "initial" // remove default fixed position
        }
    },
    toolbar: {
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    button: {
        color: "#fff",
        border: "2px solid #ffff",
        marginRight: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            border: "none",
            marginRight: 0,
            backgroundColor: theme.palette.primary.main,
            boxShadow:
                "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
            "&:hover": {
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    logo: {
        height: "60px",
        width: "60px"
    }
}));

function AuthNavbar(props) {
    const classes = useStyles();
    const buttonText = props.target === "signup" ? "Sign up" : "Log in";

    return (
        <div className={classes.root}>
            <AppBar className={classes.header} elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <Link href="./">
                        <img
                            className={classes.logo}
                            alt="App logo"
                            src={logo}
                        />
                    </Link>
                    <Button
                        href={`./${props.target}`}
                        size="large"
                        className={classes.button}
                        variant="outlined">
                        {buttonText}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AuthNavbar;
