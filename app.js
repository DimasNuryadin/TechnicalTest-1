const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import Router
const authRouter = require('./app/auth/router');
const categoriesRouter = require('./app/categories/router');

const URL = "/api/v1"

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
  res.json({
    message: 'Welcome to API toko buku pak erwin'
  })
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoriesRouter);

module.exports = app;
