const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = 3333

const app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// routes
app.use(routes)

app.listen(port, () => {
  console.log(`LISTEN ON => ${3333}`)
})
