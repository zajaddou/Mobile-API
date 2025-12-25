
import express from "express";
import { SQL } from "../functions/base.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const ip = req.realIp;
		const agent = req.headers['user-agent'] || "unknown";

		const { phone } = req.body;

		const [vdb] = await SQL("SELECT * FROM \`verification\` where phone = ?", [phone]);
		if (vdb)
			return res.status(409).end();

		// Process

		const [user] = await SQL("SELECT * FROM `customers` WHERE phone = ?", [phone]);

		return res.status(200).end();
	}
	catch (err) {
		await logs('error', '/login', err.message);
		console.log(err);
		return res.status(500).end()
	}
})

export default router;
