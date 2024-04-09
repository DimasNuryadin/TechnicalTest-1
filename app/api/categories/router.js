const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { getAllCategories, createCategories, updateCategories, deleteCategories } = require('./controller');

router.get('/categories', isLogin, getAllCategories);
router.post('/categories', isLogin, createCategories);
router.put('/categories/:id', isLogin, updateCategories);
router.delete('/categories/:id', isLogin, deleteCategories);

module.exports = router;
