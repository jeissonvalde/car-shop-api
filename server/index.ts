// Server API
import express from 'express'
import config from './config/server.json'
import bodyParser from 'body-parser'

const app = express()

// Middleware
app.use(bodyParser.urlencoded({extended: true}))

app.get('/cars', (_req, res) => {
  res.json({ cars: ['Renault', 'Chevrolet', 'Toyota'] })
})

app.use((err, _req, res, _next) => {
  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

app.listen(config.port, () => {
  console.log(`car-shop-api server listening on port: ${config.port}`)
})