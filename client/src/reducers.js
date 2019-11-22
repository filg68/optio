import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USERS_SUCCESS,
    API_REQUEST_FAILURE,
    ADD_NEW_LIST,
    ADD_NEW_POLL,
    LOGOUT,
    REGISTER_VOTE_SUCCESS,
    GET_FRIENDS_POLLS_SUCCESS,
    CHANGE_FRIEND_STATUS_SUCCESS,
    USER_DATA_LOADING,
    UPDATE_VOTES,
    UPDATE_USER_DATA,
    TOGGLE_SNACKBAR,
    RESET_FRIENDS_POLLS,
    TOGGLE_DRAWER
} from "./constants.js";

const userInitialState = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    lists: [],
    polls: [],
    friends: [],
    error: "",
    isLoading: false,
    online: false
};

const usersInitialState = {
    users: [],
    error: ""
};

const friendsPollsInitialState = {
    friendsPolls: [],
    error: ""
};

const snackbarInitialState = {
    snackbarIsOpen: false,
    snackbarMessage: ""
};

const friendsDrawerInitialState = {
    drawerIsOpen: true,
    mobileDrawerIsOpen: false
};

export const userReducer = (state = userInitialState, action = {}) => {
    switch (action.type) {
        case USER_DATA_LOADING:
            return Object.assign({}, state, { isLoading: true });

        case FETCH_USER_DATA_SUCCESS:
            if (action.response.status === 200) {
                // return new state with user details:
                return Object.assign({}, state, {
                    _id: action.response.data._id,
                    name: action.response.data.name,
                    email: action.response.data.email,
                    polls: action.response.data.polls,
                    lists: action.response.data.lists,
                    avatar: action.response.data.avatar,
                    friends: action.response.data.friends,
                    online: action.response.data.online,
                    error: "",
                    isLoading: false
                });
            } else if (action.response.status === 500) {
                // TODO: show spinner icon or eror
                return;
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case API_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        case ADD_NEW_LIST:
            return Object.assign({}, state, {
                lists: [action.data, ...state.lists]
            });

        case ADD_NEW_POLL:
            return Object.assign({}, state, {
                polls: [action.data, ...state.polls]
            });

        case CHANGE_FRIEND_STATUS_SUCCESS:
            if (action.action === "follow") {
                if (action.response.data.status !== 500) {
                    const newFriend = {
                        _id: action.response.data.friendId,
                        name: action.response.data.name,
                        avatar: action.response.data.avatar,
                        online: action.response.data.online
                    };
                    return Object.assign({}, state, {
                        friends: [...state.friends, newFriend]
                    });
                } else {
                    return Object.assign({}, state, {
                        error: action.error
                    });
                }
            } else {
                if (action.response.data.status !== 500) {
                    const updatedFriends = state.friends.filter(
                        friend => friend._id !== action.response.data.friendId
                    );
                    return Object.assign({}, state, {
                        friends: updatedFriends
                    });
                } else {
                    return Object.assign({}, state, {
                        error: action.error
                    });
                }
            }
        case UPDATE_VOTES:
            const updatedPolls = state.polls.map(poll => {
                // Find the poll with the matching pollId
                if (poll._id === action.pollId) {
                    // Return a new object
                    return {
                        ...poll, // copy the existing poll
                        votes: action.votes // replace the votes array
                    };
                }

                // Leave every other poll unchanged
                return poll;
            });

            return Object.assign({}, state, { polls: updatedPolls });

        case LOGOUT:
            return userInitialState;

        case UPDATE_USER_DATA:
            return Object.assign({}, state, {
                [action.target]: action.newData
            });
        default:
            return state;
    }
};

export const usersReducer = (state = usersInitialState, action = {}) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            if (
                action.response.status === 200 &&
                action.response.data.status !== 500
            ) {
                // return new state with users:
                return Object.assign({}, state, {
                    users: action.response.data
                });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case API_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        default:
            return state;
    }
};

export const pollsReducer = (state = friendsPollsInitialState, action = {}) => {
    switch (action.type) {
        case GET_FRIENDS_POLLS_SUCCESS:
            // Object.assign({}, friendsPollsInitialState);

            if (action.response.status === 200) {
                return Object.assign({}, state, {
                    friendsPolls: action.response.data
                });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }
        case REGISTER_VOTE_SUCCESS:
            if (action.response.status === 200) {
                const { pollId, newCounts } = action.response.data;

                const updatedPolls = state.friendsPolls.map(poll => {
                    // Find the poll with the matching pollId
                    if (poll._id === pollId) {
                        // Return a new object
                        return {
                            ...poll, // copy the existing poll
                            votes: newCounts // replace the votes array
                        };
                    }

                    // Leave every other poll unchanged
                    return poll;
                });

                return Object.assign({}, state, { friendsPolls: updatedPolls });
            } else {
                return Object.assign({}, state, {
                    error: action.response.data
                });
            }

        case API_REQUEST_FAILURE:
            console.log("action.error: ", action.error);
            return Object.assign({}, state, { error: action.error });

        case RESET_FRIENDS_POLLS:
            return friendsPollsInitialState;

        default:
            return state;
    }
};

export const snackbarReducer = (state = snackbarInitialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_SNACKBAR:
            if (action.action === "open") {
                return Object.assign({}, state, {
                    snackbarIsOpen: true,
                    snackbarMessage: action.message
                });
            } else {
                return Object.assign({}, state, {
                    snackbarIsOpen: false,
                    snackbarMessage: ""
                });
            }

        default:
            return state;
    }
};

export const friendsDrawerReducer = (
    state = friendsDrawerInitialState,
    action = {}
) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return Object.assign({}, state, {
                [action.target]: !state[action.target]
            });

        default:
            return state;
    }
};
