const EasySock = require('easy_sock');

const protobuf = require('protocol-buffers');
const fs = require('fs');
const { buffer } = require('protocol-buffers/compile');
const schemas = protobuf(fs.readFileSync(`${__dirname}/detail-service/proto/detail.proto`))


const easySock = new EasySock({
    ip: '127.0.0.1',
    port: 4000,
    timeout: 500,
    keepAlive: true, //全双工
})

easySock.encode = function(data, seq){

    const body =  schemas.ColumnRequest.encode(data)
    const head = Buffer.alloc(8);

    head.writeInt32BE(seq)
    head.writeInt32BE(body.length, 4);

    return Buffer.concat([head, body])
}


easySock.decode = function(buffer){
    const seq = buffer.readInt32BE();

    const body = schemas.ColumnResponse.decode(buffer.slice(8))
}

easySock.isReceiveComplete = function(){
    if(buffer.length < 8){
        return 0;
    }
    const bodyLength = buffer.readInt32BE(4);

    if(buffer.length >= bodyLength + 8){
        return bodyLength + 8
    } else {
        return 0
    }
}

module.exports = easySock;