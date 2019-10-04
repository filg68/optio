import React, { Component } from "react";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// App components

// Utility Modules
import { updateAvatar, updateUserData } from "../utils/editUserData";
const isEmpty = require("is-empty");

// Constants
const TARGET_AVATAR = "avatar_image";

// Component Styles
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
    },
    button: {
        padding: "4px 8px",
        "&.MuiButton-text": {
            textTransform: "initial"
        }
    },
    bigAvatar: {
        display: "inline-flex",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100px",
        height: "100px",
        marginBottom: theme.spacing(2),
        textTransform: "uppercase",
        fontSize: "60px"
    },
    bigInput: {
        display: "inline",
        opacity: "0",
        position: "absolute",
        zIndex: 10,
        left: "148px",
        borderRadius: "100px",
        width: "100px",
        height: "100px",
        cursor: "pointer"
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

// Component definition
class EditProfileDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: this.props.name,
            newAvatar: this.props.avatar,
            newEmail: this.props.email,
            newFile: "",
            target: TARGET_AVATAR,
            saveIsDisabled: true,
            errors: {}
        };
    }

    clearDialogData = () => {
        this.setState({
            newName: this.props.name,
            newAvatar: this.props.avatar,
            newEmail: this.props.email,
            target: TARGET_AVATAR,
            saveIsDisabled: true,
            errors: {}
        });
    };

    closeDialog = () => {
        this.props.toggleEditProfileDialog();
    };

    disableSaveButton = () => {
        this.setState({ saveIsDisabled: true });
    };

    enableSaveButton = () => {
        this.setState({ saveIsDisabled: false });
    };

    handleAvatarChange = e => {
        if (e.target.files.length === 1) {
            window.URL = window.URL || window.webkitURL;
            this.setState({
                newAvatar: window.URL.createObjectURL(e.target.files[0]),
                newFile: e.target.files[0]
            });
            this.enableSaveButton();
        }
    };

    handleEmailChange = e => {
        this.setState({ newEmail: e.target.value });
        this.setState({ saveIsDisabled: false });
        this.setState({ errors: { email: " " } });
        if (e.target.value === this.props.email || !e.target.value) {
            this.setState({ saveIsDisabled: true });
        }
        if (!e.target.value) {
            this.setState({
                errors: { email: "You need to provide an e-mail." }
            });
        }
    };

    handleNameChange = e => {
        this.setState({ newName: e.target.value });
        this.setState({ saveIsDisabled: false });
        this.setState({ errors: { name: " " } });
        if (e.target.value === this.props.name || !e.target.value) {
            this.setState({ saveIsDisabled: true });
        }
        if (!e.target.value) {
            this.setState({ saveIsDisabled: true });
            this.setState({ errors: { name: "You need to provide a name." } });
        }
    };

    onCancel = () => {
        // Added middle step in the event we need to add some closing routines
        this.clearDialogData();
        this.closeDialog();
    };

    onSubmit = e => {
        e.preventDefault();
        const { newName, newEmail, newFile } = this.state;
        const { userId, name, email, changeAvatar } = this.props;

        // disable the submit button to avoid duplicates
        this.disableSaveButton();

        // array to store promises
        const promises = [];

        // create json object for name and e-mail changes
        const newUserData = {};
        if (newName !== name) {
            newUserData["name"] = newName;
        }
        if (newEmail !== email) {
            newUserData["email"] = newEmail;
        }
        if (!isEmpty(newUserData)) {
            // add userId to query
            newUserData["userId"] = userId;
            promises.push(updateUserData(newUserData));
        }

        // create FormData object for file uploads
        if (newFile) {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("target", TARGET_AVATAR);
            formData.append("newFile", newFile, newFile.name);
            promises.push(
                updateAvatar(formData, response => {
                    this.setState({ newAvatar: response.data.avatarUrl });
                    changeAvatar(response.data.avatarUrl);
                })
            );
        }

        // replace current avatar and close dialog:
        //this.props.changeAvatar(response.data.data);
        Promise.all(promises)
            .then(value => {
                this.closeDialog();
            })
            .catch(err => {
                // TODO - how do we alert the user that there was a problem
                this.closeDialog();
                console.log(err);
            });
    };

    revokeUrl = e => {
        // need to revoke url assigned to image to prevent memory leaks
        window.URL = window.URL || window.webkitURL;
        window.URL.revokeObjectURL(e.target.src);
    };

    render() {
        const { classes } = this.props;
        const {
            errors,
            newName,
            newEmail,
            newAvatar,
            saveIsDisabled
        } = this.state;

        return (
            <div>
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    onClose={this.props.toggleEditProfileDialog}
                    aria-labelledby="edit-profile"
                    open={this.props.editProfileDialogIsOpen}>
                    <DialogTitle
                        id="edit-profile"
                        onClose={this.props.toggleEditProfileDialog}>
                        Edit Profile
                    </DialogTitle>
                    <form noValidate onSubmit={this.onSubmit}>
                        <DialogContent>
                            <FormControl fullWidth>
                                {newAvatar ? (
                                    <Avatar
                                        className={classes.bigAvatar}
                                        alt={`Avatar of user ${this.props.name}`}
                                        src={newAvatar || this.props.avatar}
                                        onLoad={this.revokeUrl}
                                    />
                                ) : (
                                    <Avatar
                                        className={classes.bigAvatar}
                                        alt={`Avatar of user ${newName}`}>
                                        {newName[0]}
                                    </Avatar>
                                )}
                                <input
                                    type="file"
                                    id="avatar_file"
                                    accept="image/*"
                                    className={classes.bigInput}
                                    onChange={this.handleAvatarChange}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Name:
                                </Typography>
                                <TextField
                                    value={newName}
                                    error={errors.name && !newName}
                                    onChange={this.handleNameChange}
                                    id="name"
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="name-error"
                                    className={classes.error}>
                                    {errors.name}
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography
                                    variant="subtitle1"
                                    component="h4"
                                    className={classes.subtitle}>
                                    Email:
                                </Typography>
                                <TextField
                                    value={newEmail}
                                    error={errors.email && !newEmail}
                                    onChange={this.handleEmailChange}
                                    id="email"
                                    margin="none"
                                    variant="outlined"
                                />
                                <FormHelperText
                                    error
                                    id="email-error"
                                    className={classes.error}>
                                    {errors.email}
                                </FormHelperText>
                            </FormControl>
                        </DialogContent>

                        <DialogActions className={classes.action}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                disabled={saveIsDisabled}
                                color="secondary">
                                Save
                            </Button>
                            <Button
                                type="button"
                                onClick={this.onCancel}
                                variant="contained"
                                size="small"
                                disabled={false}
                                color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(EditProfileDialog);
