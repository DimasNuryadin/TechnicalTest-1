const express = require('express');
const { signIn, signUp } = require('./controller');
const router = express.Router();

router.post('/auth/signin', signIn);
router.post('/auth/signUp', signUp);

module.exports = router;
