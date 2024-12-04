// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

const productController = new ProductController();

// Create
router.post('/', productController.createProduct);

// Read
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Update
router.put('/:id', productController.updateProduct);

// Delete
router.delete('/:id', productController.deleteProduct);

module.exports = router;