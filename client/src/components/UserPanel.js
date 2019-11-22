import React from "react";
import AppNavbar from "../components/AppNavbar";
import FriendsDrawer from "../components/FriendsDrawer";
import { CssBaseline } from "@material-ui/core";
import AppSnackbar from "./AppSnackbar";

function UserPanel(props) {
    const {
        user,
        users,
        toggleSnackbar,
        snackbarIsOpen,
        snackbarMessage,
        toggleDrawer,
        drawerIsOpen,
        mobileDrawerIsOpen
    } = props;

    return (
        <>
            <CssBaseline />
            <AppNavbar
                user={user}
                drawerIsOpen={drawerIsOpen}
                logOut={props.logOut}
                togglePollDialog={props.togglePollDialog}
                toggleDrawer={toggleDrawer}
                updateUserDataInState={props.updateUserDataInState}
                toggleSnackbar={toggleSnackbar}
            />
            <FriendsDrawer
                user={user}
                users={users}
                drawerIsOpen={drawerIsOpen}
                mobileDrawerIsOpen={mobileDrawerIsOpen}
                toggleDrawer={toggleDrawer}
            />
            <AppSnackbar
                snackbarMessage={snackbarMessage}
                snackbarIsOpen={snackbarIsOpen}
                toggleSnackbar={toggleSnackbar}
            />
        </>
    );
}

export { UserPanel };
