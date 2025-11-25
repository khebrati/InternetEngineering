export function sendError(res, status = 500, error = "",message = "") {
    console.log(`error status: ${status} body: ${error}`);
    if(message){
        res.writeHead(status,{'Content-Type':'text/plain'});
        res.end(message);
    }else if(status === 404){
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end(`File not found.`);
    }else{
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.end(`Internal server error.`);
    }
}
