require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var nunjucks = require('nunjucks');
const fileUpload = require('express-fileupload');
const cors = require('cors');

var destinationsRouter = require('./controllers/destinations');
var apidestinationsRouter= require('./controllers/destinations.api');
var usersRouter= require('./controllers/users.api');
var app = express();

// Para aceptar origienes cruzados
app.use(cors());

app.use(fileUpload({
  createParentPath: true
}));

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});
app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/destinations', destinationsRouter);
app.use('/api/v1/destinations', apidestinationsRouter);
app.use('/api/v1/users', usersRouter);
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
