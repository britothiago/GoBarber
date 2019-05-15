const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const SessionController = require('./app/controllers/SessionController')
const authMidlleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use('/app', authMidlleware)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', SessionController.login)

module.exports = routes
