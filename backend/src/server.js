const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const dotenv = require('dotenv')

const {setUpWebSocket} = require('./websocket')
const routes = require('./routes')

dotenv.config()

const app = express()
const server = http.Server(app)

setUpWebSocket(server)

const {PORT, CONNECTION_STRING} = process.env

mongoose.connect(CONNECTION_STRING, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(routes) 

server.listen(PORT, () => console.log(`App listening on port ${PORT}`)) 