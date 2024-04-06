const jwt = require('jsonwebtoken');
const { jwtKey } = require('../../config');

module.exports = {
  isLogin: (req, res, next) => {
    try {
      const data = jwt.verify(req.headers.token, jwtKey)
      if (data) {
        req.user = data.user;
        next();
      }
    } catch (err) {
      res.status(401).json({
        message: 'Invalid Token',
      })
    }
  }
}