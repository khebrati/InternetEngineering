import http from "node:http";
import {router} from "./router.js";
import {ensureDirExits} from "./util/filesystem.js";
import {DOWNLOAD_DIR, PORT, UPLOAD_DIR} from "./config.js";
import {createWebSocketServer} from "./webSocket.js";

ensureDirExits(UPLOAD_DIR);
ensureDirExits(DOWNLOAD_DIR);
export const server = http.createServer(async (req, res) => {
    await router(req, res)
})
createWebSocketServer(server);

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
