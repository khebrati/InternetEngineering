
import crypto from "node:crypto";
import {promisify} from "node:util"
import {extractFileName} from "../util/requestParsers.js";
import {UPLOAD_DIR} from "../config.js";
import {getFilePath} from "../util/filesystem.js";
import {pipeline} from 'node:stream/promises'
import fs from "node:fs";
import {sendError} from "../util/error.js";

export async function handleEncryption(req, res) {
    //Encryption algorithm
    try{
        const algorithm = 'aes-256-cbc';
        const asyncRandomBytes = promisify(crypto.randomBytes)
        const key = await asyncRandomBytes(32);
        const vector = await asyncRandomBytes(16);
        const cipher = crypto.createCipheriv(algorithm,key,vector);

        const fileName = extractFileName(req.url,UPLOAD_DIR + '/encryption');
        const filePath = getFilePath(fileName,UPLOAD_DIR)
        const fileInputStream = fs.createReadStream(filePath);
        const encryptFileName = fileName + '.enc';
        const encryptFilePath = getFilePath(encryptFileName,UPLOAD_DIR);
        const encryptOutputStream = fs.createWriteStream(encryptFilePath);
        await pipeline(fileInputStream,cipher,encryptOutputStream);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(({
            success: true,
            key: key.toString('hex'),
            iv: vector.toString('hex')
        })));
    }catch (e){
        sendError(res,404,e.message);
    }
}