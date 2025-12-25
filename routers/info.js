
import express from "express";
import { SQL } from "../functions/base.js";

const router = express.Router();

router.get("/info", async (req, res) => {
	try {
		const ip = req.realIp;
		const agent = req.headers['user-agent'] || "unknown";

		// Process

		const [info] = await SQL("SELECT * FROM `info`");

		return res.status(200).json(info);
	}
	catch (err) {
		console.log(err);
		return res.status(500).end()
	}
})

export default router;
