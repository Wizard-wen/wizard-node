
const vm = require('vm')

const ejs = require('ejs')


const user = {
    name: '<script/>'
}


const result = `<h2>${user.name}</h2>`

const context = {
    user,
    /**
     * xss过滤函数
     * @param {*} markup 
     */
    _: function(markup){
        if(!markup) return '';
        return String(markup)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    helper: function(){},
    include: function(name){
        return templateMap[name]()
    }   
}

const templateMap = {
    templateA: '`<h2>${include("templateB")}</h2>`',

    templateB: '`<p>hhhhh</p>`'
}


Object.keys(templateMap).forEach(item =>{
    const temp = templateMap[item]
    
    templateMap[item] = vm.runInNewContext(`
        (function(){
            return ${temp}
        })
    `, context)
})




console.log(vm.runInNewContext('`<h2>${_(user.name)}</h2>`', context))


console.log(templateMap['templateA']())
// const template = '<h2><%= user.name %></h2>'

// ejs.render(template, user)