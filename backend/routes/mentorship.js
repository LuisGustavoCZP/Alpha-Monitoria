const express = require('express')
const MentorshipController = require('../controllers/mentorship')
const AutorizationMiddleware = require('../middlewares/autorization')
const VerifyIdMiddleware = require('../middlewares/verifyId')

const router = express.Router()

router.get('/', MentorshipController.list)

router.get('/:id', VerifyIdMiddleware, MentorshipController.getOne)

router.post('/', /* validation.validateCreate, */ MentorshipController.create)

router.put('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, /* validation.validateUpdate, */ MentorshipController.update)

router.delete('/:id', VerifyIdMiddleware/* , AutorizationMiddleware */, MentorshipController.delete)

module.exports = router
