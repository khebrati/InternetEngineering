import http from "node:http";
import fs from 'node:fs'
import path from 'node:path'

const PORT = 3083;
const UPLOAD_DIR = path.join(process.cwd(),'uploads');
if(!fs.existsSync(UPLOAD_DIR)){
    fs.mkdirSync(UPLOAD_DIR);
    console.log(`Create directory: ${UPLOAD_DIR}`)
}
const server = http.createServer((req,res) => {
    if(req.url === '/upload' && req.method === 'POST'){
        const fileName = `${Date.now()}-uploaded`;
        const filePath = path.join(UPLOAD_DIR,fileName);
        const fileWriteStream = fs.createWriteStream(filePath)

        req.pipe(fileWriteStream)
        req.on('end',() => {
            res.writeHead(201,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message: 'File uploaded successfully!',fileName: fileName}));
        });
        fileWriteStream.on('error',(err) => {
            console.error('Error writing file:',err);
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('Internal Server Error');
        })
    }else{
        res.writeHead(404,{},{'Content-Type':'text/plain'});
        res.end('Not Found');
    }
})

server.listen(PORT,() =>{
    console.log(`Server is listening on http://localhost:${PORT}`);

})
