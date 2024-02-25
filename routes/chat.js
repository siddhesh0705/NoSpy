const express = require('express');
const router = express.Router();
const message = require('../model/message');


const { send_message , receive_message , messages} = require('../controllers/chat');

router.post('/send',send_message);
router.post('/receive/:senderId/:receiverId' , receive_message);
router.get('/messages',messages);

module.exports = router


// router.post('/send',async(req,res)=>{
//     try {
//         const {text,sender,receiver} = req.body;

//         const message = new Message({text , sender , receiver});

//         await message.save();
//         res.status(201).send(message).json({message:'message sent successfully'});
//     } catch (error) {
//         res.status(401).send(error);
//     }
// })

// router.get('/:sender/:receiver', async (req, res) => {
//     try {
//         const { sender, receiver } = req.params;
//         const messages = await Message.find({ sender, receiver }).sort('createdAt');
//         res.status(200).send(messages);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });
// app.get('/api/v1/chat/messages', async (req, res) => {
//     try {
//         // Retrieve messages from the database and populate sender and receiver details
//         const messages = await Message.find()
//             .populate('sender', 'name email') // Populate sender details
//             .populate('receiver', 'name email'); // Populate receiver details

//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error retrieving messages:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// module.exports = router;


