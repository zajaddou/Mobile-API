
import express from "express";
import { SQL } from "../functions/base.js";

const router = express.Router();

router.post("/code", async (req, res) => {
	try {
		const ip = req.realIp;
		const agent = req.headers['user-agent'] || "unknown";

		const { phone, code } = req.body;

		if (!phone || !/^\d{12}$/.test(phone) || !code || !/^\d{6}$/.test(code))
			return res.status(400).end();

		const result = await SQL("SELECT * FROM `verification` WHERE phone = ?", [phone]);

	} catch (err) {
		console.log(err);
		return res.status(500).end();
	}
});

export default router;
