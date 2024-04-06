const express = require('express');
const router = express.Router();
const { isLogin } = require('../../middleware/auth');

router.get('/categories', isLogin, function (req, res) {
  res.status(200).json({ message: "Router auth" })
});

module.exports = router;
