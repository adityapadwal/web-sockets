// importing modules
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

// creating instance of express app
const app = express();

// defining port number
const port: number = 3000;

// creating http server
const server = http.createServer(app);

// creating ws server
const wss = new WebSocketServer({ server });

// handling ws connections
wss.on("connection", async (ws, req) => {
    // logging connection status
    console.log("Web Sockets connection established! ");

    // receiving msgs from clients
    ws.on("message", (message) => {
        const parsedMessage = message.toString();
        console.log("Server: Recerived msg from client ", parsedMessage);
        // sending this msg back to the client
        ws.send(`Hello client, you sent -> ${message}`);
    });
});

// standard routes handled by express app
app.get("/health", (req, res) => {
    res.json({msg: "I am healthy"})
})

// listening the app on port 3000
server.listen(port);