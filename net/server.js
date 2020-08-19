const net = require('net')


const server = net.createServer((socket) =>{
    /**
     * 网络通路的
     */
    socket.on('data', function(buffer){
        console.log(buffer, buffer.toString())
        const seqBuffer = buffer.slice(0, 2);
        const lessonid = buffer.readInt32BE(2);
        
        setTimeout(() =>{
            const buffer = Buffer.concat([
                seqBuffer,
                Buffer.from(data[lessonid])
            ])
            socket.write(
                buffer
            )
        }, 500)
    })
})


server.listen(4000)



const data = {
    1: '11',
    2: '22',
    3: '33',
    4: '44',
    5: '55',
    6: '66',
    7: '77',
    8: '88',
    9: '99',
    10: '1010'
}