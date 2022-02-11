const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories')

router.get('/', categoriesController.getAll)
router.post('/', categoriesController.create)
router.put('/:id', categoriesController.update)
router.delete('/:id', categoriesController.remove)

module.exports = router