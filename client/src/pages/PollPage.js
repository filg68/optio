import React, { Component } from "react";
import { socket } from "../utils/setSocketConnection";
import Moment from "react-moment";
import renderAvatar from "../utils/renderAvatar";
import { Link as RouterLink } from "react-router-dom";
import { profileStyles } from "../styles/profileStyles";
import { pollPageStyles } from "../styles/pollPageStyles";
import { withStyles } from "@material-ui/core/styles";

import AddPollDialog from "../components/AddPollDialog";
import { UserPanel } from "../components/UserPanel";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

class PollPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pollDialogIsOpen: false,
            results: [],
            votes: []
        };
    }

    updateResults = results => {
        // update state only if results have changed
        if (this.state.results.length !== results.length) {
            this.setState({ results });
        }
    };

    updateVotes = newVotes => {
        const { votes } = this.state;

        // update state only if votes count has changed:
        if (votes[0] !== newVotes[0] || votes[1] !== newVotes[1]) {
            this.setState({ votes: newVotes });
        }
    };

    fetchUpdatedResults = () => {
        const { _id } = this.props.location.state.poll;
        socket.emit("initial_results", _id);
    };

    componentDidMount() {
        const { _id } = this.props.location.state.poll;

        if (socket) {
            // Fire the initial_votes event to get initial votes count:
            socket.emit("initial_votes", _id);

            // Fire the initial_results event to get voting results:
            socket.emit("initial_results", _id);

            // When results are received, update state:
            socket.on("update_results", this.updateResults);

            // When votes count is received, update state:
            socket.on("update_votes", data => {
                if (data.pollId === _id) this.updateVotes(data.result);
            });

            // Listen for results change event:
            socket.on("results_changed", this.fetchUpdatedResults);

            //  Listen for new vote registration event:
            socket.on("votes_changed", data => {
                // Update local state if change applies to current poll:
                if (data.pollId === _id) {
                    // update local state:
                    this.updateVotes(data.newCounts);

                    // update redux state to make new vote count available on Profile page:
                    this.props.updateVotes(data.pollId, data.newCounts);
                }
            });
        }
    }

    // Remove the listeners before unmounting in order to avoid addition of multiple listeners:
    componentWillUnmount() {
        socket.off("update_results");
        socket.off("results_changed");
        socket.off("update_votes");
        socket.off("votes_changed");
    }

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
            logOut,
            updateUserDataInState,
            toggleDrawer,
            drawerIsOpen,
            mobileDrawerIsOpen
        } = this.props;
        const { poll, lists } = this.props.location.state;
        const { results, votes, pollDialogIsOpen } = this.state;
        const listName = poll.sendToList.title;
        const votesCount = votes[0] + votes[1];

        return (
            <div className={classes.root}>
                <CssBaseline />
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
                <AddPollDialog
                    userId={user._id}
                    lists={lists}
                    togglePollDialog={this.togglePollDialog}
                    pollDialogIsOpen={pollDialogIsOpen}
                    hideButton={true}
                    addNewPoll={this.props.addNewPoll}
                    toggleSnackbar={toggleSnackbar}
                    snackbarIsOpen={snackbarIsOpen}
                />

                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={5} direction="column">
                            <Grid item xs={12} md={6}>
                                <Button
                                    underline="none"
                                    component={RouterLink}
                                    to="/profile"
                                    className={classes.buttonLink}>
                                    <Icon>keyboard_arrow_left</Icon>Back
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        className={classes.pollCardHeader}
                                        title={
                                            <Typography
                                                component="h3"
                                                className={classes.pollTitle}>
                                                {poll.title}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography variant="body2">
                                                {votesCount || 0}{" "}
                                                {votesCount === 1
                                                    ? "answer "
                                                    : "answers "}
                                                from {listName}
                                            </Typography>
                                        }
                                    />
                                    <CardContent
                                        className={classes.cardContent}>
                                        <GridList
                                            cellHeight={180}
                                            className={classes.gridList}>
                                            <GridListTile key={11}>
                                                <img
                                                    src={poll.options[0]}
                                                    alt="First option"
                                                />
                                            </GridListTile>
                                            <GridListTile key={22}>
                                                <img
                                                    src={poll.options[1]}
                                                    alt="Second option"
                                                />
                                            </GridListTile>
                                        </GridList>
                                    </CardContent>
                                    <CardActions
                                        className={classes.votesContainer}>
                                        <div className={classes.votes}>
                                            <IconButton
                                                disabled
                                                className={classes.icon}
                                                aria-label="Vote for first image"
                                                component="span">
                                                <Icon>favorite</Icon>
                                            </IconButton>
                                            <Typography variant="body1">
                                                {votes[0] || 0}
                                            </Typography>
                                        </div>
                                        <div className={classes.votes}>
                                            <IconButton
                                                disabled
                                                className={classes.icon}
                                                aria-label="Vote for second image"
                                                component="span">
                                                <Icon>favorite</Icon>
                                            </IconButton>
                                            <Typography variant="body1">
                                                {votes[1] || 0}
                                            </Typography>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Divider
                                    style={{
                                        display: results.length
                                            ? "block"
                                            : "none"
                                    }}
                                />
                                <List>
                                    {results &&
                                        results.map((voter, i) => {
                                            return (
                                                <ListItem
                                                    key={voter.userId}
                                                    className={
                                                        classes.listItem
                                                    }>
                                                    <ListItemAvatar>
                                                        {renderAvatar(
                                                            voter,
                                                            classes
                                                        )}
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                className={
                                                                    classes.listItemText
                                                                }
                                                                variant="subtitle1">
                                                                {voter.name}{" "}
                                                                voted
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Moment fromNow>
                                                                {
                                                                    voter.updatedAt
                                                                }
                                                            </Moment>
                                                        }
                                                    />

                                                    <ListItemSecondaryAction>
                                                        <Box
                                                            style={{
                                                                backgroundImage: `url(
                                                                ${
                                                                    voter.option ===
                                                                    0
                                                                        ? poll
                                                                              .options[0]
                                                                        : poll
                                                                              .options[1]
                                                                }
                                                            )`
                                                            }}
                                                            className={
                                                                classes.thumbnail
                                                            }></Box>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        })}
                                </List>
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
    ...pollPageStyles(theme)
}))(PollPage);
