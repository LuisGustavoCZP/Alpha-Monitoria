const express = require('express')
const NavigationController = require('../controllers/navigation')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')

const router = express.Router()

router.get('/', NavigationController.list)

router.get('/:id', VerifyIdMiddleware, NavigationController.getOne)

router.post('/', /* validation.validateCreate, */ NavigationController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, /* validation.validateUpdate, */ NavigationController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, NavigationController.delete)

module.exports = router
