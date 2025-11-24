import {extractFileName, getFilePath} from "../util/url.js";
import fs from 'node:fs/promises'
import {sendError} from "../util/error.js";
import {sendOk} from "../util/okResponse.js";
import {UPLOAD_DIR} from "../config.js";

export async function handleDelete(req, res) {
    try{
        const fileName  = extractFileName(req.url,UPLOAD_DIR);
        const filePath = getFilePath(fileName,UPLOAD_DIR);
        await fs.unlink(filePath);
        sendOk(res,fileName);
    }catch (e){
        sendError(res,404);
    }
}