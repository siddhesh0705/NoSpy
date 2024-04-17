const express= require('express');
const multer = require('multer');

const router = express.Router();

const {create_team , add_member , assign_task , get_team} = require('../controllers/team');
const upload = multer({ dest: 'uploads/' });

const {upload_logo , upload_profile_pic} = require('../controllers/image');

router.post('/create_team',create_team);
router.post('/add_member',add_member);
router.post('/assign_task',assign_task);
router.post('/logo',upload.single('logo'),upload_logo);
router.post('/profile_pic',upload.single('profile_pic'),upload_profile_pic)
router.get('/get_team',get_team);

module.exports = router;