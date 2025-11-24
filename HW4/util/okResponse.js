export function sendOk(res,fileName,message = 'Operation completed successfully!') {
    res.writeHead(201,{'Content-Type':'application/json'});
    res.end(JSON.stringify({message: message,fileName: fileName}));
}