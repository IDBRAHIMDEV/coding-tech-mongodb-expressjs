var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {handlerError} = require('./middleware/handler-error');

require('dotenv').config()

const authJwt = require('./middleware/auth-jwt')

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authJwt())
app.use(express.static(path.join(__dirname, 'public')));

const version = process.env.VERSION

app.use(`${version}/products`, productsRouter);
app.use(`${version}/orders`, ordersRouter);
app.use(`${version}/categories`, categoriesRouter);
app.use(`${version}/users`, usersRouter);


app.use(handlerError)

module.exports = app;
