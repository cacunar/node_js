const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('dev')) 
app.use(cors())

const logMiddleware = require('./middlewares/logs');

app.use(logMiddleware);

app.use('/', routes)

module.exports = app