import React from "react";
import clsx from "clsx";
import renderAvatar from "../utils/renderAvatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Badge from "@material-ui/core/Badge";
import { sortAlphabetically } from "../utils/sortBy";

const StyledBadge = withStyles(theme => ({
    badge: {
        top: "5px",
        right: "5px",
        backgroundColor: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid #44b700",
            content: '""'
        }
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0
        }
    }
}))(Badge);

const useStyles = makeStyles(theme => ({
    subtitle: {
        fontWeight: "600",
        transition: theme.transitions.create("font-size", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    collapsed: {
        fontSize: "0.7rem"
    },
    list: {
        overflow: "scroll"
    }
}));

function FriendsList(props) {
    const { friends, drawerIsOpen } = props;
    const classes = useStyles();
    const sortedFriends = sortAlphabetically(friends);

    return (
        <List
            dense
            component="nav"
            aria-labelledby="friends-list-title"
            className={classes.list}
            subheader={
                <ListSubheader
                    disableSticky={true}
                    className={clsx(
                        classes.subtitle,
                        !drawerIsOpen && classes.collapsed
                    )}
                    component="div"
                    id="friends-list-title">
                    Friends
                </ListSubheader>
            }>
            {sortedFriends.map(friend => {
                return (
                    <ListItem button key={friend._id}>
                        <ListItemAvatar>
                            <StyledBadge
                                invisible={!friend.online}
                                variant="dot"
                                overlap="circle"
                                color="secondary">
                                {renderAvatar(friend, classes)}
                            </StyledBadge>
                        </ListItemAvatar>
                        <ListItemText primary={friend.name} />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default FriendsList;
