const express = require('express')
const router  = express.Router()
const productsController = require('../controllers/products')

router.delete('/:id', productsController.remove)
router.put('/:id', productsController.update)
router.patch('/:id', productsController.patch)
router.post('/',productsController.create)
router.get('/', productsController.get)
router.get('/:id', productsController.getOne)
router.post('/:id/images', productsController.createImage)
router.delete('/:productId/images/:id', productsController.removeImage)

module.exports = router
