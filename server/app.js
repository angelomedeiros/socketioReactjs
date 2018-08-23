var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var io  = require('socket.io')()

app.io = io

app.io.on('connection', function(socket) {

  socket.on('disconnect', () => {
    console.log('Conexão perdida! com "/" ')
  })

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  })

})

const nsp = app.io.of('/chat')
nsp.on('connection', (socket) => {

  socket.on('join', (chatId) => {
    socket.join(chatId)
  })

  socket.on('disconnect', () => {
    console.log('Conexão perdida! com "/chat" ')
  })

  socket.on('newMessage', (chatId, message) => {    
    socket.broadcast.to(chatId).emit('addMessage', message)
  })


})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
