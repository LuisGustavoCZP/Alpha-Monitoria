const express = require('express')
const UserController = require('../controllers/user')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')
const validation = require('../middlewares/validations')

const router = express.Router()

router.get('/', UserController.list)

router.get('/:id', VerifyIdMiddleware, UserController.getOne)

router.post('/', validation.validateCreate, UserController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, validation.validateUpdate, UserController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, UserController.delete)

router.post('/login', validation.validateLogin, UserController.login)

module.exports = router
