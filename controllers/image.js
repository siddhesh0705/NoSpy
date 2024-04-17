const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const Image = require('../model/image'); 
const Team = require('../model/team');

const upload_logo = async (req, res) => {
    
    try {
      
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
       
        const newImage = new Image({
            filename: req.file.originalname, 
            filepath: req.file.path 
        });

       
        const savedImage = await newImage.save();

       
        res.status(200).json({ success: true, message: 'Logo uploaded successfully', logo_id: savedImage._id });
    } catch (error) {
        console.error('Error uploading logo:', error);
        res.status(500).json({ success: false, message: 'Failed to upload logo', error: error.message });
    }
};
const upload_profile_pic = async (req, res) => {
    const user_id = req.body;
    try {
      
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
       
        const newImage = new Image({
            filename: req.file.originalname, 
            filepath: req.file.path 
        });

       
        const savedImage = await newImage.save();
        const user_name = await user.findById(user_id);
        user_name.profile_pic_id  =  newImage._id;
       
        res.status(200).json({ success: true, message: 'Logo uploaded successfully', logo_id: savedImage._id });
    } catch (error) {
        console.error('Error uploading logo:', error);
        res.status(500).json({ success: false, message: 'Failed to upload profile', error: error.message });
    }
};

module.exports = {upload_logo , upload_profile_pic};
