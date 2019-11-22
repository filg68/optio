import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import FriendsList from "./FriendsList";
import { socket } from "../utils/setSocketConnection";

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: "relative",
        width: "240px",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        height: "100vh",
        whiteSpace: "nowrap" // prevent list item to stretch vertically
        // if user name is too long
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("xs")]: {
            width: "70px"
        },
        whiteSpace: "nowrap"
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        ...theme.mixins.toolbar
    },
    avatar: {
        textTransform: "uppercase"
    },
    arrowIcon: {
        margin: "0 0 0 auto",
        [theme.breakpoints.up("xs")]: {
            padding: "20px"
        }
    },
    // the following styles fix the bug in Chrome with disappearing hr line:
    divider: {
        [theme.breakpoints.up("lg")]: {
            height: "1.05px"
        },
        [theme.breakpoints.up("xl")]: {
            height: "1.3px"
        }
    }
}));

function FriendsDrawer(props) {
    const { user, drawerIsOpen, toggleDrawer, mobileDrawerIsOpen } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [friends, setFriends] = React.useState([]);

    React.useEffect(() => {
        // initialize friends array:
        setFriends(props.user.friends);

        socket.on("friends_changed", data => {
            // update friends array in state if current user's friend is affected:
            if (user._id === data.userId) {
                setFriends(data.friends);
            }
        });

        // listen to new users joining the app:
        socket.on("user_joined", () => {
            // request udpated friends array:
            socket.emit("initial_friends", user._id);
        });

        // listen to users leaving the app:
        socket.on("user_left", () => {
            // request udpated friends array:
            socket.emit("initial_friends", user._id);
        });

        // cancel event listening
        return () => {
            socket.off("user_joined");
            socket.off("user_left");
            socket.off("friends_changed");
        };
    }, [user._id, props.user.friends]);

    const mobileDrawer = (
        <>
            <Divider />
            <FriendsList drawerIsOpen={drawerIsOpen} friends={friends} />
        </>
    );

    const desktopDrawer = (
        <>
            <div className={classes.toolbarIcon}>
                <IconButton
                    className={classes.arrowIcon}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => toggleDrawer("drawerIsOpen")}>
                    <Icon>
                        {drawerIsOpen ? "chevron_left" : "chevron_right"}
                    </Icon>
                </IconButton>
            </div>
            <Divider className={classes.divider} />
            <FriendsList drawerIsOpen={drawerIsOpen} friends={friends} />
        </>
    );

    return (
        <>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    classes={{
                        paper: clsx(classes.drawerPaper)
                    }}
                    open={mobileDrawerIsOpen}
                    onClose={() => toggleDrawer("mobileDrawerIsOpen")}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}>
                    {mobileDrawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: clsx(
                            classes.drawerPaper,
                            !drawerIsOpen && classes.drawerPaperClose
                        )
                    }}
                    variant="permanent"
                    open={drawerIsOpen}>
                    {desktopDrawer}
                </Drawer>
            </Hidden>
        </>
    );
}

export default FriendsDrawer;
