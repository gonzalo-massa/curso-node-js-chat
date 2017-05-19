const Userlist = Application => (socket, cmd) => {
  for(let nick in Application.nicks) socket.emit('msg', nick);
}

module.exports = Userlist;
