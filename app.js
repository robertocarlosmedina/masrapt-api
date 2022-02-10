const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const presentation = require('./routes/presentation.js')
const user_routes = require('./routes/userAuth.js')
const bus_routes_routes  = require('./routes/busRoutes')
const bus_information = require('./routes/busInfo')

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))

// ------------------------ End points -----------------------
app.use('/', presentation)
app.use('/routes', bus_routes_routes)
app.use('/user', user_routes)
app.use('/bus', bus_information)

module.exports = app
