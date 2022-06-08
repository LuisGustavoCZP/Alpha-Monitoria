const express = require('express')
const TrailsController = require('../controllers/trail')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')

const router = express.Router()

router.get('/', TrailsController.list)

router.get('/:id', VerifyIdMiddleware, TrailsController.getOne)

router.post('/', /* validation.validateCreate, */ TrailsController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, /* validation.validateUpdate, */ TrailsController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, TrailsController.delete)

module.exports = router
