const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('./public/'));
server.listen(5000);

const Application = {
  sockets: {},
  nicks: {}
};

const commands = {
  '/nick': require('./lib/nick.js')(Application),
  '/userlist': require('./lib/userlist.js')(Application),
}

io.on('connection', socket => {
  Application.sockets[socket.id] = socket;

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('command', msg => {
    const parts = msg.split(' ');
    const cmd = parts.shift();

    if(cmd in commands) return commands[cmd](socket, parts);
    socket.emit('msg', 'Command not found');
  });

  console.log('a user connected', socket.id);

  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
