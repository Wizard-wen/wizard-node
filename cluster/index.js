const cluster = require('cluster')

const os = require('os');

if(cluster.isMaster){

    // 子进程数建议为cpu的一半
    // for(let i = 0; i < os.cpus().length / 2; i++)
    //     cluster.fork();

    // cluster.fork();
    // cluster.fork();
    
    // 心跳测试
    for(let i = 0; i < 1; i++){
        const worker = cluster.fork()
        let missedPing = 0;

        let inter = setInterval(() =>{
            console.log('ping')
            worker.send('ping')
            missedPing++;
            if(missedPing > 3){

                // worker.exit(1);

                clearInterval(inter);
                process.kill(worker.process.pid)
            }
        }, 3000)
        worker.on('message', (msg) =>{
            console.log('pong')
            if(msg == 'pong'){
                missedPing--;
            }
        })
    }

    // 进程意外退出，隔五秒重启
    cluster.on('exit', () =>{
        setTimeout(() =>{
            cluster.fork();
        }, 5000)
        
    })
} else {
    require('./app');


    process.on('message', (msg)=>{
        if(msg == 'ping'){
            process.send('pong');
        }
    })

    // 
    process.on('uncaughtException', (err) =>{
        console.log(err);
        process.exit(1);
    })

    // 内存泄漏预警重启
    setInterval(() =>{
        console.log(process.memoryUsage().rss)
        if(process.memoryUsage().rss > 734003200){
            console.log('oom')
            process.exit(1);
        }
    }, 5000)
}

