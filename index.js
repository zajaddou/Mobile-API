import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { check_user } from "./functions/base.js"; 

import login from "./routers/login.js";
import code from "./routers/code.js";
import info from "./routers/info.js";
import nuser from "./routers/nuser.js";
import download from "./routers/download.js"

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    allowEIO3: true,
    pingTimeout: 30000,
    pingInterval: 25000,
    transports: ['websocket', 'polling']
});

app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());

app.use((req, res, next) => {
    const realIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    req.realIp = realIp;
    next();
});

const connectedDevices = new Map();

io.on("connection", (socket) => {
    let currentDeviceID = null;
    let currentName = null;
    let isRegistered = false;

    socket.emit("get_device_info");

    socket.on("device_info", (object) => {
        if (!object || isRegistered) return;

        let data = object;
        if (typeof object === 'string') {
            try {
                data = JSON.parse(object);
            } catch (e) {
                return;
            }
        }

        currentName = data.name;
        currentDeviceID = data.device_id || data.name; 

        if (connectedDevices.has(currentDeviceID)) {
            const oldSocketId = connectedDevices.get(currentDeviceID);
            if (oldSocketId !== socket.id) {
                const oldSocket = io.sockets.sockets.get(oldSocketId);
                if (oldSocket) {
                    oldSocket.disconnect(true);
                }
            }
        }

        connectedDevices.set(currentDeviceID, socket.id);
        isRegistered = true;

        io.emit("online_count", connectedDevices.size);

        console.log(`${RESET} [ ${GREEN}Socket${RESET} ] ID: ${socket.id} | Device: ${CYAN}${currentName}${RESET} | Online : ${connectedDevices.size}`);

        check_user(data, socket.id).catch(err => console.error(err));
    });

    socket.on("disconnect", () => {
        if (currentDeviceID && connectedDevices.get(currentDeviceID) === socket.id) {
            connectedDevices.delete(currentDeviceID);
            io.emit("online_count", connectedDevices.size);
            
            console.log(`${RESET} [ ${RED}Socket${RESET} ] ID: ${socket.id} | Device: ${CYAN}${currentName || "Unknown"}${RESET} | Online : ${connectedDevices.size}`);
        }
    });
});

app.use("/", login);
app.use("/", code);
app.use("/", info);
app.use("/", nuser);
app.use("/", download);

app.all("/", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`\n>> Server online <<\n`);
});