const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { getTransactionList, detailTransactionList } = require('./controller');

router.get('/transactions', isLogin, getTransactionList);
router.get('/transactions/:id', isLogin, detailTransactionList);

module.exports = router;