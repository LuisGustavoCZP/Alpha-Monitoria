const Mentorship = require('../models/mentorship')

module.exports = {
  list: async function (req, res) {
    try {
      const mentorshipModel = new Mentorship()
      const filters = req.query.filters ? JSON.parse(req.query.filters) : {}
      const result = await mentorshipModel.view(filters)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  getOne: async function (req, res) {
    try {
      const mentorshipModel = new Mentorship()
      const result = await mentorshipModel.view({ id: req.id })
      res.status(200).json(result[0])
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  create: async function (req, res) {
    try {
      const mentorshipModel = new Mentorship()
      const result = await mentorshipModel.insert({
        ...req.body,
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  update: async function (req, res) {
    try {
      const mentorshipModel = new Mentorship()
      const result = await mentorshipModel.edit(req.id, {
        ...req.body
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  delete: async function (req, res) {
    try {
      const mentorshipModel = new Mentorship()
      const result = await mentorshipModel.delete(req.id)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
}
