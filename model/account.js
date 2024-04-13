const mongoose = require('mongoose');
const {Image} = require('./image');

const account_schema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    username:{
        type:String,
        required:true
    },
    profile_pic_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image',
        required:true
    },
    teams_id_list:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team',
        required:true
    },
    friends_list_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const Account = mongoose.model('Account',account_schema);

module.exports = Account;