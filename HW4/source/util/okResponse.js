import {broadcastString} from "../webSocket.js";

export function sendOk(res, fileName, event, details = {}) {
    const message = new Message(event,fileName,new Date().toISOString(),details);
    const stringMessage = JSON.stringify(message);
    broadcastString(stringMessage);
    res.writeHead(201,{'Content-Type':'application/json'});
    res.end(stringMessage);
}
export function sendOkRes(res, fileName, event, details = {}) {
    const message = new Message(event,fileName,new Date().toISOString(),details);
    const stringMessage = JSON.stringify(message);
    res.writeHead(201,{'Content-Type':'application/json'});
    res.end(stringMessage);
}
export class Message {
    constructor(event,fileName,timeStamp,details) {
        this.event = event;
        this.fileName = fileName;
        this.timeStamp = timeStamp;
        this.details = details;
    }
}
