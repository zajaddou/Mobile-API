
import express from "express";
import { SQL } from "../functions/base.js";

const router = express.Router();

router.get("/nuser", async (req, res) => {
    try {
        await SQL("UPDATE `info` SET `users` = `users` + 1");
        return res.status(200).end();
    }
    catch (err) {
        console.log(err);
        return res.status(500).end();
    }
})

export default router;
