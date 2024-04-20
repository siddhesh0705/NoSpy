const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    task_assigned_to:{
        type:String,
        ref:'user',
        required:true
    },
    team_id:{
        type:String,
        ref:'Team',
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    task_status:{
        type:Boolean,
        required:true
    }
})

const Task = mongoose.model('Task',task_schema);

module.exports = Task;