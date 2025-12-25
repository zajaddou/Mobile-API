
import pool from "./db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";

export function SQL(query, params = []) {
	return new Promise((resolve, reject) => {
		pool.query(query, params, (err, results) => {
			err ? reject(err) : resolve(results);
		});
	});
}

export function NewToken(payload) {
	return jwt.sign(payload, jwtSecret);
}

export async function VerifyUser(token) {
	try {
		if (!token) return (null);
		const decoded = jwt.verify(token, jwtSecret);
		const { phone } = decoded;

		if (!phone || !/^\d{12}$/.test(phone))
			return (null);

		const [data] = await SQL("SELECT * FROM `customers` WHERE BINARY phone = ? AND banned = 0", [phone]);
		return (data || null);
	} catch {
		return (null);
	}
}

export function createMD5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

export async function check_user(data, id) {
    if (!data) return;

    try {
        const rawString = data.name + data.device_id + data.cpu_arch + data.cpu_cores;
        const deviceHash = createMD5(rawString);

        const [user] = await SQL("SELECT * FROM devices WHERE device = ?", [data.device_id]);
        
        if (!user) {
            await SQL(
                "INSERT INTO `devices` (`name`, `device`, `ram_size`, `cpu_arch`, `cpu_cores`, `hash`) VALUES (?, ?, ?, ?, ?, ?)", 
                [data.name, data.device_id, data.ram_total, data.cpu_arch, data.cpu_cores, deviceHash]
            );
            console.log(`${RESET} [ ${CYAN}Join ${RESET}  ] ID: ${id} | Device: ${CYAN}${data.name}${RESET}`);
        }
		return (user);
    } catch (error) {
        console.error(`${RED}[Database Error]${RESET}`, error.message);
		return (null);
    }
}
