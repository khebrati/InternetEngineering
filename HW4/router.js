import {handleUpload} from "./handlers/uploadHandler.js";
import {handleDownload} from "./handlers/downloadHandler.js";
import {handleDelete} from "./handlers/deleteHandler.js";

export async function router(req, res) {
    const url = req.url;
    if(url === '/upload' && req.method === 'POST'){
        handleUpload(req,res);
    }else if(url.startsWith('/upload') && req.method === 'DELETE'){
        await handleDelete(req,res)
    }
    else if(url.startsWith(`/download`) && req.method === 'GET'){
        await handleDownload(req,res)
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not Found');
    }
}