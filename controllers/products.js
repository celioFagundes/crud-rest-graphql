const db = require('../db')
const Product = require('../models/product')(db)

const get = async (req, res) => {
  let products = null
  if (req.query.categoryId) {
    products = await Product.getByCategory(req.query.categoryId)
  } else {
    products = await Product.getAll()
  }

  res.send({
    products: products,
  })
}
const getOne = async (req, res) => {
  const product = await Product.getById(req.params.id)
  res.send({
    product,
  })
}
const create = async (req, res) => {
  const { product, price } = req.body
  await Product.create([product, price])
  res.send({
    success: true,
    data: req.body,
  })
}
const remove = async (req, res) => {
  await Product.remove(req.params.id)
  res.send({
    success: true,
  })
}
const update = async (req, res) => {
  const { product, price } = req.body
  await Product.update(req.params.id, [product, price])
  res.send({
    success: true,
  })
}
const patch = async (req, res) => {
  const oldProduct = await Product.getById(req.params.id)
  if (!oldProduct) {
    return res.send({
      success: false,
      message: 'No product found',
    })
  } 
    const newProduct = oldProduct[0]
    if (req.body.product) {
      newProduct.product = req.body.product
    }
    if (req.body.price) {
      newProduct.price = req.body.price
    }
    await Product.update(req.params.id, [newProduct.product, newProduct.price])
    if (req.body.categories) {
      try{
        await Product.updateCategories(req.params.id, req.body.categories)
      }
      catch(err){
        return res.send({
          success:false,
          message: 'Categories not found'
        })
      }
    }
    res.send({
      success: true,
    })
  }
  const createImage = async (req, res) => {
    const { description, url } = req.body
    await Product.addImage(req.params.id, [description, url])
    res.send({
      success: true,
      data: req.body,
    })
  }
  const removeImage = async (req, res) => {
    await Product.removeImage(req.params.productId,req.params.id )
    res.send({
      success: true,
      data: req.body,
    })
  }

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
  patch,
  createImage,
  removeImage
}
