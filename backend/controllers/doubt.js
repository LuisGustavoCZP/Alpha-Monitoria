const Duvida = require('../models/doubt')

module.exports = {
  list: async function (req, res) {
    try {
      const duvidaModel = new Duvida()
      const result = await duvidaModel.view()
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  getOne: async function (req, res) {
    try {
      const duvidaModel = new Duvida()
      const result = await duvidaModel.view({ id: req.id })
      res.status(200).json(result[0])
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  create: async function (req, res) {
    try {
      const duvidaModel = new Duvida()
      const result = await duvidaModel.insert({
        ...req.body, "votes":0,
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  update: async function (req, res) {
    try {
      const duvidaModel = new Duvida()
      const result = await duvidaModel.edit(req.id, {
        ...req.body
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  delete: async function (req, res) {
    try {
      const duvidaModel = new Duvida()
      const result = await duvidaModel.delete(req.id)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  vote: async function (req, res) {
    try {
      const duvidaModel = new Duvida()
      const last = (await duvidaModel.view({ id: req.id }))[0];
      const v = last.votes+1;
      const result = await duvidaModel.edit(req.id, {
        "votes":v
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
}
