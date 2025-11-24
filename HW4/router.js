import {handleUpload} from "./uploadHandler.js";
import {handleDownload} from "./downloadHandler.js";

export function router(req, res) {
    if(req.url === '/upload' && req.method === 'POST'){
        handleUpload(req,res);
    }else if(req.url.startsWith(`/download`) && req.method === 'GET'){
        handleDownload(req,res)
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not Found');
    }
}