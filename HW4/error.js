export function handleError(res, error = "") {
    res.writeHead(500,{'Content-Type':'text/plain'});
    res.end(`Internal server error: ${error}`);
}