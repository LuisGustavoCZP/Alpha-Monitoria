const Navegacao = require('../models/navegacao')

module.exports = {
  list: async function (req, res) {
    try {
      const navegacaoModel = new Navegacao()
      const result = await navegacaoModel.view()
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  getOne: async function (req, res) {
    try {
      const navegacaoModel = new Navegacao()
      const result = await navegacaoModel.view({ id: req.id })
      res.status(200).json(result[0])
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  create: async function (req, res) {
    try {
      const navegacaoModel = new Navegacao()
      const result = await navegacaoModel.insert({
        ...req.body,
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  update: async function (req, res) {
    try {
      const navegacaoModel = new Navegacao(req.Navegacao_id)
      const result = await navegacaoModel.edit(req.id, {
        ...req.body
      })
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
  delete: async function (req, res) {
    try {
      const navegacaoModel = new Navegacao(req.Navegacao_id)
      const result = await navegacaoModel.delete(req.id)
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({ message: e })
    }
  },
}
