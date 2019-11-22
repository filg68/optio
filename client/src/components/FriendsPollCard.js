import React from "react";
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
    IconButton
} from "@material-ui/core";
import { socket } from "../utils/setSocketConnection";

class FriendsPollCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: [],
            votedForOption: null
        };
    }

    componentDidMount() {
        const { _id } = this.props.poll;

        // initialize votes array:
        this.setState({ votes: this.props.poll.votes });

        // listen to the new vote registration event:
        socket.on("votes_changed", data => {
            // if data change concerns this poll, update vote count:
            if (data.pollId === _id) {
                this.setState({ votes: data.newCounts });
            }
        });
    }

    componentWillUnmount() {
        socket.off("votes_changed");
    }

    registerVote = option => {
        const dataToSend = {
            pollId: this.props.poll._id,
            userId: this.props.userId,
            option
        };

        // Emit new event to back-end:
        socket.emit("register_vote", dataToSend);

        this.setState({ votedForOption: option });
    };

    render() {
        const { classes } = this.props;
        const { title, options, id } = this.props.poll;
        const { votes, votedForOption } = this.state;
        const votesCount = votes[0] + votes[1];

        return (
            <Grid item key={id} xs={12} md={6} lg={4}>
                <Card className={classes.card}>
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
                                {votesCount === 1 ? "answer" : "answers"}
                            </Typography>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <GridList cellHeight={180} className={classes.gridList}>
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
                                    disabled={votedForOption === 0}
                                    onClick={() => this.registerVote(0)}
                                    className={classes.icon}
                                    aria-label="Votes for first image"
                                    component="span">
                                    {votedForOption === 0 ? (
                                        <Icon>favorite</Icon>
                                    ) : (
                                        <Icon>favorite_border</Icon>
                                    )}
                                </IconButton>
                                <Typography variant="body1">
                                    {votes[0] || 0}
                                </Typography>
                            </div>
                            <div className={classes.votes}>
                                <IconButton
                                    disabled={votedForOption === 1}
                                    onClick={() => this.registerVote(1)}
                                    className={classes.icon}
                                    aria-label="Votes for second image"
                                    component="span">
                                    {votedForOption === 1 ? (
                                        <Icon>favorite</Icon>
                                    ) : (
                                        <Icon>favorite_border</Icon>
                                    )}
                                </IconButton>
                                <Typography variant="body1">
                                    {votes[1] || 0}
                                </Typography>
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(profileStyles)(FriendsPollCard);
