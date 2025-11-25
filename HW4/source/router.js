import {handleUpload} from "./handlers/uploadHandler.js";
import {handleDownload} from "./handlers/downloadHandler.js";
import {handleDelete} from "./handlers/deleteHandler.js";
import {handleRename} from "./handlers/handleRename.js";
import {sendError} from "./util/error.js";
import {handleGzip} from "./handlers/handleGzip.js";
import {handleEncryption} from "./handlers/handleEncryption.js";

export async function router(req, res) {
    const url = req.url;
    if(url === '/upload' && req.method === 'POST'){
        handleUpload(req,res);
    }else if(url.startsWith('/upload/compress') && req.method === 'GET'){
        handleGzip(req,res);
    }else if(url.startsWith('/upload/encrypt') && req.method === 'GET'){
        await handleEncryption(req, res);
    }
    else if(url.startsWith('/upload') && req.method === 'DELETE'){
        await handleDelete(req,res)
    }else if(url.startsWith('/upload') && req.method === 'PUT'){
        await handleRename(req,res);
    }
    else if(url.startsWith(`/download`) && req.method === 'GET'){
        await handleDownload(req,res)
    }else{
        sendError(res,404)
    }
}