import crypto from "node:crypto";
import {promisify} from "node:util"
import {extractFileName} from "../util/requestParsers.js";
import {UPLOAD_DIR} from "../config.js";
import {getFilePath} from "../util/filesystem.js";
import {pipeline} from 'node:stream/promises'
import fs from "node:fs";
import {sendError} from "../util/error.js";
import {sendOk, sendOkRes} from "../util/okResponse.js";
import {broadcastMessage} from "../webSocket.js";

export async function handleEncryption(req, res) {
    //Encryption algorithm
    try {
        const algorithm = 'aes-256-cbc';
        const asyncRandomBytes = promisify(crypto.randomBytes)
        const key = await asyncRandomBytes(32);
        const vector = await asyncRandomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, vector);

        const fileName = extractFileName(req.url, UPLOAD_DIR + '/encrypt');
        const filePath = getFilePath(fileName, UPLOAD_DIR)
        const fileInputStream = fs.createReadStream(filePath);
        const encryptFileName = fileName + '.enc';
        const encryptFilePath = getFilePath(encryptFileName, UPLOAD_DIR);
        const encryptOutputStream = fs.createWriteStream(encryptFilePath);
        await pipeline(fileInputStream, cipher, encryptOutputStream);
        sendOkRes(res, fileName, 'file_encrypted', {
            success: true,
            key: key.toString('hex'),
            iv: vector.toString('hex')
        });
        broadcastMessage('file_encrypted',fileName);
    } catch (e) {
        sendError(res, 404, e.message);
    }
}