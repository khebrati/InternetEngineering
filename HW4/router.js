import {handleUpload} from "./uploadHandler.js";

export function router(req, res) {
    if(req.url === '/upload' && req.method === 'POST'){
        handleUpload(req,res);
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not Found');
    }
}