const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { getAllCategories, createCategories, updateCategories } = require('./controller');

router.get('/categories', isLogin, getAllCategories);
router.post('/categories', isLogin, createCategories);
router.put('/categories/:id', isLogin, updateCategories);

module.exports = router;
