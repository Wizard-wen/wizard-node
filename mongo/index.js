const mongoose = require('mongoose');
const { string } = require('protocol-buffers-encodings');


mongoose.connect("mongodb://127.0.0.1/db_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
const Schema = mongoose.Schema
db.on('error', (err) =>{
    console.log(err)
})


db.on('open', () =>{
    console.log('成功')
})


var kittySchema = new Schema({
    name: String,
})

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// 加在methods属性的函数会被编译到Model的prototype中，也会暴露到每个docuemnt实例
kittySchema.methods.speak = function(){
    var greeting = this.name 
        ? "Meow name is " + this.name
        : "I dont't have a name";
    console.log(greeting)
}

// model是构造document的Class 
var Kitten = mongoose.model('Kitten', kittySchema)

// felyne是一个document实例
var felyne = new Kitten({name: 'Felyne'})

felyne.save(function(err, fluffy){
    if(err) return console.error(err)
    fluffy.speak()
})

var felyne1 = new Kitten({name: 'Felyne1'})

felyne1.save(function(err, fluffy){
    if(err) return console.error(err)
    fluffy.speak()
})


Kitten.find(function(err, kittens){
    if(err) return console.error(err)
    console.log(kittens)
})










console.log(felyne.speak())






