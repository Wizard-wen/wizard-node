const { Http2ServerRequest } = require("http2");



var leakArray = [];


var leak = function(){
    leakArray.push("leak" + Math.random())
}



Http.createServer(function(req, res){
    leak();
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World\n')
}).listen(1337)

console.log('Server running at http://127.0.0.1:1337/')