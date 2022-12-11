const debug = require('debug')('car-shop:api:controllers')
// import db

// Prepare the database for each end point
let services, Car
async function getServices (req, _res, next) {
  if (!services) {
    debug('Connecting to database...')
    try {
      // services = await db(config.db)
    } catch (err_services) {
      throw new Error(`Imposible connect database provider ${err_services}`)
    }

    // Aquí pueden haber problemas con la tardansa en la db.
    Car = services.Car
    req.CarService = Car
  }

  next()
}


async function getCars (req, res, next) {
  debug('A request has been received by /cars')

  // Aquí pueden haber problemas con la tardansa en la db.
  if (!req.CarService) {
    return next(new Error('Service is not ready'))
  }

  const CarService = req.CarService
  let cars

  try {
    cars = await CarService.findCars()
  } catch (e) {
    return next(e)
  }

  res.send(cars)
}

async function getCar (req, res, next) {
  const { carid } = req.params

  debug(`request to /car/${carid}`)

  // Prepare params
  const { user, CarService } = req
  let car

  // Aquí pueden haber problemas con la tardansa en la db.
  if (!req.CarService) {
    return next(new Error('Service is not ready'))
  }

  if (!user || !user.lastname) {
    return next(new Error('Not authorized'))
  }

  try {
    car = await CarService.findById(carid)
  } catch (e) {
    return next(e)
  }

  if (!car) {
    return next(new Error(`Car not found`))
  }

  res.send({ car })
}

export default {
  getCars,
  getCar,
  getServices
}