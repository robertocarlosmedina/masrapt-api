const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const iniRegSum = require('./routes/iniRegSum')
const bus_routes_routes  = require('./routes/busRoutes_Routes')

app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))

// ------------------------ End points -----------------------
app.use('/', iniRegSum)
app.use('/busroutes', bus_routes_routes)

module.exports = app
