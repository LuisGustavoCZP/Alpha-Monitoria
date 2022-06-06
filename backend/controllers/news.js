const Novidade = require('../models/novidade')

module.exports = {
  list: async function (req, res) {
    try {
      const novidadeModel = new Novidade()
      const result = await novidadeModel.view()
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  getOne: async function (req, res) {
    try {
      const novidadeModel = new Novidade()
      const result = await novidadeModel.view({ id: req.id })
      res.status(200).json(result[0])
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  create: async function (req, res) {
    try {
      const novidadeModel = new Novidade()
      const result = await novidadeModel.insert({
        ...req.body,
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  update: async function (req, res) {
    try {
      const novidadeModel = new Novidade(req.Novidade_id)
      const result = await novidadeModel.edit(req.id, {
        ...req.body
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  delete: async function (req, res) {
    try {
      const novidadeModel = new Novidade(req.Novidade_id)
      const result = await novidadeModel.delete(req.id)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
}
