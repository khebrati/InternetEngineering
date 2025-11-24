export function sendError(res, status = 500, error = "") {
    if(status === 404){
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('File not found');
    }else{
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.end(`Internal server error: ${error}`);
    }
}
