import React, { Component } from "react";
import axios from "axios";
import AuthNavbar from "../components/AuthNavbar";
import { withStyles } from "@material-ui/styles";
import { authStyles } from "../styles/authStyles";
import { DEMO_EMAIL, DEMO_PASSWORD } from "../constants.js";
import clsx from "clsx";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from "@material-ui/core/Link";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        if (!email.length) {
            this.setState({ errors: { email: "Email is required" } });
        } else if (password.length < 6) {
            this.setState({
                errors: {
                    password: "Password should be at least 6 characters long"
                }
            });
        } else {
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            this.loginUser(user);
        }
    };

    loginUser = userData => {
        axios
            .post("/api/users/login", userData)
            .then(response => {
                if (response.data.status === 500) {
                    // if token generation failed:
                    this.setState({
                        errors: {
                            error:
                                "Something went wrong. Please try again later."
                        }
                    });
                } else {
                    const { token } = response.data;
                    // save token to localStorage
                    localStorage.setItem("jwtToken", token);

                    this.props.decodeTokenAndFetchData(token);
                }
            })
            .catch(err => {
                console.log("Error logging user in: ", err);
                // show errors from the server:
                this.setState({ errors: err.response.data });
            });
    };

    demoLogin = () => {
        this.setState({ email: DEMO_EMAIL, password: DEMO_PASSWORD }, () => {
            const user = {
                email: DEMO_EMAIL,
                password: DEMO_PASSWORD
            };
            this.loginUser(user);
        });
    };

    render() {
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <>
                <AuthNavbar target="signup" />
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Container maxWidth="xs" className={classes.container}>
                            <div>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    className={classes.heading}>
                                    Log In
                                </Typography>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={classes.uppercase}
                                                error={
                                                    errors.email !== undefined
                                                }
                                                onChange={this.onChange}
                                                variant="outlined"
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="true"
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                            <FormHelperText
                                                error
                                                id="email-error-field">
                                                {errors.email}
                                            </FormHelperText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                className={classes.uppercase}
                                                error={
                                                    errors.password !==
                                                    undefined
                                                }
                                                onChange={this.onChange}
                                                variant="outlined"
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="true"
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                            />
                                            <FormHelperText
                                                error
                                                id="password-error-field">
                                                {errors.password}
                                            </FormHelperText>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.link}>
                                            <Typography variant="body2">
                                                <Link
                                                    href="#"
                                                    color="textPrimary">
                                                    Forgot password?
                                                </Link>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <div className={classes.btnContainer}>
                                        <Button
                                            className={classes.btn}
                                            id="submitButton"
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary">
                                            Login
                                        </Button>
                                        <Button
                                            onClick={this.demoLogin}
                                            className={clsx(
                                                classes.btn,
                                                classes.demoBtn
                                            )}
                                            id="demoSubmitButton"
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary">
                                            Demo Login
                                        </Button>
                                    </div>
                                    <FormHelperText
                                        error
                                        id="submitButton-error-field">
                                        {errors.error}
                                    </FormHelperText>
                                </form>
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.hero}></Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(authStyles)(Login);
