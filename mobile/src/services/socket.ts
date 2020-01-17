import socketIo from 'socket.io-client'

const socket = socketIo('https://dev-radar-omni.herokuapp.com/', {
   autoConnect: false
})

function connect(){
   socket.connect()
}

function disconnect() {
   if(socket.connected) {
      socket.disconnect()
   }
}

export {
   connect,
   disconnect
}