import fs from 'node:fs'
import path from 'node:path'
import {DOWNLOAD_DIR} from "../config.js";

export function ensureDirExits(path) {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive : true});
        console.log(`Created directory at: ${path}`);
    }
}
export function getFullPath(dirPath){
    return path.join(process.cwd(),dirPath);
}
export function getFilePath(fileName, folderName = DOWNLOAD_DIR) {
    return getFullPath(path.join(folderName, fileName));
}
