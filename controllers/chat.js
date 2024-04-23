const express = require('express');
const Message = require('../model/message');
const mongoose = require('mongoose');

const send_message = async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;
        const text = req.body.text;
        const name = req.body.sender_name;

        // Create a new message and save it to the database
        const message = new Message({
            text: text,
            sender: senderId,
            receiver: receiverId,
            name:name
        });

        await message.save();
        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const receive_message = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        // Validate senderId and receiverId to be valid ObjectId format
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: 'Invalid senderId or receiverId' });
        }

        const messages = await Message.find({ sender: senderId, receiver: receiverId }).sort('createdAt').populate('sender receiver');
        
        if (!messages || messages.length === 0) {
            return res.status(404).json({ message: 'No messages found' });
        }

        // Emit each message to the receiver's WebSocket channel
        messages.forEach(message => {
            if (clients[receiverId]) {
                clients[receiverId].emit("message", message);
            }
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const messages = async (req, res) => {
    try {
        const messages = await Message.find()
            .populate('sender', 'name email')
            .populate('receiver', 'name email');

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { send_message, receive_message, messages };
