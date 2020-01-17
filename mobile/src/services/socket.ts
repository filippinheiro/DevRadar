import socketIo from 'socket.io-client'

const socket = socketIo('http://192.168.1.103:3333', {
   autoConnect: false
})

function subscribeToNewDevs(subscribeFunction) {
   socket.on('new-dev', subscribeFunction)
}

function connect(latitude: number, longitude: number, techs: string){
   
   socket.io.opts.query = {
      latitude,
      longitude,
      techs
   }
   
   socket.connect()
}

function disconnect() {
   if(socket.connected) {
      socket.disconnect()
   }
}

export {
   connect,
   disconnect,
   subscribeToNewDevs
}