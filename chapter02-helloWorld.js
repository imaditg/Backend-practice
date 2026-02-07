const http = require('http');

const port = process.env.PORT || 3000

const server = http.createServer((req,res) =>{
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end('<p style="color:brown">hello world</p>')
})

server.listen(port,()=> console.log(`server started on port ${port} ` + `press Ctrl-C to terminate...`))