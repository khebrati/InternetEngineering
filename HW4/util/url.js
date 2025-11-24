import {getFullPath} from "./filesystem.js";
import path from "node:path";
import {DOWNLOAD_DIR, UPLOAD_DIR} from "../config.js";

export function extractFileName(url, folderName = DOWNLOAD_DIR) {
    const fileNameRegex = RegExp("/" + folderName + "/(.*)");
    return fileNameRegex.exec(url)[1];
}
export function extractFilePath(fileName,folderName = DOWNLOAD_DIR) {
    return getFullPath(path.join(folderName, fileName));
}
