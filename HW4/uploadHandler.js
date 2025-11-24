import path from "node:path";
import fs from "node:fs";
import {UPLOAD_DIR} from "./config.js";
import {getFullPath} from "./filesystem.js";
export function handleUpload(req, res) {
    const fileName = `${Date.now()}-uploaded`;
    const filePath = getFullPath(path.join(UPLOAD_DIR,fileName));
    const fileWriteStream = fs.createWriteStream(filePath)

    req.pipe(fileWriteStream)
    req.on('end',() => {
        res.writeHead(201,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message: 'File uploaded successfully!',fileName: fileName}));
    });
    fileWriteStream.on('error',(err) => {
        console.error('Error writing file:',err);
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.end('Internal Server Error');
    })
}