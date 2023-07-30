// create web server
var express = require('express');
// create app
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// create server
var server = require('http').createServer(app);
// create io
var io = require('socket.io')(server);
// listen on port 3000
server.listen(3000);

// create array to store comments
var comments = [];
// when a connection is made
io.on('connection', function(socket) {
  // send the comments array
  socket.emit('load comments', comments);
  // when a comment is added
  socket.on('add comment', function(comment) {
    // push the comment to the array
    comments.push(comment);
    // send the updated array to all clients
    io.emit('load comments', comments);
  });
  // when a comment is removed
  socket.on('remove comment', function(index) {
    // remove the comment from the array
    comments.splice(index, 1);
    // send the updated array to all clients
    io.emit('load comments', comments);
  });
});
