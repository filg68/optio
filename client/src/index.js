import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import {
    userReducer,
    usersReducer,
    pollsReducer,
    snackbarReducer,
    friendsDrawerReducer
} from "./reducers";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// monitor app with the Logger Middleware:
// const logger = createLogger();

// use middleware between action and reducer:
const appReducer = combineReducers({
    userReducer,
    usersReducer,
    pollsReducer,
    snackbarReducer,
    friendsDrawerReducer
});

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");

    // monitor app with the Logger Middleware:
    middlewares.push(logger);
}

const store = createStore(appReducer, applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
