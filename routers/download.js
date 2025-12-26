// File: routers/download.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/download-app', (req, res) => {
    const filePath = path.join(__dirname, '../app', 'app-release.apk');
    
    res.download(filePath, 'NetworkApp.apk', (err) => {
        if (err) {
            console.error("Download Error:", err.message);
            if (!res.headersSent)
                res.status(404).send("File not found.");
        }
    });
});

export default router;