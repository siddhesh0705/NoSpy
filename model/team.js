const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members_id_list: [{
        type: String,
        ref: 'User', 
        required: true
    }],
    logo_id: {
        type:String,
        ref: 'Image',
        required: true
    },
    leader_id: {
        type:String,
        ref: 'User',
        required: true
    },
    task_id_list: [{
        type:String,
        ref: 'Task', 
        required: true,
        default:[]
    }]
});

module.exports = mongoose.model('Team', teamSchema);
