const db = require('../../db')
const Category = require('../../models/category')(db)
const { ApolloError } = require('apollo-server-express')

const getAllCategories = async context => {
  const categories = await Category.getAll(`select * from categories`)
  return categories
}
const createCategory = async (context, { input }) => {
  const { category } = input
  await Category.create(category)
  return {
    category,
  }
}
const removeCategory = async (context, { id }) => {
  await Category.remove(id)
  return true
}
const updateCategory = async (context, { id, input }) => {
  const { category } = input
  await Category.update(id, [category])
  return {
    id,
    category,
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  removeCategory,
  updateCategory,
}
