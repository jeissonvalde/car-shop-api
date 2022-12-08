// Server API
import express from 'express'

const app = express(),
  config = {
    port: 5000
  }

app.get('/cars', (_req, res) => {
  res.json({ cars: ['Renault', 'Chevrolet', 'Toyota'] })
})

app.listen(config.port, () => {
  console.log(`car-shop-api server listening on port: ${config.port}`)
})