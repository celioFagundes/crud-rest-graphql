const db = require('../db')
const Category = require('../models/category')(db)

const getAll = async (req, res) => {
  const categories = await Category.getAll()
  res.send(categories)
}
const create = async (req, res) => {
  await Category.create(req.body.category)
  res.send(req.body.category)
}
const update = async (req, res) => {
  await Category.update(req.params.id, [req.body.category])
  res.send({
    id: req.params.id,
    category: req.body.category,
  })
}
const remove = async (req, res) => {
  await Category.remove(req.params.id)
  res.send({
    success: true,
  })
}

module.exports = {
  getAll,
  remove,
  create,
  update,
}
