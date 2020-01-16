const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const cors = require('cors')
const app = express()

const {PORT, CONNECTION_STRING} = process.env

mongoose.connect(CONNECTION_STRING, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(routes) 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`)) 