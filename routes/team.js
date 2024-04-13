const express= require('express');
const multer = require('multer');

const router = express.Router();

const {create_team , add_member , assign_task} = require('../controllers/team');
const upload = multer({ dest: 'uploads/' });

const logo_upload = require('../controllers/image');

router.post('/create_team',create_team);
router.post('/add_member',add_member);
router.post('/assign_task',assign_task);
router.post('/logo',upload.single('logo'),logo_upload);

module.exports = router;