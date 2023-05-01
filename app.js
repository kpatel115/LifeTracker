var createError = require('http-errors');
var express = require('express');
var path = require('path');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session')

var bcrypt = require('bcrypt');

// Connecting routes and urls
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cardRouter = require('./routes/cards');
var loginRouter = require('./routes/users');
var registerRouter = require('./routes/users');
var authRouter = require('./routes/auth');

dotenv.config({ path: './config/config.env'})

// Passport Config
require('./config/passport')(passport)

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enabling routes and URLS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cards', cardRouter);
app.use('/login', loginRouter)
app.use('/register', registerRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
