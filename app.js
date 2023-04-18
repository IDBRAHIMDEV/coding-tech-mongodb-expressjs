var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {handlerError} = require('./middleware/handler-error');

require('dotenv').config()

const authJwt = require('./middleware/auth-jwt')

var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authJwt())
app.use(express.static(path.join(__dirname, 'public')));


app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

app.use(handlerError)

module.exports = app;
