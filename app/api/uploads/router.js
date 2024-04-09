const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { uploadImage } = require('./controller');
const upload = require('../../middleware/multer');

router.get('/uploads', isLogin, upload.single('image'), uploadImage);

module.exports = router;