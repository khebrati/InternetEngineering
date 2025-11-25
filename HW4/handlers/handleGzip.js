import {extractFileName} from "../util/requestParsers.js";
import {DOWNLOAD_DIR, UPLOAD_DIR} from "../config.js";
import {getFilePath} from "../util/filesystem.js";
import zlib from "node:zlib";
import {sendError} from "../util/error.js";
import {sendOk} from "../util/okResponse.js";
import fs from "node:fs";

export function handleGzip(req, res) {
    try{
        const fileName = extractFileName(req.url,UPLOAD_DIR + '/compress');
        const filePath = getFilePath(fileName,UPLOAD_DIR);
        const zipFileName = `${fileName}.gz`
        const zipFilePath = getFilePath(zipFileName,UPLOAD_DIR);
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(zipFilePath);
        const gzip = zlib.createGzip()
        readStream.pipe(gzip).pipe(writeStream).on('error',(err) => {
            sendError(res,404,err.message);
        }).on('finish',() => {
            sendOk(res,zipFileName);
        })
    }catch (e){
        sendError(res,404,e);
    }
}