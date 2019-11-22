import io from "socket.io-client";
import { DEVELOPMENT_SERVER_PORT, PRODUCTION_URL } from "../constants";
let socket;

// set websocket server port to appropriate value depending on environment
let port, host, protocol;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    port = process.env.PORT || DEVELOPMENT_SERVER_PORT;
    host = "localhost";
    protocol = "ws";
} else {
    port = window.location.port;
    host = PRODUCTION_URL;
    protocol = "wss";
}

const setSocketConnection = token => {
    socket = io(`${protocol}://${host}:${port}`, {
        transports: ["websocket"],
        query: {
            token: token
        }
    });
};

export { setSocketConnection, socket };
