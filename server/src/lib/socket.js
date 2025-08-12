import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const server = http.createServer(app);
const CLIENT_URL = process.env.CLIENT_URL;
const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// used to stoe online users
const userSocketMap = {} // {userId: socketId}


io.on("connection", (socket) => {
    console.log("A  user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // send online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export { io, app, server };