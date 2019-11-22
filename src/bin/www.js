#!/usr/bin/env node

/* Sets up the environment variables from your .env file*/
require("dotenv").config();
const secret = require("../config/config").app.secretOrKey;
import jwt from "jsonwebtoken";

import {
    registerVote,
    parallelSumOfCounts
} from "../routes/utils/voteModelUpdates";
import { getVotes } from "../routes/utils/getVotes";
import {
    setUserOnline,
    setUserOffline
} from "../routes/utils/userModelUpdates";
import { getFriends } from "../routes/utils/getFriends";

/**
 * Module dependencies.
 */

let app = require("../app");
let http = require("http");

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "3001");
//process.env.PORT = 3010;
//console.log(`process.env.PORT is now ${process.env.PORT}`);
app.set("port", port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

// Set up a new Socket.io server instance:
const io = require("socket.io")(server);

/**
 * Listen on provided port, on all network interfaces.
 */

// middleware
io.use((socket, next) => {
    let token = socket.handshake.query.token;

    try {
        const decoded = jwt.verify(token, secret);

        setUserOnline(decoded.id).then(data => {
            console.log("User is online");

            // broadcast.emit() will send event to all users except the sender:
            socket.broadcast.emit("user_joined");

            // call next() to let the user connect to our socket
            return next();
        });
    } catch (error) {
        console.log("Authentication error: ", error);
        return next(new Error("Authentication error"));
    }
});

// The connection event is fired whenever a new client connects
// It passes a socket instance to its callback
// This socket will receive any events that the client emits from the browser:
io.on("connection", socket => {
    console.log("Connection is established for socket id ", socket.id);

    // When  socket gets established, listen for any “event” message.
    // Get initial friends array for specific user:
    socket.on("initial_friends", userId => {
        getFriends(userId).then(result => {
            io.sockets.emit("friends_changed", result);
        });
    });

    // Get initial voting results for specific poll:
    socket.on("initial_results", pollId => {
        getVotes(pollId).then(result => {
            io.sockets.emit("update_results", result);
        });
    });

    // Get initial vote count for this specific poll:
    socket.on("initial_votes", pollId => {
        parallelSumOfCounts(pollId).then(result => {
            io.sockets.emit("update_votes", { pollId, result });
        });
    });

    socket.on("register_vote", data => {
        registerVote(data.pollId, data.userId, data.option).then(result => {
            // Let front-end know that results and vote count were changed:
            io.sockets.emit("results_changed");
            io.sockets.emit("votes_changed", {
                pollId: result.pollId,
                newCounts: result.newCounts
            });
        });
    });

    socket.on("user_logged_out", userId => {
        setUserOffline(userId).then(data => {
            socket.broadcast.emit("user_left");
            socket.disconnect(true); // close connection for current user
        });
    });

    socket.on("disconnect", function() {
        console.log("User disconnected");
    });
});

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

    console.log("Listening on " + bind);
}
