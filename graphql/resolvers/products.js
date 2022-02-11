const db = require('../../db')
const Product = require('../../models/product')(db)
const { ApolloError } = require('apollo-server-express')

const getAllProducts = async (context, { filter }) => {
  let products = null
  if (filter && filter.categoryId) {
    products = await Product.getByCategory(filter.categoryId)
  } else {
    products = await Product.getAll()
  }
  return products
}
const getProductById = async(context,{id}) =>{
  const product = await Product.getById(id)
  return product
}

const createProduct = async (context, { input }) => {
  const { product, price } = input
  await Product.create([product, price])
  return {
    product,
    price,
  }
}
const createImageOnProduct = async (context, { productId, input }) => {
  const { description, url } = input
  await Product.addImage(productId, [description, url])
  return {
    description , url
  }
}
const deleteImageOnProduct = async (context, { productId, id }) => {
  await Product.removeImage(productId,id )
  return true
}

const updateProduct = async (context, { id, input }) => {
  const { product, price, categories } = input
  const oldProduct = await Product.getById(id)
  if (!oldProduct) {
    throw new ApolloError('Product not found')
  }
  const newProduct = oldProduct[0]
  if (product) {
    newProduct.product = product
  }
  if (price) {
    newProduct.price = price
  }
  await Product.update(id, [newProduct.product, newProduct.price])
  if (categories) {
    try {
      await Product.updateCategories(id, categories)
    } catch (err) {
      throw new ApolloError('Product Category not found')
    }
  }
  return newProduct
}
const deleteProduct = async (context, { id }) => {
  await Product.remove(id)
  console.log(id)
  return true
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createImageOnProduct,
  deleteImageOnProduct
}
