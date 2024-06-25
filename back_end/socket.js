const socketIo = require('socket.io');
let io
let users=[]
function handleSocketConnections(server) {
 io = socketIo(server, {
  cors: {
    origin: ['http://localhost:4200','http://192.168.1.70:4200'] ,
  }
});
 
  io.on('connection', (socket) => {
    users.push({user:socket.handshake.query.userid,socket:socket.id})
    console.log('A user connected');
    console.log(users);
    // Handle socket events here
    socket.on('disconnect', () => {
      users=users.filter(f=>f.user != socket.handshake.query.userid)
    console.log(users);

      console.log('User disconnected');
    });
  });
}
function getSocketIo(){
  return io;
}
function getusers(){
  return users;
}
module.exports = { handleSocketConnections ,getSocketIo,getusers };
