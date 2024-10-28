const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductInfo);
router.get('/:id/styles', productsController.getProductStyles);
router.get('/:id/related', productsController.getRelatedProducts);

module.exports = router;