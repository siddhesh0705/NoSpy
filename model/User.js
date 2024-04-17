const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide this field'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true,'please provide this field'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'please provide this field'],
        minlength:6,
    },
    team_id_list:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:false,
        default:[]
    },
    friend_list_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:false,
        default:[]
    },
    profile_pic_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Image",
        required:false,
    }
})

userschema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
    
})

userschema.methods.getName = function (){
    return this.name
}
userschema.methods.createJWT = function (){
    return JWT.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
userschema.methods.comparepassword = async function(candidatepassword){
    const ismatch = await bcrypt.compare(candidatepassword,this.password);
    return ismatch
}
module.exports = mongoose.model('user', userschema);