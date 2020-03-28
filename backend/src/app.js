const express = require('express')
const cors = require('cors')
const {errors} = require('celebrate')
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = 3333

const app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// celebrate errors
app.use(errors())
// routes
app.use(routes)

module.exports = app
