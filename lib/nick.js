const Nick = Application => (socket, cmd) => {
  const nick = cmd[0];
  if(nick in Application.nicks)
    return socket.emit('msg', `${nick} already exists`);

  Application.nicks[nick] = Application.sockets[socket.id];
}

module.exports = Nick;
