import {getFullPath} from "./filesystem.js";
import path from "node:path";
import {DOWNLOAD_DIR} from "./config.js";
import fs from "node:fs";
import fsProm from "node:fs/promises";
import {handleError} from "./error.js";

const mimeTypes = {
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.zip': 'application/zip'
}

export async function handleDownload(req, res) {
    try {
        const fileNameRegex = RegExp("/download/(.*)");
        const fileName = fileNameRegex.exec(req.url)[1];
        const ext = path.extname(fileName)
        const contentType = mimeTypes[ext] || 'octet-stream'
        const filePath = getFullPath(path.join(DOWNLOAD_DIR, fileName));
        const range = req.headers.range
        if (range) {
            const parts = range.replace("bytes=", "").split("-")
            const start = parseInt(parts[0], 10);
            const stat = await fsProm.stat(filePath);
            const fileSize = stat.size;
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': contentType
            });
            const readStream = fs.createReadStream(filePath, {start, end});
            readStream.on('error', () => {
                handleError(res)
            });
            readStream.pipe(res);
        } else {
            res.writeHead(200, {'Accept-Ranges': 'bytes', 'Content-Type': contentType});
            const readStream = fs.createReadStream(filePath);
            readStream.on('error', () => {
                handleError(res)
            });
            readStream.pipe(res)
        }
    } catch (e) {
        handleError(res, e)
    }
}

