import React, { Component } from "react";
import { profileStyles } from "../styles/profileStyles";
import { withStyles } from "@material-ui/core/styles";
import FriendsPollCard from "../components/FriendsPollCard";
import { UserPanel } from "../components/UserPanel";
import AddPollDialog from "../components/AddPollDialog";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class FriendsPolls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false
        };
    }

    componentDidMount() {
        // get user id from location state after redirection
        // or from redux state on page refresh:
        const userId = this.props.location.state.userId || this.props.user._id;

        // get friends polls the user can vote on:
        this.props.getFriendsPolls(userId);
    }

    togglePollDialog = () => {
        this.setState({ pollDialogIsOpen: !this.state.pollDialogIsOpen });
    };

    componentWillUnmount() {
        this.props.resetFriendsPolls();
    }

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
            toggleDrawer,
            drawerIsOpen,
            mobileDrawerIsOpen
        } = this.props;
        const { pollDialogIsOpen } = this.state;
        const { friendsPolls } = this.props;

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
                                                Friends Polls
                                            </Typography>
                                            <Typography
                                                display="inline"
                                                variant="subtitle1"
                                                component="h3">
                                                (
                                                {friendsPolls
                                                    ? friendsPolls.length
                                                    : 0}
                                                )
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <AddPollDialog
                                            userId={user._id}
                                            lists={this.props.user.lists}
                                            addNewPoll={this.props.addNewPoll}
                                            togglePollDialog={
                                                this.togglePollDialog
                                            }
                                            pollDialogIsOpen={pollDialogIsOpen}
                                            hideButton={true}
                                            toggleSnackbar={toggleSnackbar}
                                            snackbarIsOpen={snackbarIsOpen}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item spacing={4}>
                                    {friendsPolls &&
                                        friendsPolls.map(poll => (
                                            <FriendsPollCard
                                                key={poll._id}
                                                poll={poll}
                                                userId={user._id}
                                                registerVote={
                                                    this.props.registerVote
                                                }
                                            />
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }
}

export default withStyles(profileStyles)(FriendsPolls);
