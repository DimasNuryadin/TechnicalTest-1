const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { checkout } = require('./controller');

router.post('/checkouts', isLogin, checkout);

module.exports = router;