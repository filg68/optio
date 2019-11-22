import {
    USER_DATA_LOADING,
    FETCH_USER_DATA_SUCCESS,
    API_REQUEST_FAILURE,
    ADD_NEW_LIST
} from "../constants";
import * as actions from "../actions";

// import configure Store to create a mock store where to dispatch actions
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// mock axios call
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];

// initialize mockStore
const mockStore = configureStore(middlewares);

// create a new mock instance of the MockAdapter:
const mock = new MockAdapter(axios);

const store = mockStore({});

describe("Testing loadUserData action", () => {
    beforeEach(() => {
        // runs before each test:
        store.clearActions();
    });

    it("should dispatch USER_DATA_LOADING action", () => {
        const id = "123";

        store.dispatch(actions.loadUserData(id));
        const action = store.getActions();

        const expectedAction = {
            type: USER_DATA_LOADING
        };

        expect(action[0]).toEqual(expectedAction);
    });

    it("should create an action fetchUserDataSuccess", () => {
        const response = "test";
        const expectedAction = {
            type: FETCH_USER_DATA_SUCCESS,
            response
        };
        expect(actions.fetchUserDataSuccess(response)).toEqual(expectedAction);
    });

    it("should create an action apiRequestFailure", () => {
        const error = "Some error";
        const expectedAction = {
            type: API_REQUEST_FAILURE,
            error
        };
        expect(actions.apiRequestFailure(error)).toEqual(expectedAction);
    });
});

describe("Testing addNewList action", () => {
    beforeEach(() => {
        // runs before each test:
        store.clearActions();
    });

    it("should dispatch addNewList action", () => {
        const data = {
            id: "1234",
            title: "New list",
            friends: ["123", "456", "789"]
        };

        store.dispatch(actions.addNewList(data));
        const action = store.getActions();

        const expectedAction = {
            type: ADD_NEW_LIST,
            data
        };

        expect(action[0]).toEqual(expectedAction);
    });
});
