const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender_name:{
        type:String,
        required:true,
    },
    senderId: {
        type: String,
        ref: 'user',
        required: true
    },
    receiverId: {
        type: String,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', messageSchema);
