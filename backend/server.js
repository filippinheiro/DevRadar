const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./src/routes')

dotenv.config()
const app = express()
mongoose.connect(process.env.CONNECTION_STRING, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.use(express.json())
app.use(routes) 

app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`)) 