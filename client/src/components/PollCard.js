import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { profileStyles } from "../styles/profileStyles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Grid,
    GridList,
    GridListTile,
    Icon,
    Link,
    IconButton
} from "@material-ui/core";
import { socket } from "../utils/setSocketConnection";

class PollCard extends React.Component {
    componentDidMount() {
        const { _id } = this.props.poll;
        //   Listen to new vote registration event:
        socket.on("votes_changed", data => {
            // if vote was registered for this poll, update vote count:
            if (data.pollId === _id) {
                this.props.updateVotes(data.pollId, data.newCounts);
            }
        });
    }

    componentWillUnmount() {
        socket.off("votes_changed");
    }

    render() {
        const { classes, poll, lists } = this.props;
        const { title, options, votes, _id } = this.props.poll;
        const listName = this.props.poll.sendToList.title;
        const votesCount = votes[0] + votes[1];

        return (
            <Grid
                item
                key={_id}
                xs={12}
                md={6}
                lg={4}
                style={{ transform: `translateX(-${this.props.movePollBy}%)` }}>
                <Card className={classes.card}>
                    <Link
                        underline="none"
                        component={RouterLink}
                        to={{
                            pathname: `/poll/${_id}`,
                            state: {
                                lists,
                                poll
                            }
                        }}>
                        <CardHeader
                            className={classes.pollCardHeader}
                            title={
                                <Typography
                                    component="h3"
                                    className={classes.pollTitle}>
                                    {title}
                                </Typography>
                            }
                            subheader={
                                <Typography variant="body2">
                                    {votesCount || 0}{" "}
                                    {votesCount === 1 ? "answer " : "answers "}
                                    from {listName}
                                </Typography>
                            }
                        />
                        <CardContent className={classes.cardContent}>
                            <GridList
                                cellHeight={180}
                                className={classes.gridList}>
                                <GridListTile key={1}>
                                    <img src={options[0]} alt="First option" />
                                </GridListTile>
                                <GridListTile key={2}>
                                    <img src={options[1]} alt="Second option" />
                                </GridListTile>
                            </GridList>

                            <CardActions className={classes.votesContainer}>
                                <div className={classes.votes}>
                                    <IconButton
                                        disabled={true}
                                        className={classes.icon}
                                        aria-label="Votes for first image"
                                        component="span">
                                        <Icon>favorite</Icon>
                                    </IconButton>
                                    <Typography variant="body1">
                                        {votes[0] || 0}
                                    </Typography>
                                </div>
                                <div className={classes.votes}>
                                    <IconButton
                                        disabled={true}
                                        className={classes.icon}
                                        aria-label="Votes for second image"
                                        component="span">
                                        <Icon>favorite</Icon>
                                    </IconButton>
                                    <Typography variant="body1">
                                        {votes[1] || 0}
                                    </Typography>
                                </div>
                            </CardActions>
                        </CardContent>
                    </Link>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(profileStyles)(PollCard);
