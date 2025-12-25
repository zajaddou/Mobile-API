import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
// تأكد من أن ملف base.js يصدر الدالة SQL بشكل صحيح
import { check_user } from "./functions/base.js"; 

import login from "./routers/login.js";
import code from "./routers/code.js";
import info from "./routers/info.js";
import nuser from "./routers/nuser.js";

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
    pingTimeout: 60000,
    pingInterval: 25000
});

app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());

app.use((req, res, next) => {
    const realIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
    req.realIp = realIp;
    next();
});

app.use((req, res, next) => {
    res.on('finish', () => {
    });
    next();
});

let onlineUsers = 0;

io.on("connection", (socket) => {
    let name;
    let connect = false;

    socket.emit("get_device_info");

    socket.on("device_info", async (object) => {
        
        if (!object) return;

        let data = object;
        if (typeof object === 'string') {
            try {
                data = JSON.parse(object);
            } catch (e) {
                console.log("Error parsing JSON");
                return;
            }
        }

        await check_user(data, socket.id);

        name = data.name || "Unknown";

        if (connect) return;

        connect = true;

        onlineUsers++;

        console.log(`${RESET} [ ${GREEN}Socket${RESET} ] ID: ${socket.id} | Device: ${CYAN}${name}${RESET} | Online : ${onlineUsers}`);

        console.log(data);

        io.emit("online_count", onlineUsers);

    });

    socket.on("disconnect", () => {
        onlineUsers--;
        if (name) console.log(`${RESET} [ ${RED}Socket${RESET} ] ID: ${socket.id} | Device: ${CYAN}${name}${RESET} | Online : ${onlineUsers}`);
        connect = false;
        io.emit("online_count", onlineUsers);
    });
});

app.use("/", login);
app.use("/", code);
app.use("/", info);
app.use("/", nuser);

app.all("/", (req, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`\n>> Server online <<\n`);
});