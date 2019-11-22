// inspiration: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

import React, { Component } from "react";
import clsx from "clsx";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import { UserPanel } from "../components/UserPanel";
import AddFriendList from "../components/AddFriendList";
import AddPollDialog from "../components/AddPollDialog";
import PollCard from "../components/PollCard";
import ListCard from "../components/ListCard";

import {
    Typography,
    Container,
    Grid,
    IconButton,
    Icon,
    Box
} from "@material-ui/core";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false,
            editProfileDialogIsOpen: false,
            listMove: 0,
            moveListBy: 0,
            pollMove: 0,
            movePollBy: 0
        };
    }

    componentDidMount() {
        // for a user with no friends, show suggestion to add friends:
        if (this.props.user._id && this.props.user.friends.length === 0) {
            const message = "Hi there! How about adding some friends?";
            this.props.toggleSnackbar({ action: "open", message });
        }
    }

    showNextSlide = target => {
        if (target === "list") {
            this.setState({
                listMove: this.state.listMove + 1,
                moveListBy: this.state.moveListBy + 100
            });
        } else {
            this.setState({
                pollMove: this.state.pollMove + 1,
                movePollBy: this.state.movePollBy + 100
            });
        }
    };

    showPreviousSlide = target => {
        if (target === "list") {
            this.setState({
                listMove: this.state.listMove - 1,
                moveListBy: this.state.moveListBy - 100
            });
        } else {
            this.setState({
                pollMove: this.state.pollMove - 1,
                movePollBy: this.state.movePollBy - 100
            });
        }
    };

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    render() {
        const {
            classes,
            user,
            users,
            toggleSnackbar,
            snackbarIsOpen,
            snackbarMessage,
            updateVotes
        } = this.props;

        const { lists, polls } = this.props.user;
        const {
            pollDialogIsOpen,
            listMove,
            moveListBy,
            pollMove,
            movePollBy
        } = this.state;

        return (
            <div className={classes.root}>
                <UserPanel
                    user={user}
                    users={users}
                    logOut={this.props.logOut}
                    togglePollDialog={this.togglePollDialog}
                    toggleEditProfileDialog={this.toggleEditProfileDialog}
                    addNewPoll={this.props.addNewPoll}
                    updateUserDataInState={this.props.updateUserDataInState}
                    toggleSnackbar={toggleSnackbar}
                    snackbarIsOpen={snackbarIsOpen}
                    snackbarMessage={snackbarMessage}
                    toggleDrawer={this.props.toggleDrawer}
                    drawerIsOpen={this.props.drawerIsOpen}
                    mobileDrawerIsOpen={this.props.mobileDrawerIsOpen}
                />

                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={6}>
                            <Grid
                                container
                                item
                                xs={12}
                                className={classes.fixedHeightContainer}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between">
                                    <Grid item>
                                        <div>
                                            <Typography
                                                display="inline"
                                                variant="h6"
                                                component="h2"
                                                className={classes.title}>
                                                Polls
                                            </Typography>
                                            <Typography
                                                display="inline"
                                                variant="subtitle1"
                                                component="h3">
                                                ({polls ? polls.length : 0})
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <AddPollDialog
                                            userId={user._id}
                                            lists={lists}
                                            addNewPoll={this.props.addNewPoll}
                                            togglePollDialog={
                                                this.togglePollDialog
                                            }
                                            pollDialogIsOpen={pollDialogIsOpen}
                                            toggleSnackbar={toggleSnackbar}
                                            snackbarIsOpen={snackbarIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={4}
                                    className={classes.slider}>
                                    {polls &&
                                        polls.map(poll => (
                                            <PollCard
                                                key={poll._id}
                                                poll={poll}
                                                movePollBy={movePollBy}
                                                lists={lists}
                                                updateVotes={updateVotes}
                                            />
                                        ))}

                                    <Box
                                        key={polls.length}
                                        display={{
                                            xs:
                                                polls.length > 1
                                                    ? "block"
                                                    : "none",
                                            md:
                                                polls.length > 2
                                                    ? "block"
                                                    : "none",
                                            lg:
                                                polls.length > 3
                                                    ? "block"
                                                    : "none"
                                        }}>
                                        <IconButton
                                            color="primary"
                                            className={clsx(
                                                classes.prevButton,
                                                classes.sliderControl
                                            )}
                                            onClick={() =>
                                                this.showPreviousSlide("poll")
                                            }
                                            disabled={pollMove === 0}>
                                            <Icon>chevron_left</Icon>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            className={clsx(
                                                classes.nextButton,
                                                classes.sliderControl
                                            )}
                                            disabled={
                                                pollMove === polls.length - 1
                                            }
                                            onClick={() =>
                                                this.showNextSlide("poll")
                                            }>
                                            <Icon>chevron_right</Icon>
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                className={classes.fixedHeightContainer}>
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between">
                                    <Grid item>
                                        <Typography
                                            display="inline"
                                            variant="h6"
                                            component="h2"
                                            className={classes.title}>
                                            Friend lists
                                        </Typography>
                                        <Typography
                                            display="inline"
                                            variant="subtitle1"
                                            component="h3">
                                            ({lists ? lists.length : 0})
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <AddFriendList
                                            user={user}
                                            users={users}
                                            addNewList={this.props.addNewList}
                                            toggleSnackbar={toggleSnackbar}
                                            snackbarIsOpen={snackbarIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={4}
                                    className={classes.slider}>
                                    {lists &&
                                        lists.map(list => (
                                            <ListCard
                                                key={list._id}
                                                list={list}
                                                moveListBy={moveListBy}
                                            />
                                        ))}
                                    <Box
                                        key={lists.length}
                                        display={{
                                            xs:
                                                lists.length > 1
                                                    ? "block"
                                                    : "none",
                                            md:
                                                lists.length > 2
                                                    ? "block"
                                                    : "none",
                                            lg:
                                                lists.length > 3
                                                    ? "block"
                                                    : "none"
                                        }}>
                                        <IconButton
                                            color="primary"
                                            className={clsx(
                                                classes.prevButton,
                                                classes.sliderControl
                                            )}
                                            onClick={() =>
                                                this.showPreviousSlide("list")
                                            }
                                            disabled={listMove === 0}>
                                            <Icon>chevron_left</Icon>
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            className={clsx(
                                                classes.nextButton,
                                                classes.sliderControl
                                            )}
                                            disabled={
                                                listMove === lists.length - 1
                                            }
                                            onClick={() =>
                                                this.showNextSlide("list")
                                            }>
                                            <Icon>chevron_right</Icon>
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(Profile);
