// Config untuk membaca file .env 
const dotenv = require('dotenv');

const path = require('path')

dotenv.config()
module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  jwtKey: process.env.JWT
}