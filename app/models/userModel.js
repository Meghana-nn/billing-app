const mongoose=require('mongoose')
const {Schema,model}=mongoose

const userSchema=new Schema({
    name:String,
    pssword:String,
    email:String,

},{timeStamps:true})

const User=model('User',userSchema)

module.exports=User
