const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { checkout } = require('./controller');

router.post('/checkouts', isLogin, checkout);
// router.post('/checkouts', isLogin, createCheckout);
// router.put('/checkouts/:id', isLogin, updateCheckout);
// router.delete('/checkouts/:id', isLogin, deleteCheckout);

module.exports = router;