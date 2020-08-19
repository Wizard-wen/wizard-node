const program = require('commander')



program 
    .command('clone <source> [destination]')
    .description('正在操作...')
    .action((source, destination) =>{
        console.log(`必选项为${source},非必选项为${destination}`)
    })