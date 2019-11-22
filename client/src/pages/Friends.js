import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import { friendsPageStyles } from "../styles/friendsPageStyles";

import renderAvatar from "../utils/renderAvatar";

import AddPollDialog from "../components/AddPollDialog";
import { UserPanel } from "../components/UserPanel";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";

function TabPanel(props) {
    const { children, value, className, index, ...other } = props;

    return (
        <Paper
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <Box className={className} p={4}>
                {children}
            </Box>
        </Paper>
    );
}

// support accessibility:
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false,
            value: 0
        };
    }

    handleChange = (e, newValue) => {
        this.setState({ value: newValue });
    };

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    changeFriendStatus = (id, action) => {
        const dataToSend = {
            userId: this.props.user._id,
            friendId: id,
            action
        };
        this.props.changeFriendStatus(dataToSend);
    };

    render() {
        const {
            classes,
            user,
            users,
            toggleSnackbar,
            snackbarIsOpen,
            snackbarMessage,
            logOut,
            updateUserDataInState,
            addNewPoll,
            toggleDrawer,
            drawerIsOpen,
            mobileDrawerIsOpen
        } = this.props;
        const { lists, friends } = this.props.user;
        const { pollDialogIsOpen, value } = this.state;

        return (
            <div className={classes.root}>
                <UserPanel
                    user={user}
                    users={users}
                    logOut={logOut}
                    togglePollDialog={this.togglePollDialog}
                    updateUserDataInState={updateUserDataInState}
                    toggleSnackbar={toggleSnackbar}
                    snackbarIsOpen={snackbarIsOpen}
                    snackbarMessage={snackbarMessage}
                    toggleDrawer={toggleDrawer}
                    drawerIsOpen={drawerIsOpen}
                    mobileDrawerIsOpen={mobileDrawerIsOpen}
                />

                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            <Grid
                                container
                                item
                                xs={12}
                                justify="center"
                                className={classes.friendsContainer}>
                                <Grid item xs={12} container justify="center">
                                    <Grid item>
                                        <Typography
                                            display="inline"
                                            variant="h6"
                                            component="h2"
                                            className={classes.friendsTitle}>
                                            Friends
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <AddPollDialog
                                            userId={user._id}
                                            lists={lists}
                                            togglePollDialog={
                                                this.togglePollDialog
                                            }
                                            addNewPoll={addNewPoll}
                                            pollDialogIsOpen={pollDialogIsOpen}
                                            hideButton={true}
                                            toggleSnackbar={toggleSnackbar}
                                            snackbarIsOpen={snackbarIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={8}
                                    container
                                    justify="center"
                                    spacing={4}
                                    className={classes.tabsContainer}>
                                    <Tabs
                                        variant="fullWidth"
                                        value={value}
                                        onChange={this.handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        className={classes.tabs}>
                                        <Tab
                                            label="Following"
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            label="Suggested"
                                            {...a11yProps(1)}
                                        />
                                    </Tabs>
                                    <TabPanel
                                        value={value}
                                        index={0}
                                        className={classes.box}>
                                        {!friends.length ? (
                                            <Typography variant="body1">
                                                You look lonely! Add new friends
                                                in 'Suggested' tab
                                            </Typography>
                                        ) : (
                                            <List className={classes.userList}>
                                                {friends &&
                                                    friends.map(friend => {
                                                        const isStillFriend = friends.find(
                                                            u =>
                                                                u._id ===
                                                                friend._id
                                                        );
                                                        return (
                                                            <ListItem
                                                                key={friend._id}
                                                                className={clsx(
                                                                    classes.listItem,
                                                                    isStillFriend ===
                                                                        undefined &&
                                                                        classes.disabled
                                                                )}>
                                                                <ListItemAvatar
                                                                    className={
                                                                        classes.avatar
                                                                    }>
                                                                    {renderAvatar(
                                                                        friend,
                                                                        classes
                                                                    )}
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={
                                                                        friend.name
                                                                    }
                                                                    className={
                                                                        classes.listItemText
                                                                    }
                                                                />
                                                                <ListItemSecondaryAction
                                                                    className={
                                                                        classes.secondaryAction
                                                                    }>
                                                                    <Button
                                                                        className={
                                                                            classes.button
                                                                        }
                                                                        onClick={() =>
                                                                            this.changeFriendStatus(
                                                                                friend._id,
                                                                                "unfollow"
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isStillFriend ===
                                                                            undefined
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        variant={
                                                                            isStillFriend
                                                                                ? "text"
                                                                                : "contained"
                                                                        }
                                                                        size="small"
                                                                        color="secondary">
                                                                        {isStillFriend !==
                                                                        undefined
                                                                            ? "Unfollow"
                                                                            : "Removed"}
                                                                    </Button>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        );
                                                    })}
                                            </List>
                                        )}
                                    </TabPanel>
                                    <TabPanel
                                        value={value}
                                        index={1}
                                        className={classes.box}>
                                        {!users.length ? (
                                            <Typography variant="body1">
                                                No new users available at the
                                                moment
                                            </Typography>
                                        ) : (
                                            <List className={classes.userList}>
                                                {users &&
                                                    users.map(user => {
                                                        const isFriend = friends.find(
                                                            u =>
                                                                u._id ===
                                                                user._id
                                                        );

                                                        return (
                                                            <ListItem
                                                                key={user._id}
                                                                className={clsx(
                                                                    classes.listItem,
                                                                    isFriend &&
                                                                        classes.disabled
                                                                )}>
                                                                <ListItemAvatar
                                                                    className={
                                                                        classes.avatar
                                                                    }>
                                                                    {renderAvatar(
                                                                        user,
                                                                        classes
                                                                    )}
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={
                                                                        user.name
                                                                    }
                                                                    className={
                                                                        classes.listItemText
                                                                    }
                                                                />
                                                                <ListItemSecondaryAction
                                                                    className={
                                                                        classes.secondaryAction
                                                                    }>
                                                                    <Button
                                                                        className={
                                                                            classes.button
                                                                        }
                                                                        onClick={() =>
                                                                            this.changeFriendStatus(
                                                                                user._id,
                                                                                "follow"
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            isFriend ===
                                                                            undefined
                                                                                ? false
                                                                                : true
                                                                        }
                                                                        variant={
                                                                            isFriend !==
                                                                            undefined
                                                                                ? "text"
                                                                                : "contained"
                                                                        }
                                                                        size="small"
                                                                        color="secondary">
                                                                        {isFriend ===
                                                                        undefined
                                                                            ? "Follow"
                                                                            : "Following"}
                                                                    </Button>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        );
                                                    })}
                                            </List>
                                        )}
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(theme => ({
    ...profileStyles(theme),
    ...friendsPageStyles(theme)
}))(Friends);
