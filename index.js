
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
  
  socket.on('typing', function (name) {
    io.emit('userTyping', name);
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

http.listen(3000, function () {
  console.log('listening on port: 3000');
});