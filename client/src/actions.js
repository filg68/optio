import {
    LOGOUT,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USERS_SUCCESS,
    ADD_NEW_LIST,
    ADD_NEW_POLL,
    API_REQUEST_FAILURE,
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

import fetchDataAPI from "./api/fetchDataAPI";
import postDataAPI from "./api/postDataAPI";

export const loadUserData = data => dispatch => {
    dispatch({ type: USER_DATA_LOADING });
    return fetchDataAPI
        .fetchUserData(data)
        .then(response => {
            dispatch(fetchUserDataSuccess(response));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const loadUsers = id => dispatch => {
    return fetchDataAPI
        .fetchUsers(id)
        .then(response => {
            dispatch(fetchUsersSuccess(response, id));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const getFriendsPolls = data => dispatch => {
    return fetchDataAPI
        .fetchFriendsPolls(data)
        .then(response => {
            dispatch(getFriendsPollsSuccess(response));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const changeFriendStatus = data => dispatch => {
    return postDataAPI
        .changeFriendStatus(data)
        .then(response => {
            dispatch(changeFriendStatusSuccess(response, data.action));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export const registerVote = data => dispatch => {
    return postDataAPI
        .registerVote(data)
        .then(response => {
            dispatch(registerVoteSuccess(response));
        })
        .catch(error => {
            dispatch(apiRequestFailure(error));
        });
};

export function fetchUsersSuccess(response, id) {
    return {
        type: FETCH_USERS_SUCCESS,
        response,
        id
    };
}

export function getFriendsPollsSuccess(response) {
    return {
        type: GET_FRIENDS_POLLS_SUCCESS,
        response
    };
}

export function fetchUserDataSuccess(response) {
    return {
        type: FETCH_USER_DATA_SUCCESS,
        response
    };
}

export function changeFriendStatusSuccess(response, action) {
    return {
        type: CHANGE_FRIEND_STATUS_SUCCESS,
        response,
        action
    };
}

export function registerVoteSuccess(response) {
    return {
        type: REGISTER_VOTE_SUCCESS,
        response
    };
}

export function addNewList(data) {
    return {
        type: ADD_NEW_LIST,
        data
    };
}

export function addNewPoll(data) {
    return {
        type: ADD_NEW_POLL,
        data
    };
}

export const logOut = () => {
    return {
        type: LOGOUT
    };
};

export function apiRequestFailure(error) {
    return {
        type: API_REQUEST_FAILURE,
        error
    };
}

export function updateVotes(pollId, votes) {
    return {
        type: UPDATE_VOTES,
        pollId,
        votes
    };
}

export function updateUserDataInState(data) {
    return {
        type: UPDATE_USER_DATA,
        target: data.target,
        newData: data.newData
    };
}

export function toggleSnackbar(data) {
    return {
        type: TOGGLE_SNACKBAR,
        action: data.action,
        message: data.message
    };
}

export const resetFriendsPolls = () => {
    return {
        type: RESET_FRIENDS_POLLS
    };
};

export function toggleDrawer(target) {
    return {
        type: TOGGLE_DRAWER,
        target
    };
}
