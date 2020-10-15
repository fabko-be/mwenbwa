const http = require("http");
const app = require("./index");
import socket from "./utils/socket";
const normalizePort = val => {
    const port = parseInt(val);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.APP_PORT || process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const address = server.address();

const errorHandler = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind =
        typeof address === "string" ? `pipe ${address}` : `port: ${port}`;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use.`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

server.on("listening", () => {
    const bind =
        typeof address === "string" ? `pipe ${address}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
});
server.on("error", errorHandler);

server.listen(port);

socket.listen(server);
