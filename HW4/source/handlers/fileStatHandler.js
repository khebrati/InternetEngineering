import {getFilePath, getFullPath} from "../util/filesystem.js";
import fs from "node:fs/promises";
import {UPLOAD_DIR} from "../config.js";
import {sendOk} from "../util/okResponse.js";
import {sendError} from "../util/error.js";

export async function handleFileState(req, res) {
    const fileId = RegExp("/upload/(\\w+)").exec(req.url)[1];
    const files = await fs.readdir(getFullPath(UPLOAD_DIR));
    for(let file of files){
        const regexArray = RegExp('(\\w+)-(.*)').exec(file)
        if(!regexArray){
            continue;
        }
        try{
            const uuid = regexArray[1]
            if(uuid !== fileId){
                continue;
            }
            const uploadDate = regexArray[2]
            //TODO add size
            sendOk(res,file,'file_stat_read',{uploadDate: uploadDate});
            return;
        }catch (e){}
    }
    sendError(res,404,'File with given Id does not exist.');
}