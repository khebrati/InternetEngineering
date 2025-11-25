import path from "node:path";
import fs from "node:fs";
import {UPLOAD_DIR} from "../config.js";
import {getFullPath} from "../util/filesystem.js";
import {sendOk} from "../util/okResponse.js";
import {sendError} from "../util/error.js";
import {randomUUID} from 'node:crypto';

export function handleUpload(req, res) {
    const uuid = randomUUID();
    const date = new Date().toISOString()
    const fileName = `${uuid}-${date}`;
    const filePath = getFullPath(path.join(UPLOAD_DIR,fileName));
    const fileWriteStream = fs.createWriteStream(filePath)
    fileWriteStream.on('error',(err) => {
        sendError(res,500,err.message);
    });
    req.pipe(fileWriteStream);
    req.on('end',() => {
        sendOk(res,fileName,'file_uploaded',{id: uuid,date:date});
    });
}