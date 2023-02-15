const express = require('express');
const { productController } = require('../controllers');
const { validateNameProduct } = require('../middlewares');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/seacrh', productController.searchProductName);
router.get('/:id', productController.findProductId);
router.post('/', validateNameProduct, productController.createProduct);
router.put('/:id', validateNameProduct, productController.updateProduct);
router.delete('/:id', productController.removeProduct);

module.exports = router;
