const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members_id_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }],
    logo_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
    leader_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task_id_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', 
        required: true,
        default:[]
    }]
});

module.exports = mongoose.model('Team', teamSchema);
