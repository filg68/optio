import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
    loadUserData,
    logOut,
    loadUsers,
    addNewList,
    addNewPoll,
    registerVote,
    getFriendsPolls,
    changeFriendStatus,
    updateVotes,
    updateUserDataInState,
    toggleSnackbar,
    resetFriendsPolls,
    toggleDrawer
} from "./actions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Loader from "./components/Loader";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PollPage from "./pages/PollPage";
import FriendsPolls from "./pages/FriendsPolls";
import Friends from "./pages/Friends";

import setupResultInterceptor from "./utils/axiosInterceptors";

import { setSocketConnection, socket } from "./utils/setSocketConnection";

// declare what pieces of state we want to have access to:
const mapStateToProps = (
    state,
    newParam = {
        user: state.userReducer,
        isLoading: state.userReducer.isLoading,
        users: state.usersReducer.users,
        friendsPolls: state.pollsReducer.friendsPolls,
        snackbarIsOpen: state.snackbarReducer.snackbarIsOpen,
        snackbarMessage: state.snackbarReducer.snackbarMessage,
        drawerIsOpen: state.friendsDrawerReducer.drawerIsOpen,
        mobileDrawerIsOpen: state.friendsDrawerReducer.mobileDrawerIsOpen
    }
) => {
    return newParam;
};

// declare which action creators you need to be able to dispatch:
const mapDispatchToProps = dispatch => {
    return {
        loadUserData: data => dispatch(loadUserData(data)),
        loadUsers: id => dispatch(loadUsers(id)),
        addNewList: data => dispatch(addNewList(data)),
        addNewPoll: data => dispatch(addNewPoll(data)),
        registerVote: data => dispatch(registerVote(data)),
        getFriendsPolls: data => dispatch(getFriendsPolls(data)),
        changeFriendStatus: data => dispatch(changeFriendStatus(data)),
        logOut: () => dispatch(logOut()),
        updateVotes: (pollId, votes) => dispatch(updateVotes(pollId, votes)),
        updateUserDataInState: data => dispatch(updateUserDataInState(data)),
        toggleSnackbar: data => dispatch(toggleSnackbar(data)),
        resetFriendsPolls: () => dispatch(resetFriendsPolls()),
        toggleDrawer: data => dispatch(toggleDrawer(data))
    };
};

class App extends Component {
    componentDidMount() {
        // Check for token to keep user logged in:
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;

            // decode token, load user data and his/her suggested friends:
            const decoded = this.decodeTokenAndFetchData(token);

            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds

            if (decoded.exp < currentTime) {
                this.logOut();
            }
        }

        // Re-set the authorization header if the jwtToken key is changed
        window.addEventListener("storage", e => {
            if (e.key === "jwtToken") {
                setAuthToken(e.key);
                console.log("\x1b[44m jwt token has changed! \x1b[0m");
            }
        });

        // Register an Axios interceptor to catch 401 errors and logout automatically
        setupResultInterceptor(this.logOut);
    }

    decodeTokenAndFetchData = token => {
        setAuthToken(token);

        // Decode token and get user info:
        const decoded = jwt_decode(token);

        // initialize socket connection
        setSocketConnection(token);

        // Fetch current user data:
        this.props.loadUserData(decoded.id);

        // Fetch suggested friends excluding current user and his/her curernt friends:
        this.props.loadUsers(decoded.id);

        return decoded;
    };

    logOut = () => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");

        // Remove auth header for future requests
        setAuthToken(false);

        // Reset the state
        this.props.logOut();

        // Notify back-end that user has logged out:
        socket.emit("user_logged_out", this.props.user._id);
    };

    render() {
        const isAuthenticated = localStorage.jwtToken;

        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props =>
                                isAuthenticated ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Signup
                                        {...props}
                                        decodeTokenAndFetchData={
                                            this.decodeTokenAndFetchData
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/signup"
                            render={props =>
                                isAuthenticated ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Signup
                                        {...props}
                                        decodeTokenAndFetchData={
                                            this.decodeTokenAndFetchData
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/login"
                            render={props =>
                                isAuthenticated ? (
                                    <Redirect to="/profile" />
                                ) : (
                                    <Login
                                        {...props}
                                        decodeTokenAndFetchData={
                                            this.decodeTokenAndFetchData
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/profile"
                            render={props =>
                                this.props.isLoading ? (
                                    <Loader />
                                ) : isAuthenticated ? (
                                    <Profile
                                        {...props}
                                        user={this.props.user}
                                        users={this.props.users}
                                        loadUsers={this.props.loadUsers}
                                        addNewList={this.props.addNewList}
                                        addNewPoll={this.props.addNewPoll}
                                        logOut={this.logOut}
                                        updateUserDataInState={
                                            this.props.updateUserDataInState
                                        }
                                        snackbarIsOpen={
                                            this.props.snackbarIsOpen
                                        }
                                        toggleSnackbar={
                                            this.props.toggleSnackbar
                                        }
                                        snackbarMessage={
                                            this.props.snackbarMessage
                                        }
                                        updateVotes={this.props.updateVotes}
                                        toggleDrawer={this.props.toggleDrawer}
                                        drawerIsOpen={this.props.drawerIsOpen}
                                        mobileDrawerIsOpen={
                                            this.props.mobileDrawerIsOpen
                                        }
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/poll/:id"
                            render={props =>
                                this.props.isLoading ? (
                                    <Loader />
                                ) : isAuthenticated ? (
                                    <PollPage
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        logOut={this.logOut}
                                        addNewPoll={this.props.addNewPoll}
                                        updateVotes={this.props.updateVotes}
                                        updateUserDataInState={
                                            this.props.updateUserDataInState
                                        }
                                        snackbarIsOpen={
                                            this.props.snackbarIsOpen
                                        }
                                        toggleSnackbar={
                                            this.props.toggleSnackbar
                                        }
                                        snackbarMessage={
                                            this.props.snackbarMessage
                                        }
                                        toggleDrawer={this.props.toggleDrawer}
                                        drawerIsOpen={this.props.drawerIsOpen}
                                        mobileDrawerIsOpen={
                                            this.props.mobileDrawerIsOpen
                                        }
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/user/:id"
                            render={props =>
                                this.props.isLoading ? (
                                    <Loader />
                                ) : isAuthenticated ? (
                                    <Profile
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        loadUsers={this.props.loadUsers}
                                        logOut={this.logOut}
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/friends-polls"
                            render={props =>
                                this.props.isLoading ? (
                                    <Loader />
                                ) : isAuthenticated ? (
                                    <FriendsPolls
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        addNewPoll={this.props.addNewPoll}
                                        friendsPolls={this.props.friendsPolls}
                                        getFriendsPolls={
                                            this.props.getFriendsPolls
                                        }
                                        registerVote={this.props.registerVote}
                                        logOut={this.logOut}
                                        updateUserDataInState={
                                            this.props.updateUserDataInState
                                        }
                                        snackbarIsOpen={
                                            this.props.snackbarIsOpen
                                        }
                                        toggleSnackbar={
                                            this.props.toggleSnackbar
                                        }
                                        snackbarMessage={
                                            this.props.snackbarMessage
                                        }
                                        resetFriendsPolls={
                                            this.props.resetFriendsPolls
                                        }
                                        toggleDrawer={this.props.toggleDrawer}
                                        drawerIsOpen={this.props.drawerIsOpen}
                                        mobileDrawerIsOpen={
                                            this.props.mobileDrawerIsOpen
                                        }
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/friends"
                            render={props =>
                                this.props.isLoading ? (
                                    <Loader />
                                ) : isAuthenticated ? (
                                    <Friends
                                        {...props}
                                        users={this.props.users}
                                        user={this.props.user}
                                        loadUsers={this.props.loadUsers}
                                        addNewPoll={this.props.addNewPoll}
                                        changeFriendStatus={
                                            this.props.changeFriendStatus
                                        }
                                        logOut={this.logOut}
                                        updateUserDataInState={
                                            this.props.updateUserDataInState
                                        }
                                        snackbarIsOpen={
                                            this.props.snackbarIsOpen
                                        }
                                        toggleSnackbar={
                                            this.props.toggleSnackbar
                                        }
                                        snackbarMessage={
                                            this.props.snackbarMessage
                                        }
                                        toggleDrawer={this.props.toggleDrawer}
                                        drawerIsOpen={this.props.drawerIsOpen}
                                        mobileDrawerIsOpen={
                                            this.props.mobileDrawerIsOpen
                                        }
                                    />
                                ) : (
                                    <Redirect to="/login" />
                                )
                            }
                        />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

// use connect to connect React to Redux:
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
