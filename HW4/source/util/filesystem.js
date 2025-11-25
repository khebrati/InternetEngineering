import fs from 'node:fs'
import path from 'node:path'
import {DOWNLOAD_DIR} from "../config.js";

export function ensureDirExits(dirPath) {
    if(!fs.existsSync(path.join('..',dirPath))){
        fs.mkdirSync(path.join('..',dirPath),{recursive : true});
        console.log(`Created directory at: ${dirPath}`);
    }
}
export function getFullPath(dirPath){
    return path.join(process.cwd() ,'..',dirPath);
}
export function getFilePath(fileName, folderName = DOWNLOAD_DIR) {
    return getFullPath(path.join(folderName, fileName));
}
