// Server API
import express from 'express'
import config from './config/server.json'
import bodyParser from 'body-parser'
import api from './api'

const app = express(),
  debug = require('debug')('car-shop:api')

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', api)

// Handle error on express
app.use((err, _req, res, _next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

app.listen(config.port, () => {
  console.log(`car-shop-api server listening on port: ${config.port}`)
})