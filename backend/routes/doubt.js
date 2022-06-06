const express = require('express')
const DoubtController = require('../controllers/doubt')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')
const validation = require('../middlewares/validations')

const router = express.Router()

router.get('/', DoubtController.list)

router.get('/:id', VerifyIdMiddleware, DoubtController.getOne)

router.post('/', validation.validateCreate, DoubtController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, validation.validateUpdate, DoubtController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, DoubtController.delete)

module.exports = router
