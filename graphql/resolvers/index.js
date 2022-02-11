const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createImageOnProduct,
  deleteImageOnProduct,
} = require('./products')
const { getAllCategories, createCategory, removeCategory, updateCategory } = require('./categories')

const resolvers = {
  Query: {
    getAllProducts,
    getProductById,
    getAllCategories,
  },
  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct,
    createImageOnProduct,
    deleteImageOnProduct,
    createCategory,
    removeCategory,
    updateCategory,
  },
}

module.exports = resolvers
