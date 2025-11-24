import {extractFileName, parseBody} from "../util/requestParsers.js";
import {UPLOAD_DIR} from "../config.js";
import fs from 'node:fs/promises'
import {sendError} from "../util/error.js";
import {getFilePath} from "../util/filesystem.js";
import {sendOk} from "../util/okResponse.js";

export async function handleRename(req,res) {
    try{
        const oldFileName = extractFileName(req.url,UPLOAD_DIR);
        const oldFilePath = getFilePath(oldFileName,UPLOAD_DIR);
        const body =  JSON.parse(await parseBody(req));
        const newFileName = body.newName;
        const newFilePath = getFilePath(newFileName,UPLOAD_DIR);
        await fs.rename(oldFilePath,newFilePath)
        sendOk(res,newFileName,`File renamed from ${oldFileName} to ${newFileName}`);
    }catch (e) {
        sendError(res,404,e.message);
    }
}