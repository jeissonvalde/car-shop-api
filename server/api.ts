// Deps
import express from 'express'
import * as jwt from 'express-jwt'
import config from './config/api'
import apiControllers from './controllers/api'

// Security
const guard = require('express-jwt-permissions')(), // guard operator.
  auth = jwt.expressjwt.bind(null, config.auth),
  api = express.Router()

api.use('*', apiControllers.getServices)

api.get('/cars', apiControllers.getCars)

api.get('/car/:carid', auth, guard.check(['car:read']), apiControllers.getCar)


export default api