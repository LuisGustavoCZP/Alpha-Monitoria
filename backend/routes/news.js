const express = require('express')
const NewsController = require('../controllers/news')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')
const validation = require('../middlewares/validations')

const router = express.Router()

router.get('/', NewsController.list)

router.get('/:id', VerifyIdMiddleware, NewsController.getOne)

router.post('/', validation.validateCreate, NewsController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, validation.validateUpdate, NewsController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, NewsController.delete)

module.exports = router
