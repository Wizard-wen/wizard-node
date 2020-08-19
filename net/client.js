const net = require('net');

const socket = new net.Socket({})


socket.connect({
    host: '127.0.0.1',
    port: 4000,
})



// socket.write('good morning geekbang');


const lessonids = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
]

let id = Math.floor(Math.random() * lessonids.length);




socket.on('data', (buffer) => {

    const seqBuffer = buffer.slice(0, 2);
    const titleBuffer = buffer.slice(2);
    
    console.log(seqBuffer.readInt16BE(), titleBuffer.toString());

    id = Math.floor(Math.random() * lessonids.length)

    socket.write(encode(id))
})

let seq = 0;

function encode (index){
    buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq++)
    buffer.writeInt32BE(    
        lessonids[index], 2
    )
    return buffer
}

socket.write(encode(id));