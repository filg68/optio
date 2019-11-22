import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

import { FileDrop } from "./FileDrop";
import { AdornedButton } from "./AdornedButton";
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
        fontWeight: "600",
        marginBottom: theme.spacing(2)
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
        paddingTop: theme.spacing(2)
    },
    item: {
        paddingLeft: "6px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
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

class AddPollDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            image1: "",
            image2: "",
            expiresOn: "",
            sendToList: "",
            target: "poll_images",
            buttonIsDisabled: false,
            errors: {}
        };
    }

    clearDialogData = () => {
        this.setState({
            userId: this.props.userId,
            title: "",
            image1: "",
            image2: "",
            expiresOn: "",
            sendToList: "",
            target: "poll_images",
            buttonIsDisabled: false,
            errors: {}
        });
    };

    closeDialog = () => {
        this.clearDialogData();
        this.props.togglePollDialog();
    };

    handleTitleChange = e => {
        this.setState({ title: e.target.value });
    };

    handleSelectChange = e => {
        this.setState({ sendToList: e.target.value });
        //the select list value is set to a string of the form
        //"list._id list.title list.friends.length" in order to be able to display the list title
        //in the select input field -- this is a limitation imposed by the React
        //component.  Need to extract the id from the sendToList component when
        //saving it.  This change was made in order to add the list name to the
        //poll card.
    };

    onSubmit = e => {
        e.preventDefault();
        const { title, image1, image2, sendToList } = this.state;

        if (!title) {
            this.setState({
                errors: { title: "Please provide a question for the poll." }
            });
        } else if (!sendToList) {
            this.setState({
                errors: { list: "Please add a Friend list." }
            });
        } else if (!image1 || !image2) {
            this.setState({
                errors: { pollImages: "Please add both images." }
            });
        } else {
            // disable the submit button to avoid duplicates
            this.toggleSubmitButton();
            // load poll data and send it to upload api:
            let formData = new FormData();
            formData.append("userId", this.props.userId);
            formData.append("title", title);
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("sendToList", sendToList.split(" ")[0]);
            formData.append("target", "poll_images");

            axios
                .post("/api/images/upload", formData)
                .then(response => {
                    if (response.data.status !== 200) {
                        console.log(response.data.errors);
                        this.setState({
                            errors: { error: response.data.error }
                        });
                        return;
                    }

                    // add the list title and voter counts to the returned data
                    response.data.newPoll.sendToList = {
                        _id: sendToList.split(" ")[0],
                        title: sendToList.split(" ")[1],
                        voterCount: sendToList.split(" ")[2]
                    };
                    // add new poll to Profile and close dialog
                    this.props.addNewPoll(response.data.newPoll);
                    this.closeDialog();
                    // open snackbar with success message:
                    this.props.toggleSnackbar({
                        action: "open",
                        message: "A new poll was successfully created!"
                    });
                })
                .catch(err => {
                    console.log(err);
                    //this.setState({ errors: err.response.data });
                });
        }
    };

    // callback function to retrieve file from FileDrop component
    setImageFile = (file, option) => {
        if (option === 1) {
            this.setState({ image1: file[0] });
        }
        if (option === 2) {
            this.setState({ image2: file[0] });
        }
    };

    toggleSubmitButton = () => {
        this.setState({ buttonIsDisabled: !this.state.buttonIsDisabled });
    };

    render() {
        const { classes, lists, hideButton } = this.props;
        const { errors, sendToList, title, buttonIsDisabled } = this.state;

        return (
            <div>
                <Button
                    aria-label="create poll button"
                    onClick={this.props.togglePollDialog}
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{
                        display: hideButton ? "none" : "block" // hide button on poll page
                        // or on friend's profile
                    }}>
                    Create poll
                </Button>
                <ResponsiveDialog
                    onClose={this.closeDialog}
                    aria-labelledby="create-poll"
                    open={this.props.pollDialogIsOpen}>
                    <DialogTitle id="create-poll" onClose={this.closeDialog}>
                        Create a poll
                    </DialogTitle>

                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Question:
                                </Typography>
                                <TextField
                                    value={title}
                                    error={errors.name && !title}
                                    onChange={this.handleTitleChange}
                                    id="poll-question"
                                    placeholder="Enter question ..."
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="poll-question-error"
                                    className={classes.error}>
                                    {errors.title}
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Friend list:
                                </Typography>
                                <Select
                                    value={sendToList}
                                    error={errors.list && !sendToList}
                                    onChange={this.handleSelectChange}
                                    input={<Input id="select-poll-list" />}
                                    displayEmpty={true}>
                                    {lists.map(list => {
                                        return (
                                            <MenuItem
                                                key={list._id}
                                                value={`${list._id} ${list.title} ${list.friends.length}`}
                                                className={classes.item}>
                                                {list.title}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText
                                    error
                                    id="select-poll-error"
                                    className={classes.error}>
                                    {errors.list}
                                </FormHelperText>
                            </FormControl>
                            <Grid
                                container
                                justify="space-evenly"
                                direction="row">
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FileDrop
                                            option={1}
                                            setImageFile={this.setImageFile}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <FileDrop
                                            option={2}
                                            setImageFile={this.setImageFile}
                                        />
                                    </FormControl>
                                </Grid>
                                <FormHelperText
                                    error
                                    id="image-files-error"
                                    className={classes.error}>
                                    {errors.pollImages}
                                </FormHelperText>
                            </Grid>
                        </DialogContent>

                        <DialogActions className={classes.action}>
                            <AdornedButton
                                aria-label="create poll"
                                loading={this.state.buttonIsDisabled}
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={buttonIsDisabled}
                                color="primary">
                                Create
                            </AdornedButton>
                        </DialogActions>
                    </form>
                </ResponsiveDialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddPollDialog);
