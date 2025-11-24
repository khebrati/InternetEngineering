import {getFullPath} from "./filesystem.js";
import path from "node:path";
import {DOWNLOAD_DIR} from "./config.js";
import fs from "node:fs";
import {handleError} from "./error.js";
const mimeTypes ={
    '.txt' : 'text/plain',
    '.pdf' : 'application/pdf',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg',
    '.zip' : 'application/zip'
}
export function handleDownload(req, res) {
    try {
        const fileNameRegex = RegExp("/download/(.*)");
        const fileName = fileNameRegex.exec(req.url)[1];
        const filePath = getFullPath(path.join(DOWNLOAD_DIR,fileName));
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res)
        const ext = path.extname(fileName)
        const contentType = mimeTypes[ext] || 'octet-stream'
        readStream.on('end',() => {
            res.writeHead(200,{'Content-Type':contentType});
        });
        readStream.on('error',() => {
            handleError(res)
        });
    }catch (e) {
        handleError(res,e)
    }
}

