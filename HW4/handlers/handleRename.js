import {extractFileName, getFilePath} from "../util/url.js";
import {UPLOAD_DIR} from "../config.js";
import fs from 'node:fs/promises'
import {sendError} from "../util/error.js";

export async function handleRename(req,res) {
    try{
        const oldFileName = extractFileName(req.url,UPLOAD_DIR);
        const oldFilePath = getFilePath(oldFileName,UPLOAD_DIR);
        const body =  JSON.parse(req.body);
        const newFileName = body.newName;
        const newFilePath = getFilePath(newFileName);
        await fs.rename(oldFilePath,newFilePath)
    }catch (e) {
        sendError(res,404);
    }
}