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
      next(err);
    }
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(403).json({ message: "Confirm password don't match" })
      }

      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({ message: 'Email registered' });
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'admin',
      });
      delete user.dataValues.password;

      res.status(201).json({
        message: 'Success SignUp',
        data: user,
      })
    } catch (err) {
      next(err)
    }
  }
}