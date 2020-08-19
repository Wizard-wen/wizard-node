const fs = require('fs')
const http = require('http')

const leak = []
http.createServer(function(req, res){   
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'))





    // // 内存泄漏
    // setTimeout(() =>{
    //     const result = res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
    //     leak.push(result)
    //     res.end(result);
    // }, 50)

}).listen(3001, () =>{
    console.log('listened 3001')
})

while(true){}