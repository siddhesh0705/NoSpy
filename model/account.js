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
        required:false
    },
    teams_id_list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team',
        required:false,
        default:[]
    }],
    friends_list_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:false,
        default:[]
    }]
})

const Account = mongoose.model('Account',account_schema);

module.exports = Account;