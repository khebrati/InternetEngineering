import {WebSocketServer} from "ws";
import {Message} from "./util/okResponse.js";
let wssInstance = null;
export function createWebSocketServer(server) {
    const wss = new WebSocketServer({server})
    wss.on('connection',(ws,req) => {
        console.log("Web socket connection initialized");
        ws.send(JSON.stringify({message: "connection_initialized"}));
        ws.on('error',(err) => {
            console.error("WebSocket error",err)
        });
        ws.on('close',() => {
            console.log("client disconnected");
        })
        ws.on('message',(data) => {
            console.log("Received:",data.toString());
            wss.clients.forEach((client) => {
                client.send(data);
            })
        });
    });
    wssInstance = wss;
    return wss;
}
export function broadcastMessage(event, fileName, details) {
    const message = new Message(event,fileName,new Date().toISOString(),details);
    const stringMessage = JSON.stringify(message);
    broadcastString(stringMessage);
}
export function broadcastString(message) {
    if(!wssInstance) return;
    wssInstance.clients.forEach((client) => {
        client.send(message);
    });
}
