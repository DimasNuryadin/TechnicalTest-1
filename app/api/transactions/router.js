const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { getTransactionList } = require('./controller');

router.get('/transactions', isLogin, getTransactionList);

module.exports = router;