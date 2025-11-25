import {DOWNLOAD_DIR, UPLOAD_DIR} from "../config.js";

export function extractFileName(url, folderName = DOWNLOAD_DIR) {
    const fileNameRegex = RegExp("/" + folderName + "/(.*)");
    return fileNameRegex.exec(url)[1];
}
export async function parseBody(req) {
    let body = '';
    for await (const chunk of req){
        console.log(`chunk : ${chunk}`);
        body += chunk.toString()
    }
    return body
}