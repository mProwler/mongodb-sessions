var config = require('./config')
var express = require('express')
var mongoose = require('mongoose');

var app = express(),
    userRouter = require('./users/router');

mongoose.connect(config.mongodbUrl);

app.use(userRouter);

app.set('view engine', 'ejs')
app.set('views', __dirname)

app.get('/', function (req, res) {
  res.render('index', {user: req.user})
})

module.exports = app
