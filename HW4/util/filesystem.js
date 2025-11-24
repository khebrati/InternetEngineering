import fs from 'node:fs'
import path from 'node:path'

export function ensureDirExits(path) {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive : true});
        console.log(`Created directory at: ${path}`);
    }
}
export function getFullPath(dirPath){
    return path.join(process.cwd(),dirPath);
}