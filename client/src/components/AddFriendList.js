import React, { Component } from "react";
import axios from "axios";
import renderAvatar from "../utils/renderAvatar";
import { withStyles } from "@material-ui/core/styles";
import {
    Button,
    IconButton,
    DialogContent,
    DialogActions,
    Divider,
    TextField,
    Typography,
    FormControl,
    FormHelperText,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Icon
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { ResponsiveDialog } from "./ResponsiveDialog";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing(4)
    },
    title: {
        fontWeight: "600",
        textAlign: "center"
    },
    subtitle: {
        fontWeight: "600"
    },
    error: {
        marginBottom: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    action: {
        justifyContent: "center",
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(4)
    },
    list: {
        maxHeight: "220px"
    },
    item: {
        paddingLeft: "6px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    button: {
        padding: "4px 8px",
        "&.MuiButton-text": {
            textTransform: "initial"
        }
    },
    flexBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
});

// enhance default dialog title area with close button:
const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6" component="h3" className={classes.title}>
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}>
                    <Icon>close</Icon>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

class AddFriendsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listName: "",
            friends: [],
            errors: {}
        };
    }

    openDialog = () => {
        this.setState({ open: true });
    };

    closeDialog = () => {
        this.clearDialogData();
        this.setState({ open: false });
    };

    clearDialogData = () => {
        this.setState({ listName: "", friends: [], errors: {} });
    };

    onChange = e => {
        this.setState({ listName: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { listName, friends } = this.state;

        if (!listName) {
            this.setState({ errors: { name: "Please provide list name" } });
        } else if (!friends.length) {
            this.setState({
                errors: { friends: "Please add friends to the list" }
            });
        } else {
            // create new list and send it to database:
            const newList = {
                userId: this.props.user._id,
                title: listName.trim(),
                friends
            };

            axios
                .post("/api/users/add_friend_list", newList)
                .then(response => {
                    // add new list to Profile and close dialog:
                    if (response.data) {
                        // add new list to Profile and close dialog:
                        this.addNewList(response.data);

                        // open snackbar with success message:
                        this.props.toggleSnackbar({
                            action: "open",
                            message:
                                "A new friend list was successfully created!"
                        });
                        this.closeDialog();
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ errors: err.response.data });
                });
        }
    };

    handleClick = id => {
        if (this.state.friends.includes(id)) {
            // remove friend from friends list:
            this.setState(prevState => ({
                friends: prevState.friends.filter(friendId => friendId !== id)
            }));
        } else {
            // add friend to friends list:
            this.setState({ friends: this.state.friends.concat(id) });
        }
    };

    addNewList = newList => {
        // show friends' names and avatars for the newly created list:
        newList.friends.forEach((id, i, array) => {
            const user = this.props.user.friends.find(user => user._id === id);

            if (user) {
                array[i] = {
                    _id: id,
                    name: user.name,
                    avatar: user.avatar
                };
            }
        });
        this.props.addNewList(newList);
    };

    toggleAllUsers = () => {
        if (this.state.friends.length === this.props.user.friends.length) {
            // clear all users from friends list:
            this.setState({ friends: [] });
        } else {
            // add all users as friends:
            const friends = this.props.user.friends.map(user => user._id);
            this.setState({ friends });
        }
    };

    render() {
        const { classes, user } = this.props;
        const { open, friends, errors, listName } = this.state;
        const isNameInvalid = errors.name && !listName;
        const isListInvalid = errors.friends && !friends.length;

        return (
            <div>
                <Button
                    onClick={this.openDialog}
                    variant="contained"
                    color="primary"
                    size="medium">
                    Create list
                </Button>

                <ResponsiveDialog
                    onClose={this.closeDialog}
                    aria-labelledby="create-friend-list"
                    open={open}>
                    <DialogTitle
                        id="create-friend-list"
                        onClose={this.closeDialog}>
                        Create a friend list
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    value={listName}
                                    error={errors.name && !listName}
                                    onChange={this.onChange}
                                    id="list-name"
                                    placeholder="Enter name of list"
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="list-name"
                                    className={classes.error}>
                                    {isNameInvalid
                                        ? errors.name
                                        : isListInvalid
                                        ? errors.friends
                                        : errors.error}
                                </FormHelperText>
                            </FormControl>

                            <div className={classes.flexBox}>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Add friends:
                                </Typography>
                                <Button
                                    onClick={this.toggleAllUsers}
                                    color="secondary"
                                    className={classes.button}>
                                    {user.friends.length === friends.length
                                        ? "Remove all"
                                        : "Select all"}
                                </Button>
                            </div>
                            <Divider />
                            <List dense className={classes.list}>
                                {user.friends.map(user => {
                                    const included = friends.includes(user._id);
                                    return (
                                        <ListItem
                                            key={user._id}
                                            className={classes.item}>
                                            <ListItemAvatar>
                                                {renderAvatar(user, classes)}
                                            </ListItemAvatar>
                                            <ListItemText primary={user.name} />
                                            <ListItemSecondaryAction>
                                                <Button
                                                    className={classes.button}
                                                    onClick={() =>
                                                        this.handleClick(
                                                            user._id
                                                        )
                                                    }
                                                    variant={
                                                        included
                                                            ? "text"
                                                            : "contained"
                                                    }
                                                    size="small"
                                                    color="secondary">
                                                    {included
                                                        ? "Remove"
                                                        : "Add"}
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </DialogContent>

                        <DialogActions className={classes.action}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </ResponsiveDialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddFriendsList);
