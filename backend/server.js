const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')


const app = express()
mongoose.connect('mongodb+srv://filippinheiro:omnistack@radardev-4rmfn.gcp.mongodb.net/radardev?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

app.use(express.json())
app.use(routes)

app.listen(3333) 