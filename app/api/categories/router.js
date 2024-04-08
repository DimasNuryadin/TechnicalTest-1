const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { getAllCategories, createCategories } = require('./controller');

router.get('/categories', isLogin, getAllCategories);
router.post('/categories', isLogin, createCategories);

module.exports = router;
