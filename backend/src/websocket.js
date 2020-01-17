const socketIo = require('socket.io')

exports.setUpWebSocket = server => {
   const io = socketIo(server)

   io.on('connection', socket => {
      console.log(socket.id)
   })
} 