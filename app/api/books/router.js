const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');
const { getAllBooks } = require('./controller');

router.get('/books', isLogin, getAllBooks);
// router.post('/books', isLogin, createBooks);
// router.put('/books/:id', isLogin, updateBooks);
// router.delete('/books/:id', isLogin, deleteBooks);

module.exports = router;