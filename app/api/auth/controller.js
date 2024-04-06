// Import model User
const { User } = require('../../db/models');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { jwtKey } = require('../../../config');

module.exports = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } })

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);
        if (checkPassword) {
          const token = jwt.sign({
            user: {
              id: checkUser.id,
              name: checkUser.name,
              email: checkUser.email,
            }
          }, jwtKey)
          res.status(200).json({ message: 'Success sign in', data: token })
        } else {
          res.status(403).json({ message: 'Invalid password' })
        }
      } else {
        res.status(404).json({ message: "Invalid email", })
      }
    } catch (err) {
      console.log(err)
      next(err);
    }
  }
}