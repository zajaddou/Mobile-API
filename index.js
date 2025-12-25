
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import login from "./routers/login.js";
import code from "./routers/code.js";
import info from "./routers/info.js";
import nuser from "./routers/nuser.js";

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";

dotenv.config();

const app = express();

app.use(cors());

app.set('trust proxy', 1);
app.use(express.json());

app.use((req, res, next) => {
  const realIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip;
  req.realIp = realIp;
  next();
});

app.use(express.json({
  strict: true,
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      throw new SyntaxError('Invalid JSON');
    }
  }
}));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).end();
  }
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`\nRequest : ${req.realIp} \nURL: ${req.url}`);
    if (req.method === "GET")
      console.log(`Method : ${GREEN}${req.method}${RESET}`);
    if (req.method === "POST")
      console.log(`Method : ${CYAN}${req.method}${RESET}`);
    console.log(`Status: ${res.statusCode}`);
    //console.log(req.headers);
  });
  next();
});


// sensitive limiter ( 10/60s )

app.use("/", login);
app.use("/", code);
app.use("/", info);
app.use("/", nuser);

app.all("/", async (req, res) => {
    return res.send("pong");
});

app.get('/loaderio-ff6a3bf14ba999c77e4366679216297b.txt', (req, res) => {
  res.type('text/plain');
  res.send('loaderio-ff6a3bf14ba999c77e4366679216297b');
});

app.listen(process.env.PORT);

console.log("> Server online <");