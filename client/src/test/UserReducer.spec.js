import {
    FETCH_USER_DATA_SUCCESS,
    LOGOUT,
    USER_DATA_LOADING,
    API_REQUEST_FAILURE,
    UPDATE_USER_DATA
} from "../constants.js";

import { userReducer } from "../reducers";

describe("Load user data", () => {
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

    it("should return initial user state", () => {
        expect(userReducer(undefined, {})).toEqual(userInitialState);
    });

    it("should handle USER_DATA_LOADING action", () => {
        expect(
            userReducer(userInitialState, {
                type: USER_DATA_LOADING
            })
        ).toEqual({
            _id: "",
            name: "",
            email: "",
            avatar: "",
            lists: [],
            polls: [],
            friends: [],
            error: "",
            isLoading: true,
            online: false
        });
    });

    it("should handle FETCH_USER_DATA_SUCCESS action", () => {
        const response = {
            data: {
                _id: "5dced278445d9e3b260c62f1",
                name: "Name Surname",
                email: "name.surname@example.com",
                avatar: "https://randomuser.me/api/portraits/thumb/men/87.jpg",
                lists: [],
                polls: [],
                friends: [],
                online: false
            },
            status: 200
        };

        expect(
            userReducer(userInitialState, {
                type: FETCH_USER_DATA_SUCCESS,
                response
            })
        ).toEqual({
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            polls: response.data.polls,
            lists: response.data.lists,
            avatar: response.data.avatar,
            friends: response.data.friends,
            online: response.data.online,
            error: "",
            isLoading: false
        });
    });

    it("should handle API_REQUEST_FAILURE action", () => {
        expect(
            userReducer(userInitialState, {
                type: API_REQUEST_FAILURE,
                error: "Something went wrong. Please try again later"
            })
        ).toEqual({
            _id: "",
            name: "",
            email: "",
            avatar: "",
            lists: [],
            polls: [],
            friends: [],
            error: "Something went wrong. Please try again later",
            isLoading: false,
            online: false
        });
    });
    // return Object.assign({}, state, { error: action.error });
    it("should handle LOGOUT action", () => {
        expect(
            userReducer(userInitialState, {
                type: LOGOUT
            })
        ).toEqual(userInitialState);
    });

    it("should handle UPDATE_USER_DATA action", () => {
        expect(
            userReducer(userInitialState, {
                type: UPDATE_USER_DATA,
                target: "name",
                newData: "Testname Testsurname"
            })
        ).toEqual({
            _id: "",
            name: "Testname Testsurname",
            email: "",
            avatar: "",
            lists: [],
            polls: [],
            friends: [],
            error: "",
            isLoading: false,
            online: false
        });
    });
});
