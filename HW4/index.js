import http from "node:http";
import {router} from "./router.js";
import {ensureDirExits} from "./filesystem.js";
import {PORT, UPLOAD_DIR} from "./config.js";

ensureDirExits(UPLOAD_DIR);
const server = http.createServer((req, res) => {
    router(req, res)
})

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})
