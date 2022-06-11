const express = require('express')
const LoginController = require('../controllers/login')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')

const router = express.Router()

router.get('/', LoginController.list)

router.get('/:id', VerifyIdMiddleware, LoginController.getOne)

router.post('/', /* validation.validateCreate, */ LoginController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, /* validation.validateUpdate, */ LoginController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, LoginController.delete)

module.exports = router
